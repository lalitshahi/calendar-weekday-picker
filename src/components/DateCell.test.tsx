import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DateCell } from "./DateCell";

describe("DateCell Component", () => {
  const mockDate = new Date(2025, 0, 25);
  const mockOnSelect = vi.fn();

  const defaultProps = {
    date: mockDate,
    isCurrentMonth: true,
    isSelected: false,
    isInRange: false,
    isWeekendDay: false,
    onSelect: mockOnSelect,
  };

  it("renders the correct date", () => {
    const { getByText } = render(<DateCell {...defaultProps} />);

    expect(getByText("25")).toBeInTheDocument();
  });

  describe("Text Color", () => {
    it("applies black text for current month", () => {
      const { getByText } = render(<DateCell {...defaultProps} />);

      const dateCell = getByText("25");
      expect(dateCell).toHaveClass("text-black");
    });

    it("applies gray text for non-current month", () => {
      const { getByText } = render(
        <DateCell {...defaultProps} isCurrentMonth={false} />
      );

      const dateCell = getByText("25");
      expect(dateCell).toHaveClass("text-gray-400");
    });
  });

  describe("Background Color", () => {
    it("applies default hover background", () => {
      const { getByText } = render(<DateCell {...defaultProps} />);

      const dateCell = getByText("25");
      expect(dateCell).toHaveClass("hover:bg-orange-100");
    });

    it("applies selected background and white text", () => {
      const { getByText } = render(
        <DateCell {...defaultProps} isSelected={true} />
      );

      const dateCell = getByText("25");
      expect(dateCell).toHaveClass("bg-orange-500 text-white");
    });

    it("applies in-range background", () => {
      const { getByText } = render(
        <DateCell {...defaultProps} isInRange={true} />
      );

      const dateCell = getByText("25");
      expect(dateCell).toHaveClass("bg-orange-200");
    });
  });

  describe("Weekend Handling", () => {
    it("disables button for weekend days", () => {
      const { getByText } = render(
        <DateCell {...defaultProps} isWeekendDay={true} />
      );

      const dateCell = getByText("25");
      expect(dateCell).toBeDisabled();
      expect(dateCell).toHaveClass("text-gray-300 bg-white cursor-not-allowed");
    });

    it("enables button for non-weekend days", () => {
      const { getByText } = render(<DateCell {...defaultProps} />);

      const dateCell = getByText("25");
      expect(dateCell).not.toBeDisabled();
    });
  });

  describe("Selection Behavior", () => {
    it("calls onSelect with the date when clicked", () => {
      const { getByText } = render(<DateCell {...defaultProps} />);

      const dateCell = getByText("25");
      fireEvent.click(dateCell);

      expect(mockOnSelect).toHaveBeenCalledWith(mockDate);
    });

    it("does not call onSelect for weekend days", () => {
      const { getByText } = render(
        <DateCell {...defaultProps} isWeekendDay={true} />
      );

      const dateCell = getByText("25");
      expect(dateCell).toBeDisabled();
    });
  });

  describe("Combination Scenarios", () => {
    it("handles multiple styling conditions", () => {
      const { getByText } = render(
        <DateCell
          {...defaultProps}
          isCurrentMonth={false}
          isInRange={true}
          isSelected={false}
        />
      );

      const dateCell = getByText("25");
      expect(dateCell).toHaveClass("text-gray-400 bg-orange-200");
    });
  });
});
