import Web3 from 'web3';

async function connectMetaMaskAndGetAddress() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      return address;
    } catch (error) {
      console.error('User denied account access');
      throw error;
    }
  } else {
    console.error('MetaMask not detected');
    throw new Error('MetaMask not detected');
  }
}


async function signMessage(ethereumAddress) {
  const web3 = new Web3(window.ethereum);
  const message = `Sign this message to authenticate with your Ethereum address ${ethereumAddress}`;
  const signature = await web3.eth.personal.sign(message, ethereumAddress, '');
  return signature;
}

async function authenticateWithCustomToken(customToken) {
  try {
    await firebase.auth().signInWithCustomToken(customToken);
    console.log('Authenticated with Firebase successfully');
  } catch (error) {
    console.error('Error authenticating with Firebase', error);
  }
}


async function authenticateWithMetaMask() {
  try {
    const ethereumAddress = await connectMetaMaskAndGetAddress();
    const signature = await signMessage(ethereumAddress);

    // Call your Firebase function to get the custom token
    const getCustomToken = firebase.functions().httpsCallable('getCustomToken');
    const result = await getCustomToken({ ethereumAddress, signature });
    const customToken = result.data.customToken;

    // Authenticate with Firebase using the custom token
    await authenticateWithCustomToken(customToken);
  } catch (error) {
    console.error('Error authenticating with MetaMask and Firebase', error);
  }
}
