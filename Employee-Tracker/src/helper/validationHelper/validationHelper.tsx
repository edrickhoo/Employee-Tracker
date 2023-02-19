interface monthToNumber {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}

const monthToNumber: monthToNumber = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export const convMonthToNum = (month: string): number => {
  return monthToNumber[month as keyof monthToNumber];
};

export const canBeOnGoingHelper = ({
  endDateDay,
  endDateMonth,
  endDateYear,
}: {
  endDateDay: number;
  endDateMonth: string;
  endDateYear: number;
}): boolean => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const convertedEndMonth = monthToNumber[endDateMonth as keyof monthToNumber];

  if (Number(endDateYear) < year) {
    return false;
  }

  if (Number(endDateYear) === year && Number(convertedEndMonth) < month) {
    return false;
  }

  if (
    Number(endDateYear) === year &&
    Number(convertedEndMonth) === month &&
    Number(endDateDay) <= day
  ) {
    return false;
  }

  return true;
};

export const isValidEndDateHelper = (
  startDay: number,
  startMonth: string,
  startYear: number,
  endDay: number,
  endMonth: string,
  endYear: number
): boolean => {
  const covStartMonth = monthToNumber[startMonth as keyof monthToNumber];
  const covEndMonth = monthToNumber[endMonth as keyof monthToNumber];

  if (Number(endYear) - Number(startYear) < 0) {
    return false;
  }

  if (
    Number(endYear) - Number(startYear) === 0 &&
    Number(covEndMonth) - Number(covStartMonth) < 0
  ) {
    return false;
  }

  if (
    Number(endYear) - Number(startYear) === 0 &&
    Number(covEndMonth) - Number(covStartMonth) === 0 &&
    Number(endDay) - Number(startDay) < 0
  ) {
    return false;
  }

  return true;
};
