// Today's date as YYYY-MM-DD in the user's local timezone.
export function todayLocal() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Parse a YYYY-MM-DD string at noon local time, which avoids timezone edge cases around midnight.
export function parseLocalDate(s) {
  return new Date(`${s}T12:00:00`);
}

// Monday of the week containing `date`, at 00:00 local time.
export function startOfWeek(date) {
  const r = new Date(date);
  const d = r.getDay();
  r.setDate(r.getDate() + (d === 0 ? -6 : 1 - d));
  r.setHours(0, 0, 0, 0);
  return r;
}

// Is the YYYY-MM-DD string `s` inside the period `p` ("all" | "week" | "month" | "30days")?
export function isWithinPeriod(s, p) {
  if (p === "all") return true;
  const d = parseLocalDate(s);
  const t = new Date();
  t.setHours(23, 59, 59, 999);
  if (p === "week") return d >= startOfWeek(t) && d <= t;
  if (p === "month") return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth();
  if (p === "30days") {
    const x = new Date(t);
    x.setDate(x.getDate() - 29);
    x.setHours(0, 0, 0, 0);
    return d >= x && d <= t;
  }
  return true;
}
