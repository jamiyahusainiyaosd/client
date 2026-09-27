// Bengali digit converter
export const toBengaliDigits = (num) => {
  if (num === null || num === undefined || num === "") return "০";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bengaliDigits[Number(d)]);
};

// Teacher designation category classifier
export const getTeacherCategory = (designation = "") => {
  const d = designation.toLowerCase();
  if (d.includes("মুহতামিম") || d.includes("মুহাদ্দিস") || d.includes("প্রিন্সিপাল")) {
    return "leadership";
  }
  if (d.includes("তা'লিমাত") || d.includes("তা’লিমাত") || d.includes("শিক্ষা সচিব") || d.includes("নাজিম")) {
    return "academic_lead";
  }
  if (d.includes("হিফজ") || d.includes("হাফেজ") || d.includes("ক্বারী")) {
    return "quran";
  }
  return "general";
};

// Teacher status badge text and styling
export const getTeacherStatusBadge = (designation = "") => {
  const d = designation.toLowerCase();
  if (d.includes("মুহতামিম")) {
    return {
      label: "মুহতামিম / প্রধান পরিচালক",
      className: "bg-emerald-50 text-emerald-800 border border-emerald-200/80",
    };
  }
  if (d.includes("তা'লিমাত") || d.includes("তা’লিমাত")) {
    return {
      label: "নাজিমে তা’লিমাত / শিক্ষা সচিব",
      className: "bg-emerald-50 text-emerald-800 border border-emerald-200/80",
    };
  }
  return {
    label: "সম্মানিত শিক্ষক",
    className: "bg-white text-slate-700 border border-slate-200/80",
  };
};
