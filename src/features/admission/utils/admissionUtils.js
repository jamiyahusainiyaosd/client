export const toBengaliDigits = (num) => {
  if (num === null || num === undefined) return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (w) => bengaliDigits[+w]);
};

export const formatFee = (val) => {
  if (val === null || val === undefined || val === "") return "০ ৳";
  const num = String(val).replace(/[^0-9]/g, "");
  if (!num) return `${val} ৳`;
  return `${toBengaliDigits(num)} ৳`;
};
