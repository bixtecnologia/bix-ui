import React, { useState } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  onClick,
  className,
  'aria-label': ariaLabel,
  fullWidth = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isButtonLoading = loading || isLoading;

  const handleClick = async () => {
    if (onClick && !disabled && !isButtonLoading) {
      try {
        setIsLoading(true);
        await onClick();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const buttonClasses = classNames(
    'inline-flex items-center justify-center transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative',
    {
      // Primary Variant
      'bg-zinc-900 text-white hover:opacity-80 active:opacity-70': variant === 'primary' && !disabled,

      // Secondary Variant
      'bg-zinc-100 text-zinc-900 hover:opacity-80 active:opacity-70': variant === 'secondary' && !disabled,

      // Destructive Variant
      'bg-red-600 text-white hover:opacity-80 active:opacity-70': variant === 'destructive' && !disabled,

      // Outlined Variant
      'border border-zinc-300 bg-transparent text-zinc-900 hover:opacity-80 active:opacity-70': variant === 'outlined' && !disabled,

      // Text Variant
      'bg-transparent text-zinc-900 hover:bg-zinc-50 hover:opacity-80 active:opacity-70 border-none': variant === 'text' && !disabled,

      // Disabled State (common for all variants)
      'bg-zinc-200 border border-zinc-300 opacity-50 text-zinc-900': disabled,

      'rounded-md': !iconOnly,
      'rounded-full': iconOnly,

      'h-8 text-sm': size === 'small' && !iconOnly,
      'h-10 text-base': size === 'medium' && !iconOnly,
      'h-12 text-lg': size === 'large' && !iconOnly,

      'w-8 h-8': size === 'small' && iconOnly,
      'w-10 h-10': size === 'medium' && iconOnly,
      'w-12 h-12': size === 'large' && iconOnly,

      'px-4 py-2': !iconOnly,

      'gap-2': (leftIcon || rightIcon) && !iconOnly,

      'cursor-not-allowed': disabled || isButtonLoading,
      'w-full': !iconOnly && fullWidth,

      'animate-pulse': isButtonLoading,
    },
    className
  );

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || isButtonLoading}
      aria-disabled={disabled || isButtonLoading}
      aria-label={ariaLabel}
    >
      <span className={classNames('flex items-center justify-center', {
        'gap-2': !iconOnly,
        'w-full h-full': iconOnly
      })}>
        {leftIcon && <span className="flex items-center">{React.cloneElement(leftIcon as React.ReactElement, { size: getIconSize() })}</span>}
        {!iconOnly && <span className="flex items-center">{children}</span>}
        {rightIcon && <span className="flex items-center">{React.cloneElement(rightIcon as React.ReactElement, { size: getIconSize() })}</span>}
        {iconOnly && <span className="flex items-center">{React.cloneElement(children as React.ReactElement, { size: getIconSize() })}</span>}
      </span>
    </button>
  );
};

export default Button;
