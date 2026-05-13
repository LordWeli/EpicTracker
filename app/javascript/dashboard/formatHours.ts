export const formatHours = (h: number | null) => {
  if (h === null) return "—"
  if (h >= 100) return `${Math.round(h)}h`
  const whole = Math.floor(h)
  const frac  = h - whole
  if (frac >= 0.75) return `${whole}¾h`
  if (frac >= 0.5)  return `${whole}½h`
  if (frac >= 0.25) return `${whole}¼h`
  return `${whole}h`
}
