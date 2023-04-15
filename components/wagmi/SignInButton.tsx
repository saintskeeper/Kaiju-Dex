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
          const customToken = await getCustomToken(address);
          await signInWithEthereum(address, customToken);
        } catch (error) {
          console.error("Error signing in with Ethereum:", error);
        }
      } else {
        console.error("User is not connected to Ethereum.");
      }
    };

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
