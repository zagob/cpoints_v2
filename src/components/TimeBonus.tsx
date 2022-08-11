import { ClockAfternoon } from "phosphor-react";
import { useContext } from "react";
import { ContextCalendarProvider } from "../contexts/ContextCalendarProvider";
import { formatBonus } from "../utils/formatBonus";

export function TimeBonus() {
  const { dataTable } = useContext(ContextCalendarProvider);

  const timeValueBonus = dataTable.reduce((acc, value) => {
    const [hour, minute] = value.bonusTimeString.split(":");
    const hourToMinutesNumber = Math.floor(Number(hour) * 60) + Number(minute);

    if (value.status === "NEGATIVE") {
      return acc - hourToMinutesNumber;
    }
    if (value.status === "POSITIVE") {
      return acc + hourToMinutesNumber;
    }

    return 0;
  }, 0);

  const timeBonus = formatBonus(timeValueBonus);

  const statusTime =
    timeBonus.isNegative === "NEGATIVE"
      ? "text-red-500 after:bg-red-500 "
      : timeBonus.isNegative === "POSITIVE"
      ? "text-green-600 after:bg-green-500"
      : "text-gray-600 after:bg-gray-500";

  return (
    <div className="flex items-center gap-2">
      <ClockAfternoon size={25} weight="duotone" className={`${statusTime}`} />
      <div className="border px-2 border-gray-500 bg-blue-800 rounded-md">
        <span
          className={`${statusTime} flex items-center gap-2 after:content[''] after:w-2 after:h-2 after:rounded-full`}
        >
          {timeBonus.isNegative === "NEGATIVE" && "- "}
          {timeBonus.bonusTime}
        </span>
      </div>
    </div>
  );
}
