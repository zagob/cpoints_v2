import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIND,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function sendEmailVerificationUser(user: any) {
  try {
    const actionCodeSettings = {
      url: "https://cpoints-v2.vercel.app/?email=" + user.email,
    };
    await sendEmailVerification(user, actionCodeSettings);
  } catch (err) {
    return err;
  }
}

export async function signUserEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err: any) {
    return err.code;
  }
}

export async function createUserEmail(email: string, password: string) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err: any) {
    return err.code;
  }
}

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);

  return result;
}

export { onAuthStateChanged, auth, signOut, app };
