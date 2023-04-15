import { useAccount } from "wagmi";
import { signInWithEthereum } from "../firebase-wagmi-auth/firebaseAuthProvider";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const SignInButton = () => {
  const { isConnected, address } = useAccount();

  const handleSignIn = async () => {
    if (isConnected && address) {
      try {
        await signInWithEthereum(address);
      } catch (error) {
        console.error("Error signing in with Ethereum:", error);
      }
    } else {
      console.error("User is not connected to Ethereum.");
    }
  };

  return (
    <div className="flex justify-end">
      <ConnectButton showBalance={false} />
    </div>
  );
};

export default SignInButton;
