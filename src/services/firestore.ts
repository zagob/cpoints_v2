import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { SubmitFormProps } from "../pages/profile";
import { app } from "./firebase";

const db = getFirestore(app);

export async function createUser(
  displayName: string | null,
  emailVerified: boolean,
  photoURL: string | null,
  uid: string
) {
  await setDoc(doc(db, "users", uid), {
    id: uid,
    name: displayName,
    avatar: photoURL,
    emailVerified,
  });
}

export async function deleteDocPoints(idUser: string, idPoint: string) {
  const t = await deleteDoc(doc(db, `users/${idUser}/points`, idPoint));
}

export async function updateDocPoints(
  idUser: string,
  idPoint: string,
  data: PointsHoursProps
) {
  await updateDoc(doc(db, `users/${idUser}/points`, idPoint), { ...data });
}

export async function getUser(idUser: string) {
  const docRef = doc(db, "users", idUser);
  const querySnap = await getDoc(docRef);
  return querySnap.data();
}

export async function addInfoPoints(
  data: SubmitFormProps,
  idUser: string | null
) {
  await updateDoc(doc(db, "users", `${idUser}`), {
    infoPoints: data,
  });
}

interface PointsHoursProps {
  entry1: string;
  exit1: string;
  entry2: string;
  exit2: string;
  selectedDateString: string;
  timeMorningString: string;
  timeLunchString: string;
  timeAfternoonString: string;
  totalWork: string;
  status: string;
  bonusTimeString: string;
}

export async function addPointsHours(data: PointsHoursProps, idUser: string) {
  const id = new Date().getTime().toString();
  await setDoc(doc(db, `users/${idUser}/points`, id), {
    ...data,
    id,
    created_at: serverTimestamp(),
  });
}

export async function getPointsHours(
  idUser: string,
  selectedDateString: string
) {
  const ref = collection(db, `users/${idUser}/points`);

  const q = query(ref, where("selectedDateString", "==", selectedDateString));

  const doc = await getDocs(q);

  return doc.docs;
}

export { db };
