export function formatBonus(num: number) {
  const isNegative =
    Math.sign(num) === 1
      ? "POSITIVE"
      : Math.sign(num) === -1
      ? "NEGATIVE"
      : "EQUAL";
  const numberInt = Math.abs(num);
  const hour = Math.floor(numberInt / 60)
    .toString()
    .padStart(2, "0");
  const minute = (numberInt % 60).toString().padStart(2, "0");

  const bonusTime = `${hour}h:${minute}m`;

  return { bonusTime, isNegative };
}
