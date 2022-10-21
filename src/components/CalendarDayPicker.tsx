import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import ptBr from "date-fns/locale/pt";
import { useContext } from "react";
import { ContextCalendarProvider } from "../contexts/ContextCalendarProvider";

export function CalendarDayPicker() {
  const { selectedDate, onSetSelectedDate, onChangeMonth, dataTable } =
    useContext(ContextCalendarProvider);

  const dataEmpty = (
    <span className="text-red-500 font-bold">*Selecione uma data</span>
  );

  const disabledDays = dataTable.map((item) =>
    !item.selectedDateString ? [] : new Date(item.selectedDateString)
  );

  const dateSelectedFormat = (
    <span className="text-green-500 text-sm">
      Data Selecionada:{" "}
      {selectedDate ? (
        <>
          {format(new Date(selectedDate), "d 'de' MMMM 'de' yyyy", {
            locale: ptBr,
          })}
        </>
      ) : (
        ""
      )}
    </span>
  );
  return (
    <div className="flex justify-center">
      <DayPicker
        locale={ptBr}
        mode="single"
        selected={selectedDate}
        disabled={[{ dayOfWeek: [0, 6] }, ...disabledDays]}
        modifiers={{
          available: { dayOfWeek: [1, 2, 3, 4, 5] },
        }}
        disableNavigation={!selectedDate}
        onMonthChange={(e) => onChangeMonth(e)}
        onSelect={(date) => onSetSelectedDate(date)}
        captionLayout="dropdown"
        styles={
          {
            // caption_start: { background: "red" },
          }
        }
        fromYear={2015}
        toYear={2025}
        modifiersStyles={{
          disabled: { fontSize: "75%" },
        }}
        footer={selectedDate ? dateSelectedFormat : dataEmpty}
      />
    </div>
  );
}
