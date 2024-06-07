import { CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { addMonths, isAfter } from "date-fns";
import { useState } from "react";
import moment from "moment/moment";
import { Calendar } from "./ui/calendar";

type MonthSelectorProps = {
  setSelectedMonth: (newMonth: Date) => void;
};

function MonthSelector({ setSelectedMonth }: MonthSelectorProps) {
  const today = new Date();
  const nextMonth = addMonths(today, 1);
  const [month, setMonth] = useState(nextMonth);

  const handleMonthChange = (value: Date) => {
    if (!isAfter(value, today)) {
      setSelectedMonth(value);
      setMonth(value);
    }
  };

  return (
    <>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex gap-2 items-center text-slate-700"
            >
              <CalendarDays className="h-5 w-5" />
              {moment(month).format("MMM YYYY")}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              month={month}
              onMonthChange={handleMonthChange}
              className="flex flex-1 justify-center"
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default MonthSelector;
