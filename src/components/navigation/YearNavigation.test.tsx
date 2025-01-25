import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { YearNavigation } from "./YearNavigation";

describe("YearNavigation Component", () => {
  const defaultProps = {
    currentYear: 2024,
    onYearChange: vi.fn(),
  };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it("renders the current year", () => {
    render(<YearNavigation {...defaultProps} />);

    // Check if the year is rendered correctly
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  describe("Navigation Buttons", () => {
    it("renders previous and next year buttons", () => {
      render(<YearNavigation {...defaultProps} />);

      const previousButton = screen.getByRole("button", { name: "<" });
      const nextButton = screen.getByRole("button", { name: ">" });

      expect(previousButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it("navigates to previous year", () => {
      render(<YearNavigation {...defaultProps} />);

      const previousButton = screen.getByRole("button", { name: "<" });
      fireEvent.click(previousButton);

      expect(defaultProps.onYearChange).toHaveBeenCalledWith(2023);
    });

    it("navigates to next year", () => {
      render(<YearNavigation {...defaultProps} />);

      const nextButton = screen.getByRole("button", { name: ">" });
      fireEvent.click(nextButton);

      expect(defaultProps.onYearChange).toHaveBeenCalledWith(2025);
    });
  });

  describe("Year Display", () => {
    it("displays year in the correct format", () => {
      const testCases = [
        { year: 2000, expectedText: "2000" },
        { year: 2024, expectedText: "2024" },
        { year: 2050, expectedText: "2050" },
      ];

      testCases.forEach(({ year, expectedText }) => {
        const props = { ...defaultProps, currentYear: year };
        const { unmount } = render(<YearNavigation {...props} />);

        expect(screen.getByText(expectedText)).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe("Interaction Behavior", () => {
    it("calls onYearChange exactly once when a navigation button is clicked", () => {
      render(<YearNavigation {...defaultProps} />);

      const previousButton = screen.getByRole("button", { name: "<" });
      fireEvent.click(previousButton);

      expect(defaultProps.onYearChange).toHaveBeenCalledTimes(1);
    });
  });
});
