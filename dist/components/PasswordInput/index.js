import { jsx as _jsx } from "react/jsx-runtime";
export const PasswordInput = ({ value, onChange, placeholder = 'Enter password' }) => {
    return (_jsx("input", { type: "password", value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" }));
};
export default PasswordInput;
