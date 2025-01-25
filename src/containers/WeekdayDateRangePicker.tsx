import { useEffect, useMemo, useRef, useState } from "react";
import { DateCell } from "../components/DateCell";
import { DayHeaders } from "../components/DayHeaders";
import { MonthNavigation } from "../components/navigation/MonthNavigation";
import { YearNavigation } from "../components/navigation/YearNavigation";
import { PredefinedRangeTags } from "../components/PredefinedRangeTags";
import {
  DateRangeProp,
  WeekdayDateRangePickerProps,
} from "../types/dateRangeTypes";
import { DateUtils } from "../utils/dateUtils";

export const WeekdayDateRangePicker = ({
  predefinedRanges = [],
  onDateRangeChange,
}: Readonly<WeekdayDateRangePickerProps>) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const inputRef = useRef<HTMLDivElement>(null);

  // Generate days for the current month including previous and next month's days
  const monthDays = useMemo(() => {
    const days: { date: Date; isCurrentMonth: boolean }[] = [];
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const firstWeekDay = firstDay.getDay();
    const lastWeekDay = lastDay.getDay();

    // Add days from the previous month to fill the start of the week
    if (firstWeekDay > 0) {
      const previousMonthLastDay = new Date(currentYear, currentMonth, 0);
      for (let i = firstWeekDay - 1; i >= 0; i--) {
        const date = new Date(previousMonthLastDay);
        date.setDate(previousMonthLastDay.getDate() - i);
        days.push({ date, isCurrentMonth: false });
      }
    }

    // Add all days of the current month
    for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
      days.push({ date: new Date(day), isCurrentMonth: true });
    }

    // Add days from the next month to fill the end of the week
    if (lastWeekDay < 6) {
      const nextMonthFirstDay = new Date(currentYear, currentMonth + 1, 1);
      for (let i = 1; i <= 6 - lastWeekDay; i++) {
        const date = new Date(nextMonthFirstDay);
        date.setDate(nextMonthFirstDay.getDate() + i - 1);
        days.push({ date, isCurrentMonth: false });
      }
    }

    return days;
  }, [currentYear, currentMonth]);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (DateUtils.isWeekend(date)) return;

    let newStartDate = selectedStartDate;
    let newEndDate = selectedEndDate;

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      newStartDate = date;
      newEndDate = null;
    } else if (selectedStartDate && !selectedEndDate) {
      if (date < selectedStartDate) {
        newStartDate = date;
      } else {
        newEndDate = date;
        setIsPopoverOpen(false);
      }
    }

    setSelectedStartDate(newStartDate);
    setSelectedEndDate(newEndDate);

    // Determine weekend dates in the range
    if (newStartDate && newEndDate && onDateRangeChange) {
      const weekendDates = DateUtils.findWeekendDates(newStartDate, newEndDate);
      onDateRangeChange({ start: newStartDate, end: newEndDate }, weekendDates);
    }
  };

  // Handle predefined range selection
  const handlePredefinedRangeSelect = (range: DateRangeProp) => {
    const adjustedRange = DateUtils.adjustToWeekdays(range);

    setSelectedStartDate(adjustedRange.start);
    setSelectedEndDate(adjustedRange.end);

    if (onDateRangeChange) {
      const weekendDates = DateUtils.findWeekendDates(
        adjustedRange.start,
        adjustedRange.end
      );
      onDateRangeChange(adjustedRange, weekendDates);
    }

    setIsPopoverOpen(false);
  };

  return (
    <div className="relative w-[600px]" ref={inputRef}>
      {/* Input Box */}
      <button
        aria-label="Date Range Picker"
        tabIndex={-1}
        className="border rounded px-4 py-2 cursor-pointer"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        {selectedStartDate && selectedEndDate
          ? `${DateUtils.formatDate(
              selectedStartDate
            )} - ${DateUtils.formatDate(selectedEndDate)}`
          : "Start Date - End Date"}
      </button>

      {/* Calendar Popover */}
      {isPopoverOpen && (
        <div className="absolute z-10 mt-2 bg-white border rounded shadow p-4">
          {/* Calendar Navigation */}
          <YearNavigation
            currentYear={currentYear}
            onYearChange={setCurrentYear}
          />
          <MonthNavigation
            currentYear={currentYear}
            currentMonth={currentMonth}
            onYearChange={setCurrentYear}
            onMonthChange={setCurrentMonth}
          />

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            <DayHeaders />

            {monthDays.map(({ date, isCurrentMonth }) => {
              const isSelected =
                (selectedStartDate &&
                  date.toDateString() === selectedStartDate.toDateString()) ||
                (selectedEndDate &&
                  date.toDateString() === selectedEndDate.toDateString());

              const isInRange =
                selectedStartDate &&
                selectedEndDate &&
                date >= selectedStartDate &&
                date <= selectedEndDate;

              const isWeekendDay = DateUtils.isWeekend(date);

              return (
                <DateCell
                  key={date.toISOString()}
                  date={date}
                  isCurrentMonth={isCurrentMonth}
                  isSelected={!!isSelected}
                  isInRange={!!isInRange}
                  isWeekendDay={isWeekendDay}
                  onSelect={handleDateSelect}
                />
              );
            })}
          </div>

          {/* Predefined Ranges */}
          <PredefinedRangeTags
            predefinedRanges={predefinedRanges}
            onRangeSelect={handlePredefinedRangeSelect}
          />
        </div>
      )}
    </div>
  );
};
