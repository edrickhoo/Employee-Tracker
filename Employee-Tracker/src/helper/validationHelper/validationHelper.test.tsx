import "@testing-library/jest-dom/extend-expect";
import {
  canBeOnGoingHelper,
  convMonthToNum,
  isValidEndDateHelper,
} from "./validationHelper";

const date = new Date();
const currDay = date.getDate();
const currMonth = date.toLocaleString("default", { month: "long" });
const currYear = date.getFullYear();

describe("convMonthToNum Function Tests", () => {
  it("should give correct number when a valid month is passed", async () => {
    expect(convMonthToNum("January")).toBe(1);
    expect(convMonthToNum("February")).toBe(2);
    expect(convMonthToNum("March")).toBe(3);
    expect(convMonthToNum("April")).toBe(4);
    expect(convMonthToNum("May")).toBe(5);
    expect(convMonthToNum("June")).toBe(6);
    expect(convMonthToNum("July")).toBe(7);
    expect(convMonthToNum("August")).toBe(8);
    expect(convMonthToNum("September")).toBe(9);
    expect(convMonthToNum("October")).toBe(10);
    expect(convMonthToNum("November")).toBe(11);
    expect(convMonthToNum("December")).toBe(12);
  });

  it("Should return undefined when a invalid month is passed", async () => {
    expect(convMonthToNum("pizza")).toBe(undefined);
    expect(convMonthToNum("test")).toBe(undefined);
  });
});

describe("canBeOnGoingHelper Function Tests", () => {
  it("should return true when a future date is passed compared to today's date", async () => {
    expect(
      canBeOnGoingHelper({
        endDateDay: currDay,
        endDateMonth: currMonth,
        endDateYear: currYear + 1,
      })
    ).toBe(true);
    expect(
      canBeOnGoingHelper({
        endDateDay: currDay + 1,
        endDateMonth: currMonth,
        endDateYear: currYear,
      })
    ).toBe(true);
    expect(
      canBeOnGoingHelper({
        endDateDay: currDay,
        endDateMonth: currMonth,
        endDateYear: currYear + 44,
      })
    ).toBe(true);
  });

  it("should return false when present or previous date is passed", async () => {
    expect(
      canBeOnGoingHelper({
        endDateDay: currDay,
        endDateMonth: currMonth,
        endDateYear: currYear,
      })
    ).toBe(false);
    expect(
      canBeOnGoingHelper({
        endDateDay: currDay,
        endDateMonth: currMonth,
        endDateYear: currYear - 1,
      })
    ).toBe(false);
    expect(
      canBeOnGoingHelper({
        endDateDay: currDay - 1,
        endDateMonth: currMonth,
        endDateYear: currYear,
      })
    ).toBe(false);
  });
});

describe("isValidEndDateHelper Function Tests", () => {
  it("should return true when end date is later or same as start date", async () => {
    expect(isValidEndDateHelper(16, "January", 2019, 16, "January", 2019)).toBe(
      true
    );
    expect(isValidEndDateHelper(16, "January", 2019, 16, "March", 2024)).toBe(
      true
    );
  });

  it("should return false when start date is later than end date", async () => {
    expect(isValidEndDateHelper(16, "January", 2019, 15, "January", 2019)).toBe(
      false
    );
    expect(isValidEndDateHelper(6, "March", 2019, 16, "January", 2019)).toBe(
      false
    );
    expect(isValidEndDateHelper(18, "March", 2023, 7, "January", 2020)).toBe(
      false
    );
  });
});
