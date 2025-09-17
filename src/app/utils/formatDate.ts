export default function formatDate(
  dateString: string,
  type: "time" | "YMD" | "relative" | "YMDT" | "MDT"
): string {
  // ISO 문자열을 UTC 기준으로 생성
  const utcDate = new Date(dateString);
  const now = new Date();

  // KST로 변환 (UTC + 9시간)
  const toKST = (d: Date) => new Date(d.getTime() + 9 * 60 * 60 * 1000);
  const kstDate = toKST(utcDate);
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

  // 상대 시간 표시
  if (type === "relative") {
    const diffSec = Math.floor((now.getTime() - utcDate.getTime()) / 1000);
    if (diffSec < 60) return "방금 전";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
    return `${Math.floor(diffSec / 86400)}일 전`;
  }

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
