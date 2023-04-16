import type { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';

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

async function createOrUpdateUserDocument(ethereumAddress: string, customToken: string) {
  const userRef = admin.firestore().collection("users").doc(ethereumAddress);

  const userDoc = await userRef.get();
  if (userDoc.exists) {
    // Update the existing document with the new custom token
    await userRef.update({ customToken: customToken });
  } else {
    // Create a new document with the Ethereum address and custom token
    await userRef.set({ customToken: customToken });
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { address } = req.query;

    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid Ethereum address' });
    }

    try {
      // Create the custom token
      const customToken = await createCustomToken(address);

      // Create or update the user document in Firestore
      await createOrUpdateUserDocument(address, customToken);

      return res.status(200).json({ customToken });
    } catch (error) {
      return res.status(500).json({ error: 'Error creating custom token' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
