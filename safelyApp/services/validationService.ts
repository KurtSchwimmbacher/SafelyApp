// services/validationService.ts

export const validateEmail = (email: string): string | null => {
  if (!email) return "Please enter your email address.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address.";
  return null;
};

export const validatePassword = (password: string): string | null => {
  const minLength = /.{6,}/;
  const upperCase = /[A-Z]/;
  const number = /\d/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (!minLength.test(password)) return "Your password should be at least 6 characters long.";
  if (!upperCase.test(password)) return "Add at least one uppercase letter to your password.";
  if (!number.test(password)) return "Include at least one number in your password.";
  if (!specialChar.test(password)) return "Include at least one special character (e.g. !, @, #, $).";

  return null; // No errors
};

export const validatePasswordsMatch = (password: string, confirmPassword: string): string | null => {
  if (password !== confirmPassword) return "Passwords do not match. Please check and try again.";
  return null;
};