import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WeekdayDateRangePicker } from "./WeekdayDateRangePicker";
import { DateUtils } from "../utils/dateUtils";

vi.mock("../utils/dateUtils", () => ({
  DateUtils: {
    formatDate: vi.fn((date) => (date ? date.toISOString().split("T")[0] : "")),
    isWeekend: vi.fn((date) => [0, 6].includes(date.getDay())),
    findWeekendDates: vi.fn(() => []),
    adjustToWeekdays: vi.fn((range) => range),
  },
}));

describe("WeekdayDateRangePicker Component", () => {
  const createDate = (year: number, month: number, day: number) =>
    new Date(year, month, day);

  const defaultProps = {
    predefinedRanges: [],
    onDateRangeChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the initial input button", () => {
    render(<WeekdayDateRangePicker {...defaultProps} />);

    const inputButton = screen.getByText("Start Date - End Date");
    expect(inputButton).toBeInTheDocument();
  });

  describe("Date Selection", () => {
    it("selects start date on first click", () => {
      vi.spyOn(DateUtils, "isWeekend").mockReturnValue(false);

      render(<WeekdayDateRangePicker {...defaultProps} />);

      fireEvent.click(screen.getByText("Start Date - End Date"));

      const dateCell = screen.getByText("25");
      fireEvent.click(dateCell);

      expect(screen.getByText("Start Date - End Date")).toBeInTheDocument();
    });

    it("prevents selecting weekend dates", () => {
      vi.spyOn(DateUtils, "isWeekend").mockReturnValue(true);

      const onDateRangeChange = vi.fn();
      render(
        <WeekdayDateRangePicker
          predefinedRanges={[]}
          onDateRangeChange={onDateRangeChange}
        />
      );

      fireEvent.click(screen.getByText("Start Date - End Date"));

      const dateCell = screen.getByText("20");
      fireEvent.click(dateCell);

      expect(onDateRangeChange).not.toHaveBeenCalled();
    });
  });

  describe("Predefined Ranges", () => {
    const mockPredefinedRanges = [
      {
        label: "Last 7 days",
        getRange: () => ({
          start: createDate(2025, 0, 8),
          end: createDate(2025, 0, 15),
        }),
      },
    ];

    it("applies predefined range", () => {
      const onDateRangeChange = vi.fn();
      render(
        <WeekdayDateRangePicker
          predefinedRanges={mockPredefinedRanges}
          onDateRangeChange={onDateRangeChange}
        />
      );

      fireEvent.click(screen.getByText("Start Date - End Date"));

      const rangeButton = screen.getByText("Last 7 days");
      fireEvent.click(rangeButton);

      expect(onDateRangeChange).toHaveBeenCalled();
    });
  });
});
