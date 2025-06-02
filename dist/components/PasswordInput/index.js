import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X, Dot } from 'lucide-react';
import { getPasswordStrength, checkPasswordCriteria } from './utils';
export const PasswordInput = ({ value, onChange, placeholder = 'Enter your password' }) => {
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
        'good': 'bg-green-400',
        'great': 'bg-green-600',
    };
    const strengthLevels = ["very-weak", "weak", "good", "great"];
    const criteriaLabels = [
        { key: 'lowercase', label: 'One lowercase character' },
        { key: 'specialChar', label: 'One special character' },
        { key: 'uppercase', label: 'One uppercase character' },
        { key: 'minLength', label: '8 characters minimum' },
        { key: 'number', label: 'One number' },
    ];
    return (_jsxs("div", Object.assign({ className: "relative w-full" }, { children: [_jsxs("div", Object.assign({ className: "relative" }, { children: [_jsx("input", { type: showPassword ? "text" : "password", value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, className: "w-full h-10 px-3 border rounded-lg text-base focus:outline-none" }), _jsx("button", Object.assign({ type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute top-0 right-3 h-full text-gray-400 hover:text-gray-600", "aria-label": showPassword ? "Hide password" : "Show password" }, { children: _jsx("span", Object.assign({ className: "flex items-center justify-center h-full" }, { children: showPassword ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })) }))] })), _jsx("div", Object.assign({ className: "flex pt-2 space-x-1" }, { children: strengthLevels.map((level, index) => {
                    const currentIndex = strengthLevels.indexOf(strength);
                    const isActive = index <= currentIndex;
                    return (_jsx("div", { className: `h-1 flex-1 rounded-full ${value === '' ? 'bg-gray-200' : (isActive ? strengthColors[strength] : 'bg-gray-200')}` }, level));
                }) })), value !== '' && (_jsx("span", Object.assign({ className: "text-xs text-gray-500" }, { children: strength.charAt(0).toUpperCase() + strength.slice(1).replace('-', ' ') }))), _jsx("ul", Object.assign({ className: "mt-2 text-xs text-gray-700 space-y-1" }, { children: criteriaLabels.map((item) => (_jsxs("li", Object.assign({ className: "flex items-center" }, { children: [value === '' ? (_jsx(Dot, { size: 14, className: "mr-2 text-gray-500" })) : criteria[item.key] ? (_jsx(Check, { size: 14, className: "mr-2 text-green-500" })) : (_jsx(X, { size: 14, className: "mr-2 text-red-500" })), item.label] }), item.key))) }))] })));
};
export default PasswordInput;
