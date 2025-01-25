import { describe, it, expect } from "vitest";
import { DateUtils } from "./dateUtils";

describe("DateUtils", () => {
  describe("formatDate", () => {
    it("should format a valid date correctly", () => {
      const date = new Date(2025, 0, 25);
      expect(DateUtils.formatDate(date)).toBe("2025-01-25");
    });

    it("should pad single-digit months and days with leading zeros", () => {
      const date = new Date(2025, 0, 5);
      expect(DateUtils.formatDate(date)).toBe("2025-01-05");
    });

    it("should return empty string for null date", () => {
      expect(DateUtils.formatDate(null)).toBe("");
    });
  });

  describe("isWeekend", () => {
    it("should return true for Saturday", () => {
      // Saturday
      const saturday = new Date(2025, 0, 25);
      expect(DateUtils.isWeekend(saturday)).toBe(true);
    });

    it("should return true for Sunday", () => {
      // Sunday
      const sunday = new Date(2025, 0, 26);
      expect(DateUtils.isWeekend(sunday)).toBe(true);
    });

    it("should return false for weekdays", () => {
      const weekdays = [
        new Date(2025, 0, 27), // Monday
        new Date(2025, 0, 28), // Tuesday
        new Date(2025, 0, 29), // Wednesday
        new Date(2025, 0, 30), // Thursday
        new Date(2025, 0, 31), // Friday
      ];

      weekdays.forEach((weekday) => {
        expect(DateUtils.isWeekend(weekday)).toBe(false);
      });
    });
  });

  describe("findWeekendDates", () => {
    it("should find all weekend dates in a given range", () => {
      const start = new Date(2025, 0, 20); // Monday
      const end = new Date(2025, 0, 27); // Monday

      const weekendDates = DateUtils.findWeekendDates(start, end);

      expect(weekendDates.length).toBe(2);
      expect(DateUtils.formatDate(weekendDates[0])).toBe("2025-01-25"); // Saturday
      expect(DateUtils.formatDate(weekendDates[1])).toBe("2025-01-26"); // Sunday
    });

    it("should return an empty array if no weekend dates exist in range", () => {
      const start = new Date(2025, 0, 20); // Monday
      const end = new Date(2025, 0, 24); // Friday

      const weekendDates = DateUtils.findWeekendDates(start, end);

      expect(weekendDates.length).toBe(0);
    });
  });

  describe("adjustToWeekdays", () => {
    it("should move start date to next weekday if it falls on a weekend", () => {
      const start = new Date(2025, 0, 18); // Saturday
      const end = new Date(2025, 0, 24); // Friday

      const adjusted = DateUtils.adjustToWeekdays({ start, end });

      expect(DateUtils.formatDate(adjusted.start)).toBe("2025-01-20"); // Monday
      expect(DateUtils.formatDate(adjusted.end)).toBe("2025-01-24"); // Friday
    });

    it("should move end date to previous weekday if it falls on a weekend", () => {
      const start = new Date(2025, 0, 20); // Monday
      const end = new Date(2025, 0, 25); // Sunday

      const adjusted = DateUtils.adjustToWeekdays({ start, end });

      expect(DateUtils.formatDate(adjusted.start)).toBe("2025-01-20"); // Monday
      expect(DateUtils.formatDate(adjusted.end)).toBe("2025-01-24"); // Friday
    });

    it("should not modify dates that are already weekdays", () => {
      const start = new Date(2025, 0, 20); // Wednesday
      const end = new Date(2025, 0, 24); // Friday

      const adjusted = DateUtils.adjustToWeekdays({ start, end });

      expect(DateUtils.formatDate(adjusted.start)).toBe("2025-01-20"); // Wednesday
      expect(DateUtils.formatDate(adjusted.end)).toBe("2025-01-24"); // Friday
    });
  });
});
