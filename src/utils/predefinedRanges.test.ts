import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getPredefinedRanges } from "./predefinedRanges";

// Helper function to format date for easier comparison
const formatDate = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

describe("getPredefinedRanges", () => {
  // Mock Date to have a consistent reference point
  const mockNow = new Date("2025-01-25");

  // Temporarily replace Date constructor to have a consistent test environment
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(mockNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should have 5 predefined ranges", () => {
    const ranges = getPredefinedRanges();
    expect(ranges.length).toBe(5);
  });

  describe("Last 7 days range", () => {
    it("should calculate correct start and end dates", () => {
      const ranges = getPredefinedRanges();
      const lastSevenDays = ranges.find((r) => r.label === "Last 7 days");

      expect(lastSevenDays).toBeTruthy();

      const range = lastSevenDays!.getRange();

      expect(formatDate(range.start)).toBe("2025-01-18");
      expect(formatDate(range.end)).toBe("2025-01-25");
    });
  });

  describe("Last 30 days range", () => {
    it("should calculate correct start and end dates", () => {
      const ranges = getPredefinedRanges();
      const lastThirtyDays = ranges.find((r) => r.label === "Last 30 days");

      expect(lastThirtyDays).toBeTruthy();

      const range = lastThirtyDays!.getRange();

      expect(formatDate(range.start)).toBe("2024-12-26");
      expect(formatDate(range.end)).toBe("2025-01-25");
    });
  });

  describe("Next 7 days range", () => {
    it("should calculate correct start and end dates", () => {
      const ranges = getPredefinedRanges();
      const nextSevenDays = ranges.find((r) => r.label === "Next 7 days");

      expect(nextSevenDays).toBeTruthy();

      const range = nextSevenDays!.getRange();

      expect(formatDate(range.start)).toBe("2025-01-25");
      expect(formatDate(range.end)).toBe("2025-02-01");
    });
  });

  describe("Next 30 days range", () => {
    it("should calculate correct start and end dates", () => {
      const ranges = getPredefinedRanges();
      const nextThirtyDays = ranges.find((r) => r.label === "Next 30 days");

      expect(nextThirtyDays).toBeTruthy();

      const range = nextThirtyDays!.getRange();

      expect(formatDate(range.start)).toBe("2025-01-25");
      expect(formatDate(range.end)).toBe("2025-02-24");
    });
  });

  describe("This Quarter range", () => {
    it("should calculate correct start and end dates", () => {
      const ranges = getPredefinedRanges();
      const thisQuarter = ranges.find((r) => r.label === "This Quarter");

      expect(thisQuarter).toBeTruthy();

      const range = thisQuarter!.getRange();

      expect(formatDate(range.start)).toBe("2025-01-01");
      expect(formatDate(range.end)).toBe("2025-03-31");
    });

    it("should handle quarter changes correctly", () => {
      vi.useFakeTimers().setSystemTime(new Date("2025-03-31"));

      const ranges = getPredefinedRanges();
      const thisQuarter = ranges.find((r) => r.label === "This Quarter");

      const range = thisQuarter!.getRange();

      expect(formatDate(range.start)).toBe("2025-01-01");
      expect(formatDate(range.end)).toBe("2025-03-31");
    });
  });

  describe("Range labels", () => {
    it("should have correct labels", () => {
      const ranges = getPredefinedRanges();
      const labels = ranges.map((r) => r.label);

      expect(labels).toEqual([
        "Last 7 days",
        "Last 30 days",
        "Next 7 days",
        "Next 30 days",
        "This Quarter",
      ]);
    });
  });
});
