import { intervalToDuration, addMinutes, addHours } from "date-fns";

interface DateTimeProps {
  entry1: string;
  entry2: string;
  exit1: string;
  exit2: string;
  selectedDateString: string;
}

interface convertTimeStringProps {
  hours: number | undefined;
  minutes: number | undefined;
}

function convertTimeString({ hours, minutes }: convertTimeStringProps) {
  return `${hours?.toString().padStart(2, "0")}:${minutes
    ?.toString()
    .padStart(2, "0")}`;
}

function addTimeString(time1: string, time2: string) {
  const [hour1, minutes1] = time1.split(":");
  const [hour2, minutes2] = time2.split(":");

  const sumTotalMinutes = Number(minutes1) + Number(minutes2);
  const sumHours = Number(hour1) + Number(hour2);

  const getHoursToTotalMinutes = Math.floor(sumTotalMinutes / 60);

  const getHoursTotal = sumHours + getHoursToTotalMinutes;
  const getRestMinutes = sumTotalMinutes % 60;

  return convertTimeString({
    hours: getHoursTotal,
    minutes: getRestMinutes,
  });
}

function operationTimeString(
  time1: string,
  time2: string,
  status: "ADD" | "SUB"
) {
  const [hour1, minutes1] = time1.split(":");
  const [hour2, minutes2] = time2.split(":");

  const getMinutesToHourt1 = Number(hour1) * 60 + Number(minutes1);
  const getMinutesToHourt2 = Number(hour2) * 60 + Number(minutes2);

  const operationMinutes =
    status === "ADD"
      ? getMinutesToHourt1 + getMinutesToHourt2
      : getMinutesToHourt1 - getMinutesToHourt2;

  const minutesToHour = Math.floor(operationMinutes / 60);
  const restTotalMinutes = operationMinutes % 60;

  return convertTimeString({
    hours: minutesToHour,
    minutes: restTotalMinutes,
  });
}

function verifyStatusWithTotalWork(time: string) {
  const total = 8 * 60;
  const [hour, minutes] = time.split(":");

  const getTotalMinutes = Number(hour) * 60 + Number(minutes);

  const bonusTotalMinutes = getTotalMinutes - total;

  const bonusHour = Math.floor(bonusTotalMinutes / 60);
  const bonusMinutes = bonusTotalMinutes % 60;

  const bonusTimeString = convertTimeString({
    hours: bonusHour,
    minutes: bonusMinutes,
  });

  const status =
    getTotalMinutes > total
      ? "POSITIVE"
      : getTotalMinutes < total
      ? "NEGATIVE"
      : "EQUAL";

  return { status, bonusTimeString };
}

export function getTimeDate(dataTime: DateTimeProps) {
  const dataTimeEntry = addMinutes(addHours(new Date("2022/07/29"), 9), 30);
  const dataTimeEntryLunch = addMinutes(
    addHours(new Date("2022/07/29"), 12),
    30
  );

  const dataTimeExitLunch = addMinutes(addHours(new Date("2022/07/29"), 14), 0);
  const dataTimeExit = addMinutes(addHours(new Date("2022/07/29"), 19), 0);

  const timeMorning = intervalToDuration({
    start: dataTimeEntry,
    end: dataTimeEntryLunch,
  });

  const timeLunch = intervalToDuration({
    start: dataTimeEntryLunch,
    end: dataTimeExitLunch,
  });

  const timeAfternoon = intervalToDuration({
    start: dataTimeExitLunch,
    end: dataTimeExit,
  });

  const timeMorningString = convertTimeString({
    hours: timeMorning.hours,
    minutes: timeMorning.minutes,
  });

  const timeLunchString = convertTimeString({
    hours: timeLunch.hours,
    minutes: timeLunch.minutes,
  });

  const timeAfternoonString = convertTimeString({
    hours: timeAfternoon.hours,
    minutes: timeAfternoon.minutes,
  });

  console.log("timeMorning", timeMorningString);
  console.log("timeLunch", timeLunchString);
  console.log("timeAfternoon", timeAfternoonString);

  //   const totalWork = addTimeString(timeMorningString, timeAfternoonString);
  const totalWork = operationTimeString(
    timeMorningString,
    timeAfternoonString,
    "ADD"
  );
  //   const totalWork = hoursMorning + hoursAfternoon;

  console.log("totalWork", totalWork);
  const { status, bonusTimeString } = verifyStatusWithTotalWork(totalWork);
  console.log("status", status);
  console.log("bonusTimeString", bonusTimeString);

  const data = {
    ...dataTime,
    timeMorningString,
    timeLunchString,
    timeAfternoonString,
    totalWork,
    status,
    bonusTimeString,
  };

  console.log("data", data);

  //   const totalWork = operationTimeString(
  //     timeMorningString,
  //     timeAfternoonString,
  //     "ADD"
  //   );
}
