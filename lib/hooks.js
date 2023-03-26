import "firebase/auth";
import "firebase/firestore";
import {seedDatabase, signInWithMetaMask } from "../lib/FirebaseMeta-Auth/connect-metamask";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "firebase/app";
function useUserData() {
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (!user && !loading && !error) {
      signInWithMetaMask();
    }
  }, [user, loading, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    return <div>Welcome, {user.uid}!</div>;
  }

  return <div>Please sign in with MetaMask</div>;
}

export default useUserData;
