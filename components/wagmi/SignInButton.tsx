import React, { useState, useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { signInWithEthereum, getCustomToken } from '../firebase-wagmi-auth/firebaseAuthProvider';
import { auth } from '../../lib/Firebase/Firebase';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { mainnet, optimism, polygon } from 'wagmi/chains';

import { ConnectButton } from '@rainbow-me/rainbowkit';


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
  const [buttonLabel, setButtonLabel] = useState('Connect');

  useEffect(() => {
    if (isConnected) {
      setHasSignedIn(true);
      setButtonLabel('Connected');
    } else {
      setButtonLabel('Connect');
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

    if (isConnected && address && !hasSignedIn) {
      const message = `Sign this message to authenticate with your Ethereum address: ${address}`;
      const signer = await metaMaskConnector.getSigner();
      const signature = await signer.signMessage(message);

      try {
        const customToken = await getCustomToken(address, signature);
        await signInWithEthereum(auth, customToken);
        setHasSignedIn(true); // Update the hasSignedIn state
      } catch (error) {
        console.error("Error signing in with Ethereum:", error);
      }
    } else if (isConnected && hasSignedIn) {
      console.log("User is already connected and signed in.");
    } else {
      console.error("User is not connected to Ethereum.");
    }
  };



  return (
    <div onClick={handleSignIn}>
      <ConnectButton
        label={buttonLabel}
        accountStatus={isConnected ? { smallScreen: 'full', largeScreen: 'full' } : { smallScreen: 'address', largeScreen: 'address' }}
        chainStatus="none"
        showBalance={false}
      />
    </div>
  );
};


export default SignInButton;
