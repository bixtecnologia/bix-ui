import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { formatDate } from "./utils";
import { Calendar } from "./Calendar";
import classNames from "classnames";
export const DatePicker = ({ value, onChange = () => undefined, disabled = false, error = false, isRange = false, placeholder, }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowCalendar(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (_jsxs("div", Object.assign({ className: "relative", ref: ref, onClick: () => !disabled && setShowCalendar(true) }, { children: [_jsx("input", { type: "text", value: isRange
                    ? Array.isArray(value)
                        ? `${formatDate(value[0])}${value[1] ? " - " + formatDate(value[1]) : ""}`
                        : ""
                    : value
                        ? formatDate(value)
                        : "", readOnly: true, disabled: disabled, placeholder: placeholder, className: classNames("border bg-white py-2 px-3 text-sm rounded-md w-full truncate pr-10 focus-within:ring-3 focus-within:ring-blue-500 focus-within:ring-offset-1.5", disabled ? " text-[#aaa]" : "text-zinc-900", error
                    ? "border-red-500"
                    : "border-zinc-300 hover:border-zinc-500 disabled:hover:border-zinc-300") }), _jsx("img", { src: "/calendar.svg", alt: "calendar", className: "w-4 h-4 absolute right-3 top-2.5", loading: "lazy" }), showCalendar && !disabled && (_jsx(Calendar, { value: value !== null && value !== void 0 ? value : null, onChange: onChange, onClose: () => setShowCalendar(false), isRange: isRange }))] })));
};
