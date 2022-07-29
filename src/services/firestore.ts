import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export async function createUser() {
  await setDoc(doc(db, "users", "teste"), {
    name: "teste",
    id: "id",
  });
}

export async function getUser() {
  const docRef = doc(db, "users", "teste");
  const querySnap = await getDoc(docRef);
  // console.log(querySnap.data());

  // await setDoc(doc(db, "users", "idUser"), {
  //   id: "idUser",
  //   name: "Nome User",
  //   avatar: "url",
  // });

  // await updateDoc(doc(db, "users", "idUser"), {
  //   infoPoints: {
  //     TotalHours: 8,
  //     hourEntry: "09:30",
  //     hourEntryLunch: "12:30",
  //     hourExitLunch: "14:00",
  //     hourExit: "19:00",
  //   },
  // });

  // await setDoc(
  //   doc(db, "users/idUser/points", new Date().getTime().toString()),
  //   {
  //     created_at: serverTimestamp(),
  //     entry: "09:30",
  //     entryLunch: "12:30",
  //     exitLunch: "14:00",
  //     exit: "19:10",
  //     status: "POSITIVE",
  //     hourBonus: "00:10",
  //   }
  // );

  await updateDoc(doc(db, "users/idUser/points", "1659100764397"), {
    status: "NEGATIVE",
    exit: "18:10",
    hourBonus: "-00:10",
  });

  // const user = query(collection(db, "users/idUser/points"), where("created_at", "==", "id"));

  const user = query(
    collection(db, "users/idUser/points"),
    orderBy("created_at", "desc")
  );

  const filter = await getDocs(user);

  const returnD = filter.docs.map(
    (doc) => new Date(doc.data().created_at.toDate())
  );

  console.log(returnD);

  //   const querySnap = getDocs(user);
  //   const userId = (await querySnap).forEach((doc) => doc.data());
  //   console.log(userId);
}
