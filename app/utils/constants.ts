export const DAYS_IN_A_MONTH: number[] = Array(31)
  .fill(0)
  .map((_, index) => index + 1);

export const MONTHS_IN_A_YEAR: number[] = Array(12)
  .fill(0)
  .map((_, index) => index + 1);

export const PASSWORD_VALIDATION_REGEXP = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,}$"
);
