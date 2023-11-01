import { format } from "date-fns-tz";

export const timeFormater = (date: string) => {
  const created_at = date;
  const koreanTimezone = "Asia/Seoul";

  const formattedDate = format(new Date(created_at), "yyyy년 MM월 dd일", {
    timeZone: koreanTimezone,
  });
  return formattedDate;
};
