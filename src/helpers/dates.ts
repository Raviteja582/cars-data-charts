// export enum MonthsToInt {
//   "January" = 1,
//   "February" = 2,
//   "March" = 3,
//   "April" = 4,
//   "May" = 5,
//   "June" = 6,
//   "July" = 7,
//   "August" = 8,
//   "September" = 9,
//   "October" = 10,
//   "November" = 11,
//   "December" = 12,
// }

export const monthToInt = (month: string) => {
  return new Date(month + " 1, 2000").getMonth();
};

export const intToMonth = (num: number) => {
    num-=1; // zero based index
  return new Date(2000, num).toLocaleString("default", {
    month: "long",
  });
};
