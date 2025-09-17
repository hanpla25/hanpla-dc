export default function formatDate(
  dateString: string,
  type: "time" | "YMD" | "relative" | "YMDT" | "MDT"
): string {
  const date = new Date(dateString);
  const now = new Date();

  const formatDatePart = (d: Date) =>
    d.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Seoul",
    });

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

  const kstDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );
  const kstNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const isToday =
    kstDate.getFullYear() === kstNow.getFullYear() &&
    kstDate.getMonth() === kstNow.getMonth() &&
    kstDate.getDate() === kstNow.getDate();

  switch (type) {
    case "time":
      return isToday
        ? formatTimePart(kstDate)
        : formatDatePart(kstDate).slice(5);
    case "YMD":
      return formatDatePart(kstDate);
    case "YMDT":
      return `${formatDatePart(kstDate)} ${formatTimePart(kstDate)}`;
    case "MDT":
      const md = formatDatePart(kstDate).slice(5);
      return `${md} ${formatTimePart(kstDate)}`;
    default:
      return formatDatePart(kstDate);
  }
}
