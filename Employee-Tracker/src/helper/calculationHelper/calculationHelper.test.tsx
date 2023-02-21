import "@testing-library/jest-dom/extend-expect";
import { timeWithCompany } from "./calculationHelper";

describe("timeWithCompany Function Tests", () => {
  it("should return difference in months and correct 'month' or 'months' when years are the same", () => {
    expect(timeWithCompany("March", 2017, "March", 2017)).toBe("0 months");
    expect(timeWithCompany("March", 2017, "July", 2017)).toBe("4 months");
    expect(timeWithCompany("March", 2017, "April", 2017)).toBe("1 month");
  });

  it("should return difference in years and correct 'yr' or 'yrs' when years are not the same", () => {
    expect(timeWithCompany("March", 2015, "March", 2017)).toBe("2 yrs");
    expect(timeWithCompany("March", 2017, "July", 2018)).toBe("1 yr");
    expect(timeWithCompany("March", 2017, "April", 2020)).toBe("3 yrs");
  });
});
