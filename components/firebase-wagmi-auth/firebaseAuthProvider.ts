import { auth } from "../../lib/Firebase/Firebase";
import { signInWithCustomToken } from "firebase/auth";

// This is a placeholder function. Replace it with your implementation to obtain the custom token from your server.
// tsignore is used to ignore TypeScript errors in this file.
// @ts-ignore
async function getCustomToken(address: string, signedMessage: string, expiresAt?: number) {
  const expiresAtParam = expiresAt ? `&expiresAt=${expiresAt}` : "";
  try {
    const response = await fetch(
      `/api/createCustomToken?address=${address}&signedMessage=${encodeURIComponent(
        signedMessage
      )}${expiresAtParam}`
    );
    const data = await response.json();

    if (response.ok) {
      return data.customToken;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Error fetching custom token:', error);
    throw error;
  }
}



async function signInWithEthereum(address: string, customToken: string) {
  try {
    // Sign in with the custom token
    await signInWithCustomToken(auth, customToken);
  } catch (error) {
    console.error("Error signing in with Ethereum:", error);
    throw error;
  }
}






export const signOut = async () => {
  await auth.signOut();
};



export { signInWithEthereum, getCustomToken};
