export type PasswordStrength = "very-weak" | "weak" | "good" | "great";

export function getPasswordStrength(password: string): PasswordStrength {
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

export interface PasswordCriteria {
  minLength: boolean;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  specialChar: boolean;
}

export function checkPasswordCriteria(password: string): PasswordCriteria {
  return {
    minLength: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[\W_]/.test(password),
  };
}