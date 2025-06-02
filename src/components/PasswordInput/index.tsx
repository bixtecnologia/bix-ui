import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X, Dot } from 'lucide-react';
import cn from 'classnames';

// START: Inlined content from utils.ts (exports removed)
type PasswordStrength = "very-weak" | "weak" | "good" | "great";

function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  if(password.length >= 8) score++;
  if(/[a-z]/.test(password)) score++;
  if(/[A-Z]/.test(password)) score++;
  if(/\d/.test(password)) score++;
  if(/[\W_]/.test(password)) score++;

  if (score <= 1) return "very-weak";
  if (score === 2) return "weak";
  if (score === 3 || score === 4) return "good";
  return "great";
}

interface PasswordCriteria {
  minLength: boolean;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  specialChar: boolean;
}

function checkPasswordCriteria(password: string): PasswordCriteria {
  return {
    minLength: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[\W_]/.test(password),
  };
}
// END: Inlined content from utils.ts

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  showStrengthBar?: boolean;
  showCriteria?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter your password',
  name,
  disabled = false,
  required = false,
  className,
  inputClassName,
  showStrengthBar = true,
  showCriteria = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<PasswordStrength>('very-weak');
  const [criteria, setCriteria] = useState<PasswordCriteria>({
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

  const strengthColors: Record<PasswordStrength, string> = {
    'very-weak': 'bg-red-500',
    'weak': 'bg-yellow-400',
    'good': 'bg-green-300',
    'great': 'bg-green-500',
  };

  const strengthLevels: PasswordStrength[] = ["very-weak", "weak", "good", "great"];

  const criteriaLabelsLeft: { key: keyof PasswordCriteria; label: string }[] = [
    { key: 'lowercase', label: 'One lowercase character' },
    { key: 'uppercase', label: 'One uppercase character' },
    { key: 'number', label: 'One number' },
  ];

  const criteriaLabelsRight: { key: keyof PasswordCriteria; label: string }[] = [
    { key: 'specialChar', label: 'One special character' },
    { key: 'minLength', label: '8 characters minimum' },
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          required={required}
          className={cn("w-full h-10 px-3 border rounded-lg text-base focus:outline-none", inputClassName)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-0 right-3 h-full text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? "Hide password" : "Show password"}
          disabled={disabled}
        >
          <span className="flex items-center justify-center h-full">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </button>
      </div>
      {showStrengthBar && value !== '' && (
        <div className="flex pt-2 space-x-1">
          {strengthLevels.map((level, index) => {
            const currentIndex = strengthLevels.indexOf(strength);
            const isActive = index <= currentIndex;
            return (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full ${value === '' ? 'bg-gray-200' : (isActive ? strengthColors[strength] : 'bg-gray-200')}`}
              />
            );
          })}
        </div>
      )}
      {showStrengthBar && value !== '' && (
        <span className="text-xs text-gray-500">
          {strength.charAt(0).toUpperCase() + strength.slice(1).replace('-', ' ')}
        </span>
      )}
      {showCriteria && (
        <div className="mt-2 w-full flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4 text-xs text-gray-700">
          <ul className="space-y-1 flex-1">
            {criteriaLabelsLeft.map((item) => (
              <li key={item.key} className="flex items-center">
                {value === '' ? (
                  <Dot size={20} className="mr-1 text-gray-500" />
                ) : criteria[item.key] ? (
                  <Check size={14} className="mr-1 text-green-500" />
                ) : (
                  <X size={14} className="mr-1 text-red-500" />
                )}
                <span className="text-gray-500 whitespace-nowrap">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
          <ul className="space-y-1 flex-1">
            {criteriaLabelsRight.map((item) => (
              <li key={item.key} className="flex items-center">
                {value === '' ? (
                  <Dot size={20} className="mr-1 text-gray-500" />
                ) : criteria[item.key] ? (
                  <Check size={14} className="mr-1 text-green-500" />
                ) : (
                  <X size={14} className="mr-1 text-red-500" />
                )}
                <span className="text-gray-500">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
