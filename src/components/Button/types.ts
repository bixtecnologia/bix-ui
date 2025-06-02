import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
  onClick?: () => void | Promise<void>;
  className?: string;
  'aria-label'?: string;
  fullWidth?: boolean;
} 