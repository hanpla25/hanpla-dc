export default function formatDate(
  dateString: string,
  type: "time" | "YMD" | "relative" | "YMDT" | "MDT"
): string {
  const date = new Date(dateString);
  const now = new Date();

  const toKST = (d: Date) => new Date(d.getTime() + 9 * 60 * 60 * 1000);

  const kstDate = toKST(date);
  const kstNow = toKST(now);

  const formatDatePart = (d: Date) =>
    d
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\.$/, "");

  const formatTimePart = (d: Date) =>
    d.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  if (type === "relative") {
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffSec < 60) return "방금 전";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
    return `${Math.floor(diffSec / 86400)}일 전`;
  }

  const isToday =
    kstDate.getUTCFullYear() === kstNow.getUTCFullYear() &&
    kstDate.getUTCMonth() === kstNow.getUTCMonth() &&
    kstDate.getUTCDate() === kstNow.getUTCDate();

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
