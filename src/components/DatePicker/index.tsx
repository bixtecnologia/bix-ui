import { useState, useRef, useEffect } from "react";
import { formatDate } from "./utils";
import { Calendar } from "./Calendar";
import classNames from "classnames";
import type { DatePickerProps } from "./types";
import { Calendar1 } from "lucide-react";

export const DatePicker = ({
  value,
  onChange = () => undefined,
  disabled = false,
  error = false,
  isRange = false,
  placeholder,
}: DatePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative"
      ref={ref}
      onClick={() => !disabled && setShowCalendar(true)}
    >
      <input
        type="text"
        value={
          isRange
            ? Array.isArray(value)
              ? `${formatDate(value[0])}${
                  value[1] ? " - " + formatDate(value[1]) : ""
                }`
              : ""
            : value
            ? formatDate(value as Date)
            : ""
        }
        readOnly
        disabled={disabled}
        placeholder={placeholder}
        className={classNames(
          "border bg-white py-2 px-3 text-sm rounded-md w-full truncate pr-10 focus-within:ring-3 focus-within:ring-blue-500 focus-within:ring-offset-1.5",
          disabled ? " text-[#aaa]" : "text-zinc-900",
          error
            ? "border-red-500"
            : "border-zinc-300 hover:border-zinc-500 disabled:hover:border-zinc-300"
        )}
      />
      <Calendar1 className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" />
      {showCalendar && !disabled && (
        <Calendar
          value={value ?? null}
          onChange={onChange}
          onClose={() => setShowCalendar(false)}
          isRange={isRange}
        />
      )}
    </div>
  );
};
