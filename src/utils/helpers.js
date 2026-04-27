/**
 * Validates email format.
 * Returns true if valid, false if not.
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Formats a phone number string as (xxx) xxx-xxxx
 * Works on partial input too — used for display formatting.
 * Example: "5551234567" → "(555) 123-4567"
 */
export const formatPhone = (value) => {
  // Strip everything that isn't a digit
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3)  return digits;
  if (digits.length <= 6)  return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6,10)}`;
};

/**
 * Strips non-digit characters from a phone string.
 * Used before saving to context so stored values are consistent.
 * Example: "(555) 123-4567" → "5551234567"
 */
export const stripPhoneFormatting = (value) => {
  return value.replace(/\D/g, '');
};