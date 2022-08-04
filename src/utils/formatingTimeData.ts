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

  const bonusHour = Math.floor(Math.abs(bonusTotalMinutes) / 60);
  const bonusMinutes = Math.abs(bonusTotalMinutes) % 60;

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
  const [entry1Hour, entry1Minute] = dataTime.entry1.split(":");
  const [exit1Hour, exit1Minute] = dataTime.exit1.split(":");
  const [entry2Hour, entry2Minute] = dataTime.entry2.split(":");
  const [exit2Hour, exit2Minute] = dataTime.exit2.split(":");

  const dataTimeEntry = addMinutes(
    addHours(new Date(dataTime.selectedDateString), Number(entry1Hour)),
    Number(entry1Minute)
  );
  const dataTimeEntryLunch = addMinutes(
    addHours(new Date(dataTime.selectedDateString), Number(exit1Hour)),
    Number(exit1Minute)
  );

  const dataTimeExitLunch = addMinutes(
    addHours(new Date(dataTime.selectedDateString), Number(entry2Hour)),
    Number(entry2Minute)
  );
  const dataTimeExit = addMinutes(
    addHours(new Date(dataTime.selectedDateString), Number(exit2Hour)),
    Number(exit2Minute)
  );

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

  const totalWork = operationTimeString(
    timeMorningString,
    timeAfternoonString,
    "ADD"
  );

  const { status, bonusTimeString } = verifyStatusWithTotalWork(totalWork);

  const data = {
    ...dataTime,
    timeMorningString,
    timeLunchString,
    timeAfternoonString,
    totalWork,
    status,
    bonusTimeString,
    // bonusTimeString:
    //   status === "NEGATIVE" ? `-${bonusTimeString}` : bonusTimeString,
  };

  return data;
}
