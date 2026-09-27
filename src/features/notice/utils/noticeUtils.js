import Time from "../../../utils/formateData";

// Bengali numeral converter
export const toBengaliDigits = (num) => {
  if (num === null || num === undefined || num === "") return "০";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bengaliDigits[Number(d)]);
};

// Classify notice category from title and description
export const getNoticeCategory = (title = "", description = "") => {
  const t = `${title} ${description}`.toLowerCase();

  // 1. Admission (highest priority specific intent)
  if (
    t.includes("ভর্তি") ||
    t.includes("দাখেলা") ||
    t.includes("দাখিলা") ||
    t.includes("আবেদন") ||
    t.includes("ভর্তি ফরম") ||
    t.includes("নতুন সেশন")
  ) {
    return "admission";
  }

  // 2. Exam & Results
  if (
    t.includes("পরিক্ষা") ||
    t.includes("পরীক্ষা") ||
    t.includes("ফলাফল") ||
    t.includes("বেফাক") ||
    t.includes("ইমতিহান") ||
    t.includes("নম্বর") ||
    t.includes("গ্রেড")
  ) {
    return "exam";
  }

  // 3. Holidays & Vacations
  if (
    t.includes("ছুটি") ||
    t.includes("অবকাশ") ||
    t.includes("বন্ধ") ||
    t.includes("রমজান") ||
    t.includes("কুরবানি") ||
    t.includes("ঈদ")
  ) {
    return "holiday";
  }

  // 4. Academic & Lessons
  if (
    t.includes("সবক") ||
    t.includes("দরস") ||
    t.includes("ক্লাস") ||
    t.includes("কিতাব") ||
    t.includes("খোলা") ||
    t.includes("পাঠদান") ||
    t.includes("রুটিন") ||
    t.includes("সিলেবাস")
  ) {
    return "academic";
  }

  return "administrative";
};

// Bengali label for category
export const getNoticeCategoryLabel = (title = "") => {
  const cat = getNoticeCategory(title);
  switch (cat) {
    case "exam":
      return "পরীক্ষা ও ফলাফল";
    case "holiday":
      return "ছুটি ও অবকাশ";
    case "admission":
      return "ভর্তি সংক্রান্ত";
    case "academic":
      return "শিক্ষা ও ক্লাস";
    case "administrative":
    default:
      return "সাধারণ বিজ্ঞপ্তি";
  }
};

// Material Symbol Icon for category
export const getNoticeIcon = (title = "") => {
  const cat = getNoticeCategory(title);
  switch (cat) {
    case "exam":
      return "assignment";
    case "holiday":
      return "event_available";
    case "admission":
      return "how_to_reg";
    case "academic":
      return "menu_book";
    case "administrative":
    default:
      return "campaign";
  }
};

// Format date safely to Bengali
export const formatNoticeDate = (dateStr) => {
  if (!dateStr) return "তারিখ উপলব্ধ নয়";
  try {
    return Time(dateStr);
  } catch {
    return dateStr;
  }
};
