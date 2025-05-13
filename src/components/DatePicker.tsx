import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

interface DatePickerProps {
  name: string;
  id: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

export function DatePicker({ name, id, value, onChange }: DatePickerProps) {
  const [internalDate, setInternalDate] = useState(value);

  useEffect(() => {
    setInternalDate(value);
  }, [value]);

  const handleDateChange = (date: Date | undefined) => {
    setInternalDate(date);
    onChange(date);
  };

  return (
    <div className="flex flex-row items-center mb-2 mt-2 gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {name}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            {value ? format(value, "PPP") : name}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={internalDate}
            onSelect={handleDateChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
