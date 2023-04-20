import Web3 from 'web3';

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


async function seedDatabase(ethAddress) {
  // Check if the user document already exists
  const userDocRef = db.collection("users").doc(ethAddress);
  const userDocSnapshot = await userDocRef.get();

  // If the user document does not exist, seed the Firestore database with the schema
  if (!userDocSnapshot.exists) {
    const schema = {
      users: {
        [ethAddress]: {
          roles: {
            engineer: false,
            artist: false,
            degen: false
          },
          nfts: {
            Genisus: {
              quantity: 0,
              owned: false
            },
            Baby: {
              quantity: 0,
              owned: false
            },
            Mutant: {
              quantity: 0,
              owned: false
            },
            Scientist: {
              quantity: 0,
              owned: false
            }
          }
        }
      },
      usersname: {
        uid: [ethAddress],
        status: {
          active: true,
          timeout: false
        }
      }
    };

    await db.collection("users").doc(ethAddress).set(schema.users[ethAddress]);
    await db.collection("usersname").doc(ethAddress).set(schema.usersname[ethAddress]);
  }
}

async function signInWithMetaMask() {
  const ethAddress = await getMetaMaskAddress();

  if (ethAddress) {
    const createCustomToken = firebase.functions().httpsCallable('createCustomToken');
    const { customToken } = await createCustomToken({ ethAddress });

    firebase.auth().signInWithCustomToken(customToken).then((userCredential) => {
      const user = userCredential.user;

      // Call the function to seed the Firestore database with the user data
      seedDatabase(user, ethAddress);
    }).catch((error) => {
      console.error("Error signing in with custom token:", error);
    });
  }
}
