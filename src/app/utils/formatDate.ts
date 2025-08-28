export default function formatDate(
  dateString: string,
  type: "time" | "YMD" | "relative" | "YMDT" | "MDT"
): string {
  const date = new Date(dateString);
  const now = new Date();

  const formatDatePart = (d: Date) =>
    d
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Seoul",
      })
      .replace(/\.$/, "");

  const formatTimePart = (d: Date) =>
    d.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul",
    });

  if (type === "relative") {
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffSec < 60) return "방금 전";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
    return `${Math.floor(diffSec / 86400)}일 전`;
  }

  const nowKST = new Date(
    now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
  );
  const dateKST = new Date(
    date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
  );
  const isToday = dateKST.toDateString() === nowKST.toDateString();

  switch (type) {
    case "time":
      return isToday ? formatTimePart(date) : formatDatePart(date).slice(5);
    case "YMD":
      return formatDatePart(date);
    case "YMDT":
      return `${formatDatePart(date)} ${formatTimePart(date)}`;
    case "MDT":
      const md = formatDatePart(date).slice(5);
      return `${md} ${formatTimePart(date)}`;
    default:
      return formatDatePart(date);
  }
}
