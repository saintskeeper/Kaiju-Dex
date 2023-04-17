import { useAccount } from "wagmi";
import { useEffect } from "react";
import { signInWithEthereum, getCustomToken } from "../firebase-wagmi-auth/firebaseAuthProvider";
import { ConnectButton  } from "@rainbow-me/rainbowkit";

const SignInButton = () => {
  const { isConnected, address } = useAccount();

  useEffect(() => {
    const handleSignIn = async () => {
      if (isConnected && address) {
        try {
          if (typeof window.ethereum !== 'undefined') {
            const message = `This is a signature check to ensure you own the wallet you're using for the KaijuDex \n\nTimestamp: ${Date.now()}`;
            const signedMessage = await (window.ethereum.request as any)({
              method: 'personal_sign',
              params: [address, message],
            });

            const customToken = await getCustomToken(address, signedMessage);
            await signInWithEthereum(address, customToken); // Removed auth argument
          } else {
            console.error("Ethereum object not found.");
          }
        } catch (error) {
          console.error("Error signing in with Ethereum:", error);
        }
      } else {
        console.error("User is not connected to Ethereum.");
      }
    };;

    if (address) {
      handleSignIn();
    }
  }, [isConnected, address]);

  return (
    <div className="flex justify-end">
      <ConnectButton showBalance={false} />
    </div>
  );
};

export default SignInButton;
