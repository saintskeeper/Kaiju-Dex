import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getAnalytics} from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCZYfmkf2CwJNOQ2vqNGmtgx_zDEdLkkLw", //pragma: allowlist secret
    authDomain: "kaiju-dex.firebaseapp.com",
    projectId: "kaiju-dex",
    storageBucket: "kaiju-dex.appspot.com",
    messagingSenderId: "50598611064",
    appId: "1:50598611064:web:c553473814e50ef6eb058d",
    measurementId: "G-R8ZEV6WRLV"
  };
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
// Auth Export
export const auth = firebase.auth();
// TODO: add metamask support



// Firestore Export

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;


// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;


/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}


/**
 * Analytics


 for analytic implementation
https://github.com/vercel/next.js/discussions/13654
*/

export const analytics = () => {
  if (typeof window !== "undefined") {
    //return firebase.analytics()
    return getAnalytics()
  } else {
    return null
  }
 }
