// Bengali numeral digits
const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/**
 * Converts English digits in a string or number to Bengali digits.
 */
export const toBengaliNumber = (num) => {
  if (num === null || num === undefined || num === "") return "০";
  return String(num).replace(/\d/g, (d) => BENGALI_DIGITS[Number(d)] || d);
};

/**
 * Calculates current academic year dynamically based on the current date.
 * Madrasa academic sessions typically start in Shawwal/May.
 * If current month >= 4 (May onwards): startYear = currentYear, endYear = currentYear + 1.
 * If current month < 4 (Jan - Apr): startYear = currentYear - 1, endYear = currentYear.
 */
export const getAcademicYear = (separator = " — ") => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0 to 11

  const startYear = currentMonth >= 4 ? currentYear : currentYear - 1;
  const endYear = startYear + 1;

  return `${toBengaliNumber(startYear)}${separator}${toBengaliNumber(endYear)}`;
};

// Ready-to-use dynamic string
export const CURRENT_ACADEMIC_YEAR = getAcademicYear();
