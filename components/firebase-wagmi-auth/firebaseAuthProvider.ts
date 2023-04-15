import { auth } from "../../lib/Firebase/Firebase";
import { useAccount } from "wagmi";


// This is a placeholder function. Replace it with your implementation to obtain the custom token from your server.
// tsignore is used to ignore TypeScript errors in this file.
// @ts-ignore
async function getCustomToken(ethereumAddress: string): Promise<string> {
  // Your implementation to request a custom token from your server
  // For example, you can make a call to your server API that signs the user's Ethereum address with your Firebase private key
  // and returns the custom token.
}


export const signInWithEthereum = async (ethereumAddress: string) => {
  if (!ethereumAddress) {
    throw new Error("User is not connected to Ethereum");
  }

  const customToken = await getCustomToken(ethereumAddress);

  // Sign in the user with the custom token
  await auth.signInWithCustomToken(customToken);
};

export const signOut = async () => {
  await auth.signOut();
};
