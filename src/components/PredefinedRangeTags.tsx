import { PredefinedRangesProps } from "../types/dateRangeTypes";

export const PredefinedRangeTags = ({
  predefinedRanges,
  onRangeSelect,
}: Readonly<PredefinedRangesProps>) => (
  <div className="mt-4 flex space-x-2">
    {predefinedRanges.map((range) => (
      <button
        key={range.label}
        onClick={() => onRangeSelect(range.getRange())}
        className="px-3 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600"
      >
        {range.label}
      </button>
    ))}
  </div>
);
