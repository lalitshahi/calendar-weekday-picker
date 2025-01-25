import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MonthNavigation } from "./MonthNavigation";

describe("MonthNavigation Component", () => {
  const defaultProps = {
    currentYear: 2025,
    currentMonth: 0, // January
    onYearChange: vi.fn(),
    onMonthChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the current month and year", () => {
    render(<MonthNavigation {...defaultProps} />);

    expect(screen.getByText("January")).toBeInTheDocument();
  });

  describe("Navigation Buttons", () => {
    it("renders previous and next month buttons", () => {
      render(<MonthNavigation {...defaultProps} />);

      const previousButton = screen.getByRole("button", { name: "<" });
      const nextButton = screen.getByRole("button", { name: ">" });

      expect(previousButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it("navigates to previous month within the same year", () => {
      render(<MonthNavigation {...defaultProps} />);

      const previousButton = screen.getByRole("button", { name: "<" });
      fireEvent.click(previousButton);

      expect(defaultProps.onMonthChange).toHaveBeenCalledWith(11); // December of previous year
      expect(defaultProps.onYearChange).toHaveBeenCalledWith(2024);
    });

    it("navigates to next month within the same year", () => {
      const propsWithFebruary = { ...defaultProps, currentMonth: 1 }; // February
      render(<MonthNavigation {...propsWithFebruary} />);

      const nextButton = screen.getByRole("button", { name: ">" });
      fireEvent.click(nextButton);

      expect(propsWithFebruary.onMonthChange).toHaveBeenCalledWith(2); // March
      expect(propsWithFebruary.onYearChange).not.toHaveBeenCalled();
    });

    it("handles year change when moving from December to January", () => {
      const decemberProps = { ...defaultProps, currentMonth: 11 }; // December
      render(<MonthNavigation {...decemberProps} />);

      const nextButton = screen.getByRole("button", { name: ">" });
      fireEvent.click(nextButton);

      expect(decemberProps.onMonthChange).toHaveBeenCalledWith(0); // January
      expect(decemberProps.onYearChange).toHaveBeenCalledWith(2026);
    });

    it("handles year change when moving from January to December", () => {
      render(<MonthNavigation {...defaultProps} />);

      const previousButton = screen.getByRole("button", { name: "<" });
      fireEvent.click(previousButton);

      expect(defaultProps.onMonthChange).toHaveBeenCalledWith(11); // December
      expect(defaultProps.onYearChange).toHaveBeenCalledWith(2024);
    });
  });

  describe("Month Display", () => {
    it("displays month name in the correct format", () => {
      const testCases = [
        { month: 0, expectedText: "January" },
        { month: 5, expectedText: "June" },
        { month: 11, expectedText: "December" },
      ];

      testCases.forEach(({ month, expectedText }) => {
        const props = { ...defaultProps, currentMonth: month };
        const { unmount } = render(<MonthNavigation {...props} />);

        expect(screen.getByText(expectedText)).toBeInTheDocument();

        unmount();
      });
    });
  });
});
