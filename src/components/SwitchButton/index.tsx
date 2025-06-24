import React, { useState } from 'react';
import cn from 'classnames';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

interface SwitchButtonProps {
  // Controlled mode
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  
  // Uncontrolled mode
  defaultChecked?: boolean;
  
  // Appearance
  size?: SwitchSize;
  color?: SwitchColor;
  
  // States
  disabled?: boolean;
  
  // Accessibility
  name?: string;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  
  // Styling
  className?: string;
  
  // Events
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({
  checked,
  onChange,
  defaultChecked = false,
  size = 'md',
  color = 'primary',
  disabled = false,
  name,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  className,
  onFocus,
  onBlur,
}) => {
  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    if (onChange) {
      onChange(newChecked);
    }
  };
  
  // Size configurations
  const sizeConfig = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-4 h-4',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-5 h-5',
      translate: 'translate-x-7',
    },
  };
  
  // Color configurations
  const colorConfig = {
    primary: {
      checked: 'bg-blue-500',
      unchecked: 'bg-gray-300',
      checkedDisabled: 'bg-blue-300',
      uncheckedDisabled: 'bg-gray-200',
    },
    secondary: {
      checked: 'bg-gray-600',
      unchecked: 'bg-gray-300',
      checkedDisabled: 'bg-gray-400',
      uncheckedDisabled: 'bg-gray-200',
    },
    success: {
      checked: 'bg-green-500',
      unchecked: 'bg-gray-300',
      checkedDisabled: 'bg-green-300',
      uncheckedDisabled: 'bg-gray-200',
    },
    warning: {
      checked: 'bg-yellow-500',
      unchecked: 'bg-gray-300',
      checkedDisabled: 'bg-yellow-300',
      uncheckedDisabled: 'bg-gray-200',
    },
    danger: {
      checked: 'bg-red-500',
      unchecked: 'bg-gray-300',
      checkedDisabled: 'bg-red-300',
      uncheckedDisabled: 'bg-gray-200',
    },
  };
  
  const currentSize = sizeConfig[size];
  const currentColor = colorConfig[color];
  
  // Determine background color based on state
  const getBackgroundColor = () => {
    if (disabled) {
      return isChecked ? currentColor.checkedDisabled : currentColor.uncheckedDisabled;
    }
    return isChecked ? currentColor.checked : currentColor.unchecked;
  };
  
  return (
    <label
      className={cn(
        'relative inline-flex items-center cursor-pointer',
        disabled && 'cursor-not-allowed opacity-60',
        className
      )}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        id={id}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div
        className={cn(
          'relative rounded-full transition-colors duration-200 ease-in-out',
          currentSize.track,
          getBackgroundColor(),
          !disabled && 'hover:shadow-md',
          'focus-within:ring-2 focus-within:ring-offset-2',
          color === 'primary' && 'focus-within:ring-blue-500',
          color === 'secondary' && 'focus-within:ring-gray-500',
          color === 'success' && 'focus-within:ring-green-500',
          color === 'warning' && 'focus-within:ring-yellow-500',
          color === 'danger' && 'focus-within:ring-red-500'
        )}
      >
        <div
          className={cn(
            'absolute top-1/2 left-1 transform -translate-y-1/2 bg-white rounded-full shadow transition-transform duration-200 ease-in-out',
            currentSize.thumb,
            isChecked && currentSize.translate
          )}
        />
      </div>
    </label>
  );
};

export default SwitchButton;
