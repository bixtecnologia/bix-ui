var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import classNames from 'classnames';
export const Button = ({ children, variant = 'primary', size = 'medium', shape = 'rectangular', type = 'button', disabled = false, loading = false, leftIcon, rightIcon, iconOnly = false, onClick, className, 'aria-label': ariaLabel, fullWidth = false, }) => {
    const [isLoading, setIsLoading] = useState(false);
    const isButtonLoading = loading || isLoading;
    const handleClick = () => __awaiter(void 0, void 0, void 0, function* () {
        if (onClick && !disabled && !isButtonLoading) {
            try {
                setIsLoading(true);
                yield onClick();
            }
            finally {
                setIsLoading(false);
            }
        }
    });
    const buttonClasses = classNames('rounded-lg inline-flex items-center justify-center transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative', {
        // Primary Variant
        'bg-gray-900 text-white hover:opacity-80 active:opacity-70': variant === 'primary' && !disabled,
        // Secondary Variant
        'bg-gray-100 text-gray-900 hover:opacity-80 active:opacity-70': variant === 'secondary' && !disabled,
        // Destructive Variant
        'bg-red-600 text-white hover:opacity-80 active:opacity-10': variant === 'destructive' && !disabled,
        // Outlined Variant
        'border border-gray-300 bg-transparent text-gray-900 hover:opacity-80 active:opacity-70': variant === 'outlined' && !disabled,
        // Text Variant
        'bg-transparent text-gray-900 hover:bg-gray-50 hover:opacity-80 active:opacity-70 border-none': variant === 'text' && !disabled,
        // Disabled State (common for all variants)
        'bg-gray-200 border border-gray-300 opacity-50 text-gray-900': disabled,
        // Base Size and Shape
        'rounded-md': !shape && !iconOnly,
        'rounded-full': shape === 'circular' || shape === 'rounded' || iconOnly,
        // Sizes with new spacing
        'h-8 text-sm': size === 'small' && !iconOnly,
        'h-10 text-base': size === 'medium' && !iconOnly,
        'h-12 text-lg': size === 'large' && !iconOnly,
        // Icon Only Sizes
        'w-8 h-8': size === 'small' && iconOnly,
        'w-10 h-10': size === 'medium' && iconOnly,
        'w-12 h-12': size === 'large' && iconOnly,
        // Regular Button Padding
        'px-4 py-2': !iconOnly,
        // Icon Spacing
        'gap-2': (leftIcon || rightIcon) && !iconOnly,
        // States
        'cursor-not-allowed': disabled || isButtonLoading,
        'w-full': !iconOnly && fullWidth,
        // Loading State
        'animate-pulse': isButtonLoading,
    }, className);
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
    return (_jsx("button", Object.assign({ type: type, className: buttonClasses, onClick: handleClick, disabled: disabled || isButtonLoading, "aria-disabled": disabled || isButtonLoading, "aria-label": ariaLabel }, { children: _jsxs("span", Object.assign({ className: classNames('flex items-center justify-center', {
                'gap-2': !iconOnly,
                'w-full h-full': iconOnly
            }) }, { children: [leftIcon && _jsx("span", Object.assign({ className: "flex items-center" }, { children: React.cloneElement(leftIcon, { size: getIconSize() }) })), !iconOnly && _jsx("span", Object.assign({ className: "flex items-center" }, { children: children })), rightIcon && _jsx("span", Object.assign({ className: "flex items-center" }, { children: React.cloneElement(rightIcon, { size: getIconSize() }) })), iconOnly && _jsx("span", Object.assign({ className: "flex items-center" }, { children: React.cloneElement(children, { size: getIconSize() }) }))] })) })));
};
export default Button;
