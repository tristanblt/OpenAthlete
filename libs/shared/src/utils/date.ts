export const startOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const endOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

export const getMonthPeriod = (date: Date): { start: Date; end: Date } => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { start: startOfDay(start), end: endOfDay(end) };
};

export const getWeekPeriod = (date: Date): { start: Date; end: Date } => {
  const start = new Date(date);
  const end = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  end.setDate(end.getDate() + (6 - end.getDay()));
  return { start: startOfDay(start), end: endOfDay(end) };
};

export const getYearPeriod = (date: Date): { start: Date; end: Date } => {
  const start = new Date(date.getFullYear(), 0, 1);
  const end = new Date(date.getFullYear() + 1, 0, 0);
  return { start: startOfDay(start), end: endOfDay(end) };
};
