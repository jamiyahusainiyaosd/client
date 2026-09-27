export const toBengaliDigits = (num) => {
  if (num === null || num === undefined) return "০";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)]);
};

export const getDonorCountry = (address = "", country = "") => {
  if (country && country.trim() && country !== "অন্যান্য") {
    return country.trim();
  }
  const text = (address || "").toLowerCase();
  if (text.includes("সৌদি") || text.includes("saudi") || text.includes("riyadh") || text.includes("jeddah") || text.includes("মক্কা") || text.includes("মদিনা")) {
    return "সৌদি আরব";
  }
  if (text.includes("দুবাই") || text.includes("আমিরাত") || text.includes("uae") || text.includes("dubai") || text.includes("sharjah")) {
    return "সংযুক্ত আরব আমিরাত";
  }
  if (text.includes("কাতার") || text.includes("qatar") || text.includes("doha")) {
    return "কাতার";
  }
  if (text.includes("ওমান") || text.includes("oman") || text.includes("muscat")) {
    return "ওমান";
  }
  if (text.includes("কুয়েত") || text.includes("kuwait")) {
    return "কুয়েত";
  }
  if (text.includes("লন্ডন") || text.includes("যুক্তরাজ্য") || text.includes("uk") || text.includes("britain")) {
    return "যুক্তরাজ্য";
  }
  if (text.includes("আমেরিকা") || text.includes("যুক্তরাষ্ট্র") || text.includes("usa")) {
    return "যুক্তরাষ্ট্র";
  }
  if (text.includes("বাহরাইন") || text.includes("bahrain")) {
    return "বাহরাইন";
  }
  if (text.includes("মালয়েশিয়া") || text.includes("malaysia")) {
    return "মালয়েশিয়া";
  }
  if (text.includes("ইতালি") || text.includes("italy")) {
    return "ইতালি";
  }
  return "প্রবাসী দাতা";
};

export const formatDonationAmount = (amount) => {
  if (!amount || amount === "null" || amount === "undefined") {
    return "নিয়মিত / ঐচ্ছিক সদকা";
  }
  const str = String(amount).trim();
  if (str.includes("টাকা") || str.includes("চাঁদা")) {
    return str;
  }
  // If it's a number, convert to Bengali digits
  if (/^\d+$/.test(str)) {
    return `${toBengaliDigits(str)} টাকা`;
  }
  return str;
};
