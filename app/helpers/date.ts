import formatter from "date-fns/format";

export const formatDate = (
  date: Date | number | string | null,
  format: string = "dd/MM/yyyy"
) => (date ? formatter(new Date(date), format) : null);
