// helps get angles 

export function polarToCartesian(center: number, radius: number, angle: number) {
  const rads = ((angle - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(rads),
    y: center + radius * Math.sin(rads),
  };
}
