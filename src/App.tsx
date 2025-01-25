import { useState } from "react";
import { WeekdayDateRangePicker } from "./containers/WeekdayDateRangePicker";
import { type DateRangeProp } from "./types/dateRangeTypes";
import { getPredefinedRanges } from "./utils/predefinedRanges";

export function App() {
  const [range, setRange] = useState<DateRangeProp>({
    start: new Date(),
    end: new Date(),
  });

  const [weekendDates, setWeekendDates] = useState<Date[]>([]);
  const handleDateChange = (range: DateRangeProp, weekendDates: Date[]) => {
    setRange(range);
    setWeekendDates(weekendDates);
  };

  return (
    <div className="bg-white h-full m-50 flex w-full">
      <WeekdayDateRangePicker
        predefinedRanges={getPredefinedRanges()}
        onDateRangeChange={handleDateChange}
      />

      <div className="flex flex-col">
        <h2 className="font-bold">Range:</h2>
        <p>
          Start Date: {range.start.toDateString()} <br />
          End Date: {range.end.toDateString()}
        </p>

        <h2 className="font-bold">Weekend Dates:</h2>
        <ul>
          {weekendDates.map((date) => (
            <li key={date.toDateString()}>{date.toDateString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
