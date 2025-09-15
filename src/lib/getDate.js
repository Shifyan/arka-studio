import { addMonths, format, getDaysInMonth } from "date-fns";
import { id } from "date-fns/locale";

export function getNextThreeMonths() {
  const result = [];

  for (let i = 1; i <= 3; i++) {
    const today = new Date();
    const futureMonth = addMonths(today, i);

    result.push({
      month: format(futureMonth, "MM"), // 01, 02, ...
      monthName: format(futureMonth, "MMMM", { locale: id }), // Januari, Februari
      year: format(futureMonth, "yyyy"), // 2025
      daysInMonth: getDaysInMonth(futureMonth), // jumlah hari
      firstDay: format(
        new Date(futureMonth.getFullYear(), futureMonth.getMonth(), 1),
        "EEEE",
        { locale: id }
      ), // hari pertama
      lastDay: format(
        new Date(
          futureMonth.getFullYear(),
          futureMonth.getMonth(),
          getDaysInMonth(futureMonth)
        ),
        "EEEE",
        { locale: id }
      ), // hari terakhir
    });
  }

  return result;
}
