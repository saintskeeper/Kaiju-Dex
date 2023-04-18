import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useEffect, useState } from "react";
import { signInWithEthereum, getCustomToken } from "../firebase-wagmi-auth/firebaseAuthProvider";
import { auth } from "../../lib/Firebase/Firebase";

const SignInButton = () => {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const [hasSignedIn, setHasSignedIn] = useState(false);

  const handleSignIn = async () => {
    if (!isConnected) {
      await connect({ connector: new InjectedConnector() });
    }

    if (address) {
      try {
        if (typeof window.ethereum !== "undefined") {
          const message = `This is a signature check to ensure you own the wallet you're using for the KaijuDex \n\nTimestamp: ${Date.now()}`;
          const signedMessage = await (window.ethereum.request as any)({
            method: "personal_sign",
            params: [address, message],
          });

          const customToken = await getCustomToken(address, signedMessage);
          await signInWithEthereum(auth, customToken);
        } else {
          console.error("Ethereum object not found.");
        }
      } catch (error) {
        console.error("Error signing in with Ethereum:", error);
      }
    } else {
      console.error("User is not connected to Ethereum.");
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleSignIn}
        className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default SignInButton;
