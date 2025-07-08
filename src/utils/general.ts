export const pickRandomFromArray = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
