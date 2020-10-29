export const getDistance = (x1: number, x2: number, y1: number, y2: number) => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
