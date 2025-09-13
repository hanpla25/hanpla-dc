const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default function pagination(cur: number, total: number): number[] {
  if (total <= 10) {
    return range(1, total);
  }

  if (cur <= 6) {
    return range(1, 10);
  }

  if (cur >= total - 4) {
    return range(total - 9, total);
  }

  return range(cur - 5, cur + 4);
}
