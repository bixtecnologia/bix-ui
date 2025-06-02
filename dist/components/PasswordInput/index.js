import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X, Dot } from 'lucide-react';
import cn from 'classnames';
function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8)
        score++;
    if (/[a-z]/.test(password))
        score++;
    if (/[A-Z]/.test(password))
        score++;
    if (/\d/.test(password))
        score++;
    if (/[\W_]/.test(password))
        score++;
    if (score <= 1)
        return "very-weak";
    if (score === 2)
        return "weak";
    if (score === 3 || score === 4)
        return "good";
    return "great";
}
function checkPasswordCriteria(password) {
    return {
        minLength: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[\W_]/.test(password),
    };
}
export const PasswordInput = ({ value, onChange, placeholder = 'Enter your password', name, disabled = false, required = false, className, inputClassName, showStrengthBar = true, showCriteria = true, }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState('very-weak');
    const [criteria, setCriteria] = useState({
        minLength: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });
    useEffect(() => {
        setStrength(getPasswordStrength(value));
        setCriteria(checkPasswordCriteria(value));
    }, [value]);
    const strengthColors = {
        'very-weak': 'bg-red-500',
        'weak': 'bg-yellow-400',
        'good': 'bg-green-300',
        'great': 'bg-green-500',
    };
    const strengthLevels = ["very-weak", "weak", "good", "great"];
    const criteriaLabelsLeft = [
        { key: 'lowercase', label: 'One lowercase character' },
        { key: 'uppercase', label: 'One uppercase character' },
        { key: 'number', label: 'One number' },
    ];
    const criteriaLabelsRight = [
        { key: 'specialChar', label: 'One special character' },
        { key: 'minLength', label: '8 characters minimum' },
    ];
    return (_jsxs("div", Object.assign({ className: cn("w-full", className) }, { children: [_jsxs("div", Object.assign({ className: "relative" }, { children: [_jsx("input", { type: showPassword ? "text" : "password", value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, name: name, disabled: disabled, required: required, className: cn("w-full h-10 px-3 border rounded-lg text-base focus:outline-none", inputClassName) }), _jsx("button", Object.assign({ type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute top-0 right-3 h-full text-gray-400 hover:text-gray-600", "aria-label": showPassword ? "Hide password" : "Show password", disabled: disabled }, { children: _jsx("span", Object.assign({ className: "flex items-center justify-center h-full" }, { children: showPassword ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })) }))] })), showStrengthBar && value !== '' && (_jsx("div", Object.assign({ className: "flex pt-2 space-x-1" }, { children: strengthLevels.map((level, index) => {
                    const currentIndex = strengthLevels.indexOf(strength);
                    const isActive = index <= currentIndex;
                    return (_jsx("div", { className: `h-1 flex-1 rounded-full ${value === '' ? 'bg-gray-200' : (isActive ? strengthColors[strength] : 'bg-gray-200')}` }, level));
                }) }))), showStrengthBar && value !== '' && (_jsx("span", Object.assign({ className: "text-xs text-gray-500" }, { children: strength.charAt(0).toUpperCase() + strength.slice(1).replace('-', ' ') }))), showCriteria && (_jsxs("div", Object.assign({ className: "mt-2 w-full flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4 text-xs text-gray-700" }, { children: [_jsx("ul", Object.assign({ className: "space-y-1 flex-1" }, { children: criteriaLabelsLeft.map((item) => (_jsxs("li", Object.assign({ className: "flex items-center" }, { children: [value === '' ? (_jsx(Dot, { size: 20, className: "mr-1 text-gray-500" })) : criteria[item.key] ? (_jsx(Check, { size: 14, className: "mr-1 text-green-500" })) : (_jsx(X, { size: 14, className: "mr-1 text-red-500" })), _jsx("span", Object.assign({ className: "text-gray-500 whitespace-nowrap" }, { children: item.label }))] }), item.key))) })), _jsx("ul", Object.assign({ className: "space-y-1 flex-1" }, { children: criteriaLabelsRight.map((item) => (_jsxs("li", Object.assign({ className: "flex items-center" }, { children: [value === '' ? (_jsx(Dot, { size: 20, className: "mr-1 text-gray-500" })) : criteria[item.key] ? (_jsx(Check, { size: 14, className: "mr-1 text-green-500" })) : (_jsx(X, { size: 14, className: "mr-1 text-red-500" })), _jsx("span", Object.assign({ className: "text-gray-500" }, { children: item.label }))] }), item.key))) }))] })))] })));
};
export default PasswordInput;
