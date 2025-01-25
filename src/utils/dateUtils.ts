import { DateRangeProp } from "../types/dateRangeTypes";

export const DateUtils = {
  formatDate: (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  },

  isWeekend: (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  },

  findWeekendDates: (start: Date, end: Date): Date[] => {
    const weekendDates: Date[] = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      if (DateUtils.isWeekend(currentDate)) {
        weekendDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekendDates;
  },

  adjustToWeekdays: (range: DateRangeProp): DateRangeProp => {
    const { start, end } = range;

    // Move start to next weekday if it's a weekend
    while (DateUtils.isWeekend(start)) {
      start.setDate(start.getDate() + 1);
    }

    // Move end to previous weekday if it's a weekend
    while (DateUtils.isWeekend(end)) {
      end.setDate(end.getDate() - 1);
    }

    return { start, end };
  },
};
