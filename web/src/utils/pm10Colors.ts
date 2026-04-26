export function getColor(pm10: number) {
  if (pm10 < 20) return 'green';
  if (pm10 < 40) return 'yellow';
  return 'red';
}
