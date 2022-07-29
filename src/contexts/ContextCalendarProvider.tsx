import { createContext, ReactNode, useState } from "react";

interface ContextCalendarProvider {
  selectedDate: Date | undefined;
  onSetSelectedDate: (valueDate: Date | undefined) => void;
}

export const ContextCalendarProvider = createContext(
  {} as ContextCalendarProvider
);

interface CalendarProvider {
  children: ReactNode;
}

export function CalendarProvider({ children }: CalendarProvider) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  function onSetSelectedDate(valueDate: Date | undefined) {
    setSelectedDate(valueDate);
  }

  return (
    <ContextCalendarProvider.Provider
      value={{ selectedDate, onSetSelectedDate }}
    >
      {children}
    </ContextCalendarProvider.Provider>
  );
}
