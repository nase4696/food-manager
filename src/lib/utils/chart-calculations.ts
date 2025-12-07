export function calculateTotal(data: Array<{ value: number }>): number {
  return data.reduce((sum, item) => sum + item.value, 0);
}

export function calculateListItems(
  data: Array<{ name: string; value: number; color: string }>,
  total: number,
) {
  return data.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));
}
