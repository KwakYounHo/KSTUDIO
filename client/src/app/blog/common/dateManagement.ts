import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const toISO8601 = (date: string, format: string): string => {
  const time = dayjs(date).tz("Asia/Seoul").format(format);
  return time;
};

export const toUTC = (date: Date): string => {
  const time = dayjs(date).utc().format("YYYY-MM-DDTHH-mm-ss.SSS+00:00");
  return time;
};
