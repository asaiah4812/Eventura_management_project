"use client";

import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import * as Popover from "@radix-ui/react-popover";

interface DateInputProps {
  label: string;
  selected?: Date;
  onChange: (date: Date | undefined) => void;
  required?: boolean;
}

export default function DateInput({
  label,
  selected,
  onChange,
  required,
}: DateInputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-300">{label}</label>

      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={`
              w-full
              px-4
              py-2
              bg-gray-900
              border
              border-gray-700
              rounded-md
              text-left
              text-white
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              disabled:opacity-50
              disabled:cursor-not-allowed
              flex
              items-center
              justify-between
            `}
          >
            <span>{selected ? format(selected, "PPP") : "Pick a date"}</span>
            <CalendarIcon className="w-4 h-4 text-gray-400" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="bg-gray-900 p-4 rounded-md shadow-lg border border-gray-700"
            align="start"
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={onChange}
              className="text-white"
              classNames={{
                months:
                  "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button:
                  "h-7 w-7 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                  "text-gray-400 rounded-md w-8 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-700 rounded-md",
                day_selected: "bg-blue-700 text-white hover:bg-blue-800",
                day_today: "bg-gray-800 text-white",
                day_outside: "text-gray-500 opacity-50",
                day_disabled: "text-gray-500",
                day_range_middle: "aria-selected:bg-gray-800",
                day_hidden: "invisible",
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {required && !selected && (
        <p className="mt-1 text-sm text-red-500">Please select a date</p>
      )}
    </div>
  );
}
