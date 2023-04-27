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
  const { connectAsync } = useConnect();
  const [hasSignedIn, setHasSignedIn] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Connect');

  useEffect(() => {
    const signInWithEthereumAddress = async () => {
      console.log('isConnected (after connectAsync):', isConnected);
      console.log('address (after connectAsync):', address);
      console.log('hasSignedIn (after connectAsync):', hasSignedIn);

      if (isConnected) {
        if (!address) {
          console.error('Unable to get the Ethereum address.');
          return;
        }

        if (!hasSignedIn) {
          const message = `Sign this message to authenticate with your Ethereum address: ${address}`;
          const signer = await metaMaskConnector.getSigner();
          const signature = await signer.signMessage(message);
          console.log('Signature:', signature);

          try {
            const customToken = await getCustomToken(address, signature);
            console.log('Custom token:', customToken);
            await signInWithEthereum(auth, customToken);
            setHasSignedIn(true);
          } catch (error) {
            console.error('Error signing in with Ethereum:', error);
          }
        } else {
          console.log('User is already connected and signed in.');
        }
      } else {
        console.error('User is not connected to Ethereum.');
      }
    };

    if (isConnected) {
      signInWithEthereumAddress();
    }
  }, [isConnected]);



  const handleSignIn = async () => {
    console.log('isConnected (start):', isConnected);
    console.log('address (start):', address);
    console.log('hasSignedIn (start):', hasSignedIn);

    if (!isConnected) {
      try {
        const connectionInfo = await connectAsync({ connector: metaMaskConnector });
        console.log('Connected:', connectionInfo);
      } catch (error) {
        console.error('Error connecting to Ethereum:', error);
        return;
      }
    }

    console.log('isConnected (after connectAsync):', isConnected);
    console.log('address (after connectAsync):', address);
    console.log('hasSignedIn (after connectAsync):', hasSignedIn);

    if (isConnected) {
      if (!address) {
        console.error('Unable to get the Ethereum address.');
        return;
      }

      if (!hasSignedIn) {
        const message = `Sign this message to authenticate with your Ethereum address: ${address}`;
        const signer = await metaMaskConnector.getSigner();
        const signature = await signer.signMessage(message);
        console.log('Signature:', signature);

        try {
          const customToken = await getCustomToken(address, signature);
          console.log('Custom token:', customToken);
          await signInWithEthereum(auth, customToken);
          setHasSignedIn(true);
        } catch (error) {
          console.error('Error signing in with Ethereum:', error);
        }
      } else {
        console.log('User is already connected and signed in.');
      }
    } else {
      console.error('User is not connected to Ethereum.');
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
