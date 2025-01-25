export interface DateRangeProp {
  start: Date;
  end: Date;
}

export interface PredefinedRange {
  label: string;
  getRange: () => DateRangeProp;
}

export interface WeekdayDateRangePickerProps {
  predefinedRanges?: PredefinedRange[];
  onDateRangeChange?: (dateRange: DateRangeProp, weekendDates: Date[]) => void;
}

export interface NavigationProps {
  currentYear: number;
  currentMonth: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

export interface DateCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isWeekendDay: boolean;
  onSelect: (date: Date) => void;
}

export interface PredefinedRangesProps {
  predefinedRanges: PredefinedRange[];
  onRangeSelect: (range: DateRangeProp) => void;
}
