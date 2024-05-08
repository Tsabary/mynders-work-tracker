import React, { forwardRef, ForwardedRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";

interface DateTimePickerProps {
  id: string;
  date: Date | null;
  setDate: (date: Date | null) => void;
  showTime?: boolean;
  minDate?: Date | null | undefined;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  id,
  date,
  setDate,
  showTime = false,
  minDate,
}) => {
  const CustomInput = forwardRef<
    HTMLDivElement,
    { value?: Date | null; onClick?: () => void }
  >(({ value, onClick }, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      className={cn(
        "flex items-center w-full justify-start text-left font-normal h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm cursor-pointer",
        !value && "text-muted-foreground"
      )}
      onClick={onClick}
      ref={ref}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {value ? format(value, "PP") : <span>Pick a date</span>}
    </div>
  ));

  return (
    <DatePicker
      id={id}
      customInput={<CustomInput value={date} onClick={() => {}} />}
      closeOnScroll
      selected={date}
      onChange={setDate}
      showTimeSelect={showTime}
      dateFormat="Pp"
      timeFormat="HH:mm"
      timeIntervals={15}
      minDate={minDate}
    />
  );
};

export default DateTimePicker;
