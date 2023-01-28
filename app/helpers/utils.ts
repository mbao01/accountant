export const aggregateFunc = <T>(items: T[], by: (item: T) => number) => {
  return items.reduce(
    (acc, item) => {
      const value = by(item);
      const $sum = value + Number(acc.$sum);
      const $max = Math.max(value, acc.$max);
      const $min = Math.min(value, acc.$min);
      return { $sum, $min, $max };
    },
    { $sum: 0, $min: 0, $max: 0 } as Record<"$sum" | "$min" | "$max", number>
  );
};

export const groupBy = <T extends Record<string, any>>(
  items: T[],
  by: T[keyof T] | ((item: T) => T[keyof T])
) => {
  const accessorGuard = (t: typeof by): t is T[keyof T] =>
    typeof t === "string";
  const byFunc = accessorGuard(by) ? (item: T) => item[by] : by;

  const grouped = items.reduce((result, item) => {
    const key = byFunc(item);
    return {
      ...result,
      [key]: [...(result[key] || []), item],
    };
  }, {} as Record<ReturnType<typeof byFunc>, T[]>);

  return grouped;
};
