import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDocs, getFirestore, collection, query, where, limit, DocumentSnapshot} from "firebase/firestore";





const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize analytics only if in browser environment and supported
async function initializeFirebaseAnalytics() {
  if (typeof window !== "undefined") {
    const analyticsIsSupported = await isSupported();
    if (analyticsIsSupported) {
      const analyticsInstance = getAnalytics(app);
      return analyticsInstance;
    }
  }
  return null;
}





const analytics = initializeFirebaseAnalytics();

// Initialize Firebase Authentication
const auth = getAuth(app);
// export db  to be used for updating the profile.
const db = getFirestore(app);

export async function getUserWithUsername(username: string ) {
  const profilesRef = collection(db, "profiles");
  const q = query(profilesRef, where("username", "==", username), limit(1));
  const querySnapshot = await getDocs(q);
  const userDoc = querySnapshot.docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: DocumentSnapshot) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

// Export analytics and auth
export { analytics, auth, db };
