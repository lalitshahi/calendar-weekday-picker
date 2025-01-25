import { NavigationProps } from "../../types/dateRangeTypes";
import { NavButton } from "./NavButton";

export const YearNavigation = ({
  currentYear,
  onYearChange,
}: Readonly<Pick<NavigationProps, "currentYear" | "onYearChange">>) => (
  <div className="flex justify-between items-center mb-4">
    <NavButton onClick={() => onYearChange(currentYear - 1)} label="<" />
    <div className="text-lg font-bold">
      {new Date(currentYear, 0).toLocaleString("default", {
        year: "numeric",
      })}
    </div>
    <NavButton onClick={() => onYearChange(currentYear + 1)} label=">" />
  </div>
);
