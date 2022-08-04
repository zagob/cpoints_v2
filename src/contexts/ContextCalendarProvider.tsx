import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../services/firestore";
import { dateFormat } from "../utils/firestoreDataFormating";
import { AuthContextProvider } from "./AuthContextProvider";

interface ContextCalendarProvider {
  selectedDate: Date | undefined;
  onSetSelectedDate: (valueDate: Date | undefined) => void;
  onChangeMonth: (event: Date) => void;
  onResetSelectedDate: () => void;
  dataTable: DataTableProps[];
}

export const ContextCalendarProvider = createContext(
  {} as ContextCalendarProvider
);

interface CalendarProvider {
  children: ReactNode;
}

export interface DataTableProps {
  id: string;
  bonusTimeString: string;
  timeMorningString: string;
  timeLunchString: string;
  selectedDateString: Date | undefined;
  status: string;
  created_at: Date | undefined;
  entry2: string;
  exit2: string;
  entry1: string;
  timeAfternoonString: string;
  exit1: string;
  totalWork: string;
}

export function CalendarProvider({ children }: CalendarProvider) {
  const { user } = useContext(AuthContextProvider);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [dataTable, setDataTable] = useState<DataTableProps[]>([]);

  function onResetSelectedDate() {
    setSelectedDate(undefined);
  }

  function onSetSelectedDate(valueDate: Date | undefined) {
    setSelectedDate(valueDate);
  }

  function onChangeMonth(event: Date) {
    const monthEvent = event?.getMonth() + 1;
    setSelectedDate(
      new Date(
        `${selectedDate?.getFullYear()}/${monthEvent}/${selectedDate?.getDate()}`
      )
    );
  }

  const year = selectedDate?.getFullYear();
  const month = selectedDate?.getMonth()! + 1;

  useEffect(() => {
    if (user) {
      const queryRef = query(
        collection(db, `users/${user?.id}/points`),
        orderBy("selectedDateString", "desc")
      );

      onSnapshot(queryRef, (querySnapshot) => {
        const data = querySnapshot.docs
          .map((doc) => {
            const {
              id,
              bonusTimeString,
              timeMorningString,
              timeLunchString,
              selectedDateString,
              status,
              created_at,
              entry2,
              exit2,
              entry1,
              timeAfternoonString,
              exit1,
              totalWork,
            } = doc.data();

            const data = {
              id,
              bonusTimeString,
              timeMorningString,
              timeLunchString,
              selectedDateString: new Date(selectedDateString),
              status,
              entry2,
              exit2,
              entry1,
              timeAfternoonString,
              exit1,
              totalWork,
              created_at: dateFormat(created_at),
            };

            return data;
          })
          .filter(
            (item) =>
              new Date(item?.selectedDateString!).getMonth() + 1 === month &&
              new Date(item?.selectedDateString!).getFullYear() === year
          );

        setDataTable(data);
      });

      // return unsub;
    }
  }, [user, month, year]);

  return (
    <ContextCalendarProvider.Provider
      value={{
        selectedDate,
        onSetSelectedDate,
        onChangeMonth,
        dataTable,
        onResetSelectedDate,
      }}
    >
      {children}
    </ContextCalendarProvider.Provider>
  );
}
