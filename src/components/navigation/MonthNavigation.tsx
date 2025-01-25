import { NavigationProps } from "../../types/dateRangeTypes";
import { NavButton } from "./NavButton";

export const MonthNavigation = ({
  currentYear,
  currentMonth,
  onYearChange,
  onMonthChange,
}: Readonly<NavigationProps>) => (
  <div className="flex justify-between items-center mb-4">
    <NavButton
      onClick={() => {
        if (currentMonth === 0) {
          onYearChange(currentYear - 1);
          onMonthChange(11);
        } else {
          onMonthChange(currentMonth - 1);
        }
      }}
      label="<"
    />
    <div className="text-lg font-bold">
      {new Date(currentYear, currentMonth).toLocaleString("default", {
        month: "long",
      })}
    </div>
    <NavButton
      onClick={() => {
        if (currentMonth === 11) {
          onYearChange(currentYear + 1);
          onMonthChange(0);
        } else {
          onMonthChange(currentMonth + 1);
        }
      }}
      label=">"
    />
  </div>
);
