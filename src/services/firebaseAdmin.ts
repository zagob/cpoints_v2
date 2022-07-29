// import admin from "firebase-admin";
// import { fireConfig } from "../lib/fireConfig";

import { GoogleAuthProvider } from "firebase/auth";

// try {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       clientEmail: fireConfig.client_email,
//       privateKey: fireConfig.private_key,
//       projectId: fireConfig.project_id,
//     }),
//   });
//   console.log("Inicialized");
// } catch (error) {
//   console.log("Error", error);
// }

// export { admin };

export function varifyToken(token: string) {
  return GoogleAuthProvider.credential(token);
}
