export function formatDataTime(time: string) {
  const [hour, minute] = time.split(":");

  return `${hour.padStart(2, "0")}h:${minute.padStart(2, "0")}m`;
}
