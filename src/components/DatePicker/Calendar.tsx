import classNames from "classnames";
import {
  getDatesToShowInCalendar,
  getMonthNames,
  getMonthRange,
  getWeekdayNames,
  getYearOptions,
} from "./utils";
import { Select } from "./Select";
import type { CalendarProps } from "./types";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const monthNames = getMonthNames();
const yearOptions = getYearOptions();

export const Calendar = ({
  value,
  onChange,
  isRange = false,
  onClose,
}: CalendarProps) => {
  const [displayDate, setDisplayDate] = useState<Date>(
    value ? (Array.isArray(value) ? value[0] ?? new Date() : value) : new Date()
  );

  const displayRange = getDatesToShowInCalendar(
    displayDate.getMonth(),
    displayDate.getFullYear()
  );

  const { start: monthStart, end: monthEnd } = getMonthRange(
    displayDate.getMonth(),
    displayDate.getFullYear()
  );

  const handleDateClick = (date: Date) => {
    if (isRange) {
      const [startDate, endDate] = Array.isArray(value) ? value : [null, null];

      if (!startDate || (startDate && endDate)) onChange([date, null]);
      else {
        if (date >= startDate) onChange([startDate, date]);
        else onChange([date, startDate]);

        onClose();
      }
    } else {
      onChange(date);
      onClose();
    }
  };

  const goToPreviousMonth = () => {
    setDisplayDate(
      (prevDisplayDate) =>
        new Date(
          prevDisplayDate.getFullYear(),
          prevDisplayDate.getMonth() - 1,
          prevDisplayDate.getDate()
        )
    );
  };

  const goToNextMonth = () => {
    setDisplayDate(
      (prevDisplayDate) =>
        new Date(
          prevDisplayDate.getFullYear(),
          prevDisplayDate.getMonth() + 1,
          prevDisplayDate.getDate()
        )
    );
  };

  const weekdayLabels = getWeekdayNames();

  return (
    <div className="z-20 border border-zinc-200 shadow-lg p-2.5 bg-white absolute top-[calc(100%+0.5rem)] flex flex-col gap-2 left-1/2 -translate-x-1/2 rounded-lg w-[274px] max-w-[100dvw]">
      <div className="flex justify-between items-center gap-0.5">
        <div
          className="border border-zinc-100 px-2 py-1.5 cursor-pointer rounded"
          onClick={goToPreviousMonth}
        >
          <ChevronLeft className="text-gray-500 h-4 w-4" />
        </div>
        <Select
          options={monthNames.map((monthName, index) => ({
            label: monthName,
            value: index,
          }))}
          selectedOption={{
            label: monthNames[displayDate.getMonth()],
            value: displayDate.getMonth(),
          }}
          onSelect={(index) => {
            setDisplayDate(new Date(displayDate.getFullYear(), index, 1));
          }}
        />
        <Select
          options={yearOptions}
          selectedOption={{
            label: displayDate.getFullYear().toString(),
            value: displayDate.getFullYear(),
          }}
          onSelect={(year) => {
            setDisplayDate(new Date(year, displayDate.getMonth(), 1));
          }}
        />
        <div
          className="border border-zinc-100 px-2 py-1.5 cursor-pointer rounded"
          onClick={goToNextMonth}
        >
          <ChevronRight className="text-gray-500 h-4 w-4" />
        </div>
      </div>
      <div className="bg-danger grid grid-cols-7 gap-0 min-w-[274px]">
        {weekdayLabels.map((d) => (
          <span key={d} className="text-sm/4.5 text-center text-[#71717B]">
            {d}
          </span>
        ))}
        {displayRange.map((day) => {
          const [startDate, endDate] = Array.isArray(value)
            ? value
            : [value, null];

          const isInMonthRange = day >= monthStart && day <= monthEnd;
          const selected = isRange
            ? (startDate && day.toDateString() === startDate.toDateString()) ||
              (endDate && day.toDateString() === endDate.toDateString())
            : startDate && day.toDateString() === startDate.toDateString();

          const inRange =
            isRange &&
            startDate &&
            endDate &&
            day >= startDate &&
            day <= endDate;

          const isRangeStart =
            isRange &&
            startDate &&
            day.toDateString() === startDate.toDateString();

          const isRangeEnd =
            isRange && endDate && day.toDateString() === endDate.toDateString();

          return (
            <div
              key={day.toDateString()}
              onClick={() => handleDateClick(day)}
              className={classNames(
                "text-sm/5.5 text-center p-1 cursor-pointer h-8 w-8 mt-2",
                selected
                  ? "text-white"
                  : isInMonthRange
                  ? "text-zinc-900"
                  : "text-zinc-400",
                selected ? "bg-zinc-900" : inRange ? "bg-zinc-100" : "bg-white",
                isRangeStart ? "rounded-l-md" : "",
                isRangeEnd ? "rounded-r-md" : "",
                selected && !isRange ? "rounded-md" : ""
              )}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};
