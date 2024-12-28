"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  onChange?: (date: Date) => void;
}

export function DatePicker({ onChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onChange?.(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full px-4 py-3 rounded-lg bg-[#111827] border border-gray-700 text-white",
            "hover:border-blue-500/50 transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "flex items-center justify-between",
            !date && "text-gray-400"
          )}
        >
          <span className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            {date ? format(date, "MMMM d, yyyy") : "Select event date"}
          </span>
          <span className="text-gray-400">▼</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="bg-[#1f2937] rounded-lg border border-gray-700 p-4 shadow-xl">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            className="custom-calendar"
            classNames={{
              months:
                "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium text-gray-100",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-gray-100",
                "hover:bg-blue-500/20 rounded-lg transition-colors duration-200"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell:
                "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: cn(
                "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-blue-500/10 rounded-lg",
                "[&:has([aria-selected].day-outside)]:bg-blue-500/10",
                "[&:has([aria-selected].day-range-end)]:rounded-r-lg"
              ),
              day: cn(
                "h-9 w-9 p-0 font-normal text-gray-100 aria-selected:opacity-100",
                "hover:bg-blue-500/20 rounded-lg transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1f2937]"
              ),
              day_range_end: "day-range-end",
              day_selected:
                "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white",
              day_today: "bg-gray-800/50 text-white",
              day_outside:
                "day-outside text-gray-500 opacity-50 aria-selected:bg-blue-500/50 aria-selected:text-gray-100 aria-selected:opacity-30",
              day_disabled: "text-gray-500 opacity-50",
              day_hidden: "invisible",
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
