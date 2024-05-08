import React, { useState, useEffect, forwardRef, ForwardedRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";

interface DateTimePickerWithTimezoneProps {
  id: string;
  targetTimezone: string;
  date: Date | null;
  setDate: (date: Date | null) => void;
  minDate?: Date | null | undefined;
}

const DateTimePickerWithTimezone: React.FC<DateTimePickerWithTimezoneProps> = ({
  id,
  targetTimezone,
  date,
  setDate,
  minDate,
}) => {
  const [localDate, setLocalDate] = useState<Date | null>(null);

  // Convert UTC or server date to local timezone date for the picker
  useEffect(() => {
    if (date) {
      const localZoneDate = toZonedTime(date, targetTimezone);
      setLocalDate(localZoneDate);
    }
  }, [date, targetTimezone]);

  const handleChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      // Convert date from picker's local timezone date to UTC or server timezone
      const utcDate = fromZonedTime(selectedDate, targetTimezone);
      setDate(utcDate);
    } else {
      setDate(null);
    }
  };

  // const CustomInput = () => {
  //   return (
  //     <div
  //       className={cn(
  //         "flex items-center !w-full justify-start text-left font-normal h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm cursor-pointer",
  //         !date && "text-muted-foreground"
  //       )}
  //     >
  //       <CalendarIcon className="mr-2 h-4 w-4" />
  //       {date ? format(date, "PPP") : <span>Pick a date</span>}
  //     </div>
  //   );
  // };

  const CustomInput = forwardRef<
    HTMLDivElement,
    { value?: Date | null; onClick?: () => void }
  >(({ value, onClick }, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      className={cn(
        "flex items-center w-[250px] justify-start text-left font-normal h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm cursor-pointer",
        !value && "text-muted-foreground"
      )}
      onClick={onClick}
      ref={ref}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {value ? (
        format(value, "PP") + " @ " + format(value, "p")
      ) : (
        <span>Pick a date</span>
      )}
    </div>
  ));

  return (
    <DatePicker
      id={id}
      customInput={<CustomInput value={localDate} onClick={() => {}} />}
      closeOnScroll
      selected={localDate}
      onChange={handleChange}
      showTimeSelect
      dateFormat="Pp"
      timeFormat="HH:mm"
      timeIntervals={15}
      minDate={minDate}
      // minTime={minDate}
    />
  );
};

export default DateTimePickerWithTimezone;
