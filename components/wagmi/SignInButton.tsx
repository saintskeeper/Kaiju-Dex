import { useState, useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { signInWithEthereum, getCustomToken } from '../firebase-wagmi-auth/firebaseAuthProvider';
import { auth } from '../../lib/Firebase/Firebase';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { mainnet, optimism, polygon } from 'wagmi/chains';

const metaMaskConnector = new MetaMaskConnector({
  chains: [mainnet, optimism, polygon],
  options: {
    shimDisconnect: true,
    UNSTABLE_shimOnConnectSelectAccount: true,
  },
});

const SignInButton = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const [hasSignedIn, setHasSignedIn] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setHasSignedIn(true);
    }
  }, [isConnected]);

  useEffect(() => {
    const storedConnection = localStorage.getItem("hasSignedIn");
    if (storedConnection && JSON.parse(storedConnection)) {
      setHasSignedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hasSignedIn", JSON.stringify(hasSignedIn));
  }, [hasSignedIn]);

  const handleSignIn = async () => {
    if (!isConnected) {
      await connect({ connector: metaMaskConnector });
    }

    if (isConnected && address) {
      const message = `Sign this message to authenticate with your Ethereum address: ${address}`;
      const signer = await metaMaskConnector.getSigner();
      const signature = await signer.signMessage(message);

      try {
        const customToken = await getCustomToken(address, signature);
        await signInWithEthereum(auth, customToken);
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
