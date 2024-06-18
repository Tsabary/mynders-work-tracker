// Utility function to adjust to local time
export const adjustToLocalTime = (date: Date): Date => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  return new Date(date.getTime() + timezoneOffset);
};
