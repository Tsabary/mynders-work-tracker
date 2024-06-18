export const toGMTMidnight = (date: Date | null): Date | null => {
  if (!date) return null;

  // Create a new Date object with the same date, but at midnight GMT
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
};
