export function findMostCommonCategory(
  data: Array<{ name: string; value: number }>,
): string | null {
  if (data.length === 0) return null;

  const mostCommon = data.reduce((max, item) =>
    item.value > max.value ? item : max,
  );
  return mostCommon.name;
}

export function calculateCategoryStats(data: Array<{ value: number }>) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const average = data.length > 0 ? total / data.length : 0;

  return { total, average };
}
