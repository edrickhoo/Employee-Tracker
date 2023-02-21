import { convMonthToNum } from "../validationHelper/validationHelper";

export const timeWithCompany = (
  startMonth: string,
  startYear: number,
  endMonth: string,
  endYear: number
): string => {
  const convStartMonth = convMonthToNum(startMonth);
  const convEndMonth = convMonthToNum(endMonth);
  let total = "";
  if (startYear === endYear) {
    total += convEndMonth - convStartMonth;
    total === "1" ? (total += " month") : (total += " months");
    return total;
  }
  total += endYear - startYear;
  total === "1" ? (total += " yr") : (total += " yrs");
  return total;
};
