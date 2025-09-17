export default function formatDate(
  dateString: string,
  type: "time" | "YMD" | "relative" | "YMDT" | "MDT"
): string {
  const dateUTC = new Date(dateString);

  // KST 기준 변환
  const date = new Date(
    dateUTC.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const pad = (n: number) => String(n).padStart(2, "0");

  const formatDatePart = (d: Date) =>
    `${d.getFullYear()}. ${pad(d.getMonth() + 1)}. ${pad(d.getDate())}`;
  const formatTimePart = (d: Date) =>
    `${pad(d.getHours())}:${pad(d.getMinutes())}`;

  if (type === "relative") {
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffSec < 60) return "방금 전";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
    return `${Math.floor(diffSec / 86400)}일 전`;
  }

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  switch (type) {
    case "time":
      return isToday ? formatTimePart(date) : formatDatePart(date).slice(5);
    case "YMD":
      return formatDatePart(date);
    case "YMDT":
      return `${formatDatePart(date)} ${formatTimePart(date)}`;
    case "MDT":
      return `${formatDatePart(date).slice(5)} ${formatTimePart(date)}`;
    default:
      return formatDatePart(date);
  }
}
