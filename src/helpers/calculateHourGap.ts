export function calculateHourGap(start: Date, end: Date): { hours: number } {
  const msDiff = end.getTime() - start.getTime(); // difference in milliseconds
  const hours = Math.floor((msDiff / (1000 * 60 * 60)) % 24);

  // const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  // const minutes = Math.floor((msDiff / (1000 * 60)) % 60);
  // const seconds = Math.floor((msDiff / 1000) % 60);

  return { hours };
}
