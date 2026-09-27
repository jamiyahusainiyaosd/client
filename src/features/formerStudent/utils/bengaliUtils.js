export const toBengaliDigits = (num) => {
  if (num === null || num === undefined) return "";
  const bDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bDigits[d] || d);
};
