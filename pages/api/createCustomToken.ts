import type { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import * as sigUtil from 'eth-sig-util';
// Verify the signature
import { useWeb3React } from '@web3-react/core';
const web3React = useWeb3React();
const { library } = web3React;
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!firebasePrivateKey) {
  throw new Error("FIREBASE_PRIVATE_KEY environment variable is missing!");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      //ts ignore is needed because the private key is a string with new lines
      // @ts-ignore
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),

    }),
  });
}

async function createOrUpdateUserDocument(ethereumAddress: string, customToken: string, expiresAt: Date) {
  const userRef = admin.firestore().collection("users").doc(ethereumAddress);
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    // Update the existing document with the new custom token and expiration time
    await userRef.update({ customToken: customToken, expiresAt: expiresAt });
  } else {
    // Create a new document with the Ethereum address, custom token, and expiration time
    await userRef.set({ customToken: customToken, expiresAt: expiresAt });
  }
}

async function createCustomToken(uid: string) {
  try {
    const customToken = await admin.auth().createCustomToken(uid);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
}
// ...

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { address, signedMessage } = req.query;

    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid Ethereum address' });
    }

    if (!signedMessage || typeof signedMessage !== 'string') {
      return res.status(400).json({ error: 'Invalid signed message' });
    }

    try {
      // Verify the signature
      const message = `Sign this message to authenticate with your Ethereum address: ${address}`;
      const hashedMessage = library.utils.hashMessage(message);
      const recoveredAddress = sigUtil.recoverPersonalSignature({
        data: hashedMessage,
        sig: signedMessage,
      });
      if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
        return res.status(401).json({ error: 'Signature verification failed' });
      }

      const customToken = await createCustomToken(address);
      // i have error handling for this server side
      // @ts-ignore
      await createOrUpdateUserDocument(address, customToken);

      return res.status(200).json({ customToken });
    } catch (error) {
      return res.status(500).json({ error: 'Error creating custom token' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
