import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter your password'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-3 border rounded-lg text-base focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 h-full -translate-y-1/2 text-gray-400 hover:text-gray-600"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        <span className="flex items-center justify-center">
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </button>
    </div>
  );
};

export default PasswordInput;
