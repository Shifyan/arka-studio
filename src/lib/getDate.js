import { addMonths, format } from "date-fns";

const threeMonth = () => {
  const threeMonth = [];
  for (let a = 1; a <= 3; a++) {
    const today = new Date();
    const month = addMonths(today, a);
    const formattedMonth = format(month, "MM-yyyy");
    const monthData = {
      month: formattedMonth,
    };
    threeMonth.push(monthData);
  }
  return threeMonth;
};

console.log(threeMonth());
