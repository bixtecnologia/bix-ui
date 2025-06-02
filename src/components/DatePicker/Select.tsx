import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ChevronDown, ChevronUp } from "lucide-react";

type Option = { label: string; value: number };

const PAGE_SIZE = 12;

export const Select = ({
  options,
  onSelect,
  selectedOption,
}: {
  onSelect: (_: number) => void;
  options: Option[];
  selectedOption: Option;
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const optionsContainerRef = useRef<HTMLDivElement>(null);

  const canScrollUp = startIndex > 0;
  const canScrollDown = startIndex + PAGE_SIZE < options.length;

  const visibleOptions = options.slice(startIndex, startIndex + PAGE_SIZE);

  const handleScrollUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canScrollUp) {
      setStartIndex((prev) => Math.max(0, prev - PAGE_SIZE));
    }
  };

  const handleScrollDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canScrollDown) {
      setStartIndex((prev) =>
        Math.min(options.length - PAGE_SIZE, prev + PAGE_SIZE)
      );
    }
  };

  const handleSelect = (value: number) => {
    onSelect(value);
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsContainerRef.current &&
        !optionsContainerRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showOptions) {
      const selectedIndex = options.findIndex(
        (opt) => opt.value === selectedOption.value
      );
      if (selectedIndex !== -1) {
        const newStartIndex = Math.floor(selectedIndex / PAGE_SIZE) * PAGE_SIZE;
        setStartIndex(newStartIndex);
      }
    }
  }, [showOptions, options, selectedOption]);

  return (
    <div
      className="flex gap-1 items-center border border-zinc-100 relative px-2 py-1 rounded-md"
      onClick={() => setShowOptions((prev) => !prev)}
    >
      <span className="text-sm font-medium">{selectedOption.label}</span>

      <ChevronDown className="h-4 w-4 text-gray-400" />
      {showOptions && (
        <div
          ref={optionsContainerRef}
          className="absolute top-full left-1/2 transform -translate-x-1/2 flex min-w-20 flex-col bg-white border border-zinc-200 shadow-lg rounded-md max-h-[60dvh] overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {canScrollUp && (
            <button
              onClick={handleScrollUp}
              className="py-1.5 hover:bg-zinc-100 flex justify-center cursor-pointer"
            >
              <ChevronUp className="h-3 w-3 text-gray-500" />
            </button>
          )}

          <div className="max-h-[60dvh] overflow-y-auto">
            {visibleOptions.map(({ label, value }) => (
              <span
                key={value}
                className={classNames(
                  "block px-3 py-1 hover:bg-zinc-100 cursor-pointer text-sm",
                  value === selectedOption.value ? "font-medium" : "font-normal"
                )}
                onClick={() => handleSelect(value)}
              >
                {label}
              </span>
            ))}
          </div>

          {canScrollDown && (
            <button
              onClick={handleScrollDown}
              className="py-1.5 hover:bg-zinc-100 flex justify-center cursor-pointer"
            >
              <ChevronDown className="h-3 w-3 text-gray-500" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
