import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
export default function ButtonBase({ onClick, href, label, theme, }) {
    let baseClass = "px-4 py-2 rounded text-white font-semibold";
    const buttonThemes = {
        primary: "bg-blue-500",
        secondary: "bg-gray-500",
    };
    if (href) {
        return (_jsx("a", Object.assign({ href: href, className: classNames(baseClass, buttonThemes[theme]) }, { children: label })));
    }
    return (_jsx("button", Object.assign({ onClick: onClick, className: classNames(baseClass, buttonThemes[theme]) }, { children: label })));
}
