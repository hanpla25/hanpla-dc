const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default function pagination(cur: number, total: number): number[] {
  if (total <= 5) {
    return range(1, total);
  }

  if (cur <= 3) {
    return range(1, 5);
  }

  if (cur >= total - 2) {
    return range(total - 4, total);
  }

  return range(cur - 2, cur + 2);
}
