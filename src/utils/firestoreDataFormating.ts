import { Timestamp } from "firebase/firestore";

export function dateFormat(timestamp: Timestamp) {
  if (timestamp) {
    const date = new Date(timestamp.toDate());

    return date;
  }
}
