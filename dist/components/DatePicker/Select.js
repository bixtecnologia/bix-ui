import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
const PAGE_SIZE = 12;
export const Select = ({ options, onSelect, selectedOption, }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const optionsContainerRef = useRef(null);
    const canScrollUp = startIndex > 0;
    const canScrollDown = startIndex + PAGE_SIZE < options.length;
    const visibleOptions = options.slice(startIndex, startIndex + PAGE_SIZE);
    const handleScrollUp = (e) => {
        e.stopPropagation();
        if (canScrollUp) {
            setStartIndex((prev) => Math.max(0, prev - PAGE_SIZE));
        }
    };
    const handleScrollDown = (e) => {
        e.stopPropagation();
        if (canScrollDown) {
            setStartIndex((prev) => Math.min(options.length - PAGE_SIZE, prev + PAGE_SIZE));
        }
    };
    const handleSelect = (value) => {
        onSelect(value);
        setShowOptions(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsContainerRef.current &&
                !optionsContainerRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        if (showOptions) {
            const selectedIndex = options.findIndex((opt) => opt.value === selectedOption.value);
            if (selectedIndex !== -1) {
                const newStartIndex = Math.floor(selectedIndex / PAGE_SIZE) * PAGE_SIZE;
                setStartIndex(newStartIndex);
            }
        }
    }, [showOptions, options, selectedOption]);
    return (_jsxs("div", Object.assign({ className: "flex gap-1 items-center border border-zinc-100 relative px-2 py-1 rounded-md", onClick: () => setShowOptions((prev) => !prev) }, { children: [_jsx("span", Object.assign({ className: "text-sm font-medium" }, { children: selectedOption.label })), _jsx("img", { src: "/chevron-down.svg", alt: "chevron down", className: "h-1.5 w-3", loading: "lazy" }), showOptions && (_jsxs("div", Object.assign({ ref: optionsContainerRef, className: "absolute top-[calc(100%+0.5rem)] left-1/2 transform -translate-x-1/2 flex min-w-20 flex-col bg-white border border-zinc-200 shadow-lg rounded-md max-h-[60dvh] overflow-hidden z-10", onClick: (e) => e.stopPropagation() }, { children: [canScrollUp && (_jsx("button", Object.assign({ onClick: handleScrollUp, className: "py-1.5 hover:bg-zinc-100 flex justify-center cursor-pointer" }, { children: _jsx("img", { src: "/chevron-down.svg", alt: "chevron down", className: "h-1.5 w-3 rotate-180", loading: "lazy" }) }))), _jsx("div", Object.assign({ className: "max-h-[60dvh] overflow-y-auto" }, { children: visibleOptions.map(({ label, value }) => (_jsx("span", Object.assign({ className: classNames("block px-3 py-1 hover:bg-zinc-100 cursor-pointer text-sm", value === selectedOption.value ? "font-medium" : "font-normal"), onClick: () => handleSelect(value) }, { children: label }), value))) })), canScrollDown && (_jsx("button", Object.assign({ onClick: handleScrollDown, className: "py-1.5 hover:bg-zinc-100 flex justify-center cursor-pointer" }, { children: _jsx("img", { src: "/chevron-down.svg", alt: "chevron down", className: "h-1.5 w-3", loading: "lazy" }) })))] })))] })));
};
