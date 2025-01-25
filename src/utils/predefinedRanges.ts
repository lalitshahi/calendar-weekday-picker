import { DateRangeProp } from "../types/dateRangeTypes";

export const getPredefinedRanges = (): {
  label: string;
  getRange: () => DateRangeProp;
}[] => {
  return [
    {
      label: "Last 7 days",
      getRange: () => {
        const today = new Date();
        const start = new Date();
        start.setDate(today.getDate() - 7);
        return { start, end: today };
      },
    },
    {
      label: "Last 30 days",
      getRange: () => {
        const today = new Date();
        const start = new Date();
        start.setDate(today.getDate() - 30);
        return { start, end: today };
      },
    },
    {
      label: "Next 7 days",
      getRange: () => {
        const today = new Date();
        const end = new Date();
        end.setDate(today.getDate() + 7);
        return { start: today, end };
      },
    },
    {
      label: "Next 30 days",
      getRange: () => {
        const today = new Date();
        const end = new Date();
        end.setDate(today.getDate() + 30);
        return { start: today, end };
      },
    },
    {
      label: "This Quarter",
      getRange: () => {
        const now = new Date();
        const quarterStart = new Date(
          now.getFullYear(),
          Math.floor(now.getMonth() / 3) * 3,
          1
        );
        const quarterEnd = new Date(
          quarterStart.getFullYear(),
          quarterStart.getMonth() + 3,
          0
        );
        return { start: quarterStart, end: quarterEnd };
      },
    },
  ];
};
