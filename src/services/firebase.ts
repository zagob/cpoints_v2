// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL1vLp-c3Es_VA20yN9hf5vZcn485L8_s",
  authDomain: "cpoints-eaf11.firebaseapp.com",
  projectId: "cpoints-eaf11",
  storageBucket: "cpoints-eaf11.appspot.com",
  messagingSenderId: "118248903413",
  appId: "1:118248903413:web:36e7479a2789a5da042bbc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);

  return result;
}

export { onAuthStateChanged, auth, signOut, app };
