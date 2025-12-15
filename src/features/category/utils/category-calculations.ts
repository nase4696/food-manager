export function findMostCommonCategory(
  data: Array<{ name: string; value: number }>,
): string {
  if (!Array.isArray(data) || data.length === 0) {
    return "データなし";
  }

  const mostCommon = data.reduce((max, item) =>
    item.value > max.value ? item : max,
  );
  return mostCommon.name;
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}
