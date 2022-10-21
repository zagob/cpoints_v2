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
  totalDataBonusMinutes: Number[];
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

interface SaveMonthAndYearProps {
  month: number;
  year: number;
}

export function CalendarProvider({ children }: CalendarProvider) {
  const { user } = useContext(AuthContextProvider);
  const [saveMonthAndYear, setSaveMonthAndYear] =
    useState<SaveMonthAndYearProps>({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    } as SaveMonthAndYearProps);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [dataTable, setDataTable] = useState<DataTableProps[]>([]);
  const [totalDataBonusMinutes, setTotalDataBonusMinutes] = useState<Number[]>(
    []
  );

  function onResetSelectedDate() {
    setSelectedDate(undefined);
  }

  function onSetSelectedDate(valueDate: Date | undefined) {
    setSelectedDate(valueDate);
  }

  function onChangeMonth(event: Date) {
    const monthEvent = event?.getMonth() + 1;
    const yearEvent = event?.getFullYear();
    setSaveMonthAndYear({
      month: monthEvent,
      year: yearEvent,
    });
    setSelectedDate(
      new Date(
        `${selectedDate?.getFullYear()}/${monthEvent}/${selectedDate?.getDate()}`
      )
    );
  }

  useEffect(() => {
    if (user) {
      const queryRef = query(
        collection(db, `users/${user?.id}/points`),
        orderBy("selectedDateString", "desc")
      );

      onSnapshot(queryRef, (querySnapshot) => {
        const allData = querySnapshot.docs.map((doc) => {
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
        });

        const filterAllDataYear = allData.filter(
          (item) =>
            new Date(item.selectedDateString).getFullYear() ===
            selectedDate?.getFullYear()
        );

        let arr = [];
        for (let i = 1; i <= 12; i++) {
          const filterMonth = filterAllDataYear.filter(
            (item) => new Date(item.selectedDateString).getMonth() + 1 === i
          );

          const reduceFilt = filterMonth.reduce((acc, value) => {
            const [hour, minute] = value.bonusTimeString.split(":");
            const hourToMinutesNumber =
              Math.floor(Number(hour) * 60) + Number(minute);

            if (value.status === "NEGATIVE") {
              return acc - hourToMinutesNumber;
            }
            if (value.status === "POSITIVE") {
              return acc + hourToMinutesNumber;
            }

            return 0;
          }, 0);

          arr.push(reduceFilt);
        }

        setTotalDataBonusMinutes(arr);

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
              new Date(item?.selectedDateString!).getMonth() + 1 ===
                saveMonthAndYear.month &&
              new Date(item?.selectedDateString!).getFullYear() ===
                saveMonthAndYear.year
          );

        setDataTable(data);
      });
    }
  }, [user, saveMonthAndYear.month, saveMonthAndYear.year, selectedDate]);

  return (
    <ContextCalendarProvider.Provider
      value={{
        selectedDate,
        onSetSelectedDate,
        onChangeMonth,
        dataTable,
        onResetSelectedDate,
        totalDataBonusMinutes,
      }}
    >
      {children}
    </ContextCalendarProvider.Provider>
  );
}
