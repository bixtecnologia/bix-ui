export interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  showStrength?: boolean;
  showCriteria?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}