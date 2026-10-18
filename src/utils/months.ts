import { formatDate } from "./format";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/** A month's label: Roman numerals in Polish (the school convention there -
 * "IX", "X"), the short month name otherwise ("Sep"). `month` is "YYYY-MM". */
export function monthLabel(month: string, language: string | undefined): string {
  if ((language ?? "").toLowerCase().startsWith("pl")) return ROMAN[Number(month.slice(5, 7)) - 1] ?? month;
  return formatDate(new Date(`${month}-01T00:00:00`), language, { month: "short" }).replace(".", "");
}

/** The school year's months as "YYYY-MM", from its first to its last month
 * (falls back to September-June around `since`). */
export function schoolMonths(startIso: string | undefined, endIso: string | undefined, since: string | undefined): string[] {
  let start = startIso?.slice(0, 7);
  let end = endIso?.slice(0, 7);
  if (!start || !end) {
    const ref = since ? new Date(`${since.slice(0, 10)}T00:00:00`) : new Date();
    const year = ref.getMonth() >= 8 ? ref.getFullYear() : ref.getFullYear() - 1;
    start = `${year}-09`;
    end = `${year + 1}-06`;
  }
  const months: string[] = [];
  let [y, m] = start.split("-").map(Number);
  while (months.length < 12) {
    const key = `${y}-${String(m).padStart(2, "0")}`;
    months.push(key);
    if (key >= end) break;
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return months;
}
