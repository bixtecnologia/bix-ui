import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import { getDatesToShowInCalendar, getMonthNames, getMonthRange, getWeekdayNames, getYearOptions, } from "./utils";
import { Select } from "./Select";
import { useState } from "react";
const monthNames = getMonthNames();
const yearOptions = getYearOptions();
export const Calendar = ({ value, onChange, isRange = false, onClose, }) => {
    var _a;
    const [displayDate, setDisplayDate] = useState(value ? (Array.isArray(value) ? (_a = value[0]) !== null && _a !== void 0 ? _a : new Date() : value) : new Date());
    const displayRange = getDatesToShowInCalendar(displayDate.getMonth(), displayDate.getFullYear());
    const { start: monthStart, end: monthEnd } = getMonthRange(displayDate.getMonth(), displayDate.getFullYear());
    const handleDateClick = (date) => {
        if (isRange) {
            const [startDate, endDate] = Array.isArray(value) ? value : [null, null];
            if (!startDate || (startDate && endDate))
                onChange([date, null]);
            else {
                if (date >= startDate)
                    onChange([startDate, date]);
                else
                    onChange([date, startDate]);
                onClose();
            }
        }
        else {
            onChange(date);
            onClose();
        }
    };
    const goToPreviousMonth = () => {
        setDisplayDate((prevDisplayDate) => new Date(prevDisplayDate.getFullYear(), prevDisplayDate.getMonth() - 1, prevDisplayDate.getDate()));
    };
    const goToNextMonth = () => {
        setDisplayDate((prevDisplayDate) => new Date(prevDisplayDate.getFullYear(), prevDisplayDate.getMonth() + 1, prevDisplayDate.getDate()));
    };
    const weekdayLabels = getWeekdayNames();
    return (_jsxs("div", Object.assign({ className: "z-20 border border-zinc-200 shadow-lg p-2.5 bg-white absolute top-[calc(100%+0.5rem)] flex flex-col gap-2 left-1/2 -translate-x-1/2 rounded-lg" }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("img", { loading: "lazy", src: "/chevron-down.svg", alt: "previous", className: "rotate-90 border border-zinc-100 p-2 cursor-pointer rounded", onClick: goToPreviousMonth }), _jsx(Select, { options: monthNames.map((monthName, index) => ({
                            label: monthName,
                            value: index,
                        })), selectedOption: {
                            label: monthNames[displayDate.getMonth()],
                            value: displayDate.getMonth(),
                        }, onSelect: (index) => {
                            setDisplayDate(new Date(displayDate.getFullYear(), index, 1));
                        } }), _jsx(Select, { options: yearOptions, selectedOption: {
                            label: displayDate.getFullYear().toString(),
                            value: displayDate.getFullYear(),
                        }, onSelect: (year) => {
                            setDisplayDate(new Date(year, displayDate.getMonth(), 1));
                        } }), _jsx("img", { loading: "lazy", src: "/chevron-down.svg", alt: "previous", className: "rotate-270 border border-zinc-100 p-2 cursor-pointer rounded", onClick: goToNextMonth })] })), _jsxs("div", Object.assign({ className: "bg-danger grid grid-cols-7 gap-0" }, { children: [weekdayLabels.map((d) => (_jsx("span", Object.assign({ className: "text-sm/4.5 text-center text-[#71717B]" }, { children: d }), d))), displayRange.map((day) => {
                        const [startDate, endDate] = Array.isArray(value)
                            ? value
                            : [value, null];
                        const isInMonthRange = day >= monthStart && day <= monthEnd;
                        const selected = isRange
                            ? (startDate && day.toDateString() === startDate.toDateString()) ||
                                (endDate && day.toDateString() === endDate.toDateString())
                            : startDate && day.toDateString() === startDate.toDateString();
                        const inRange = isRange &&
                            startDate &&
                            endDate &&
                            day >= startDate &&
                            day <= endDate;
                        const isRangeStart = isRange &&
                            startDate &&
                            day.toDateString() === startDate.toDateString();
                        const isRangeEnd = isRange && endDate && day.toDateString() === endDate.toDateString();
                        return (_jsx("div", Object.assign({ onClick: () => handleDateClick(day), className: classNames("text-sm/5.5 text-center p-1 cursor-pointer h-8 w-8 mt-2", selected
                                ? "text-white"
                                : isInMonthRange
                                    ? "text-zinc-900"
                                    : "text-zinc-400", selected ? "bg-zinc-900" : inRange ? "bg-zinc-100" : "bg-white", isRangeStart ? "rounded-l-md" : "", isRangeEnd ? "rounded-r-md" : "", selected && !isRange ? "rounded-md" : "") }, { children: day.getDate() }), day.toDateString()));
                    })] }))] })));
};
