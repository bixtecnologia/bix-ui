import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export const PasswordInput = ({
  value,
  onChange,
  placeholder = "Enter your password",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return _jsxs(
    "div",
    Object.assign(
      { className: "relative w-full" },
      {
        children: [
          _jsx("input", {
            type: showPassword ? "text" : "password",
            value: value,
            onChange: (e) => onChange(e.target.value),
            placeholder: placeholder,
            className:
              "w-full h-10 px-3 border rounded-lg text-base focus:outline-none",
          }),
          _jsx(
            "button",
            Object.assign(
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className:
                  "absolute right-3 h-full -translate-y-1/2 text-gray-400 hover:text-gray-600",
                "aria-label": showPassword ? "Hide password" : "Show password",
              },
              {
                children: _jsx(
                  "span",
                  Object.assign(
                    { className: "flex items-center justify-center" },
                    {
                      children: showPassword
                        ? _jsx(EyeOff, { size: 18 })
                        : _jsx(Eye, { size: 18 }),
                    }
                  )
                ),
              }
            )
          ),
        ],
      }
    )
  );
};
export default PasswordInput;
