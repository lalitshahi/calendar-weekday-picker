export const DayHeaders = () => (
  <>
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
      <div key={day} className="text-center font-bold text-sm">
        {day}
      </div>
    ))}
  </>
);
