// convert angle to minutes


export function angleToMinutes(angle: number) {
  const normalized = (angle + 360) % 360;
  return Math.round((normalized / 360) * 120); // 0 to 120 minutes
}
