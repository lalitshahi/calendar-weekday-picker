import { DateCellProps } from "../types/dateRangeTypes";

export const DateCell = ({
  date,
  isCurrentMonth,
  isSelected,
  isInRange,
  isWeekendDay,
  onSelect,
}: Readonly<DateCellProps>) => {
  // Determine the base text and background colors
  const textColor = isCurrentMonth ? "text-black" : "text-gray-400";

  // Default value for non-selected and non-in-range
  let backgroundColor = "hover:bg-orange-100";

  if (isSelected) {
    backgroundColor = "bg-orange-500 text-white";
  } else if (isInRange) {
    backgroundColor = "bg-orange-200";
  }
  const disabledStyles = isWeekendDay
    ? "text-gray-300 bg-white cursor-not-allowed"
    : "";

  return (
    <button
      key={date.toISOString()}
      onClick={() => {
        if (!isWeekendDay) {
          const localDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );
          onSelect(localDate);
        }
      }}
      className={`p-2 text-center rounded ${textColor} ${backgroundColor} ${disabledStyles}`}
      disabled={isWeekendDay}
    >
      {date.getDate()}
    </button>
  );
};
