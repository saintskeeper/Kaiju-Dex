import { useAccount, useConnect } from 'wagmi';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { signInWithEthereum, getCustomToken } from '../firebase-wagmi-auth/firebaseAuthProvider';
import { auth } from '../../lib/Firebase/Firebase';
import { InjectedConnector } from 'wagmi/connectors/injected';

const SignInButton = () => {
  const { isConnected, address } = useAccount();
  const web3React = useWeb3React();
  const { library } = web3React;
  const [hasSignedIn, setHasSignedIn] = useState(false);
  const { connect } = useConnect();


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
    const injectedConnector = new InjectedConnector();

    if (!isConnected) {
      await connect({ connector: injectedConnector });
    }
    if (isConnected && address) {
      const message = `Sign this message to authenticate with your Ethereum address: ${address}`;
      const hashedMessage = library.utils.hashMessage(message);
      const signer = library.getSigner();
      const signature = await signer.signMessage(library.utils.arrayify(hashedMessage));;

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
