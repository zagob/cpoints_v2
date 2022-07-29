import { NextApiRequest, NextApiResponse } from "next";
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyBL1vLp-c3Es_VA20yN9hf5vZcn485L8_s",
  authDomain: "cpoints-eaf11.firebaseapp.com",
  projectId: "cpoints-eaf11",
  storageBucket: "cpoints-eaf11.appspot.com",
  messagingSenderId: "118248903413",
  appId: "1:118248903413:web:36e7479a2789a5da042bbc",
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const idToken = req.body.idToken.toString();
    const csrfToken = req.body.csrfToken.toString();
  }
}
