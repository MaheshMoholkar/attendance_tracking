import { CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { addMonths } from "date-fns";
import { useState } from "react";
import moment from "moment/moment";
import { Calendar } from "./ui/calendar";

type MonthSelectorProps = {
  selectedMonth: (newMonth: Date) => void;
};

function MonthSelector({ selectedMonth }: MonthSelectorProps) {
  const today = new Date();
  const nextMonth = addMonths(today, 0);
  const [month, setMonth] = useState(nextMonth);
  return (
    <>
      <div>
        <Popover>
          <PopoverTrigger>
            <Button
              variant="outline"
              className="flex gap-2 items-center text-slate-500"
            >
              <CalendarDays h-5 w-5 />
              {moment(month).format("MMM YYYY")}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              month={month}
              onMonthChange={(value) => {
                selectedMonth(value);
                setMonth(value);
              }}
              className="flex flex-1 justify-center"
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default MonthSelector;
