// Bengali digit converter
export const toBengaliDigits = (num) => {
  if (num === null || num === undefined || num === "") return "০";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bengaliDigits[Number(d)]);
};

// Category detector based on class name
export const getCategoryForClass = (className = "") => {
  const name = className.toLowerCase();
  if (name.includes("নূরানী") || name.includes("নুরানী") || name.includes("শিশু")) {
    return "nurani";
  }
  if (name.includes("নাজেরা") || name.includes("হিফজ") || name.includes("হুফ্ফাজ") || name.includes("হুফাজ")) {
    return "hifz";
  }
  if (name.includes("ইবতেদাই") || name.includes("ইবতেদায়ী") || name.includes("পাঞ্জম")) {
    return "ibtedai";
  }
  if (
    name.includes("মুতাওয়াসসিতাহ") ||
    name.includes("মুতাওয়াসসিতাহ") ||
    name.includes("নাহবেমীর") ||
    name.includes("হেদায়াতুন্নাহু") ||
    name.includes("কাফিয়া")
  ) {
    return "mutawassitah";
  }
  if (name.includes("সানাবিয়্যাহ") || name.includes("ছানাবিয়্যাহ") || name.includes("শরহে বেকায়া") || name.includes("শরহে জামি")) {
    return "sanawiyyah";
  }
  if (name.includes("ফযীলত") || name.includes("দাওরা") || name.includes("মেশকাত") || name.includes("তাকমীল")) {
    return "fazilat";
  }
  return "all";
};

// Category label
export const getCategoryLabel = (className = "") => {
  const cat = getCategoryForClass(className);
  switch (cat) {
    case "nurani":
      return "নূরানী বিভাগ";
    case "hifz":
      return "হিফজ ও নাজেরা";
    case "ibtedai":
      return "ইবতেদাইয়্যাহ";
    case "mutawassitah":
      return "মুতাওয়াসসিতাহ";
    case "sanawiyyah":
      return "ছানাবিয়্যাহ";
    case "fazilat":
      return "ফযীলত ও তাকমীল";
    default:
      return "সাধারণ জামাত";
  }
};

// Material icon mapping for class
export const getIconForResultClass = (className = "") => {
  const cat = getCategoryForClass(className);
  switch (cat) {
    case "nurani":
      return "workspace_premium";
    case "hifz":
      return "menu_book";
    case "ibtedai":
      return "auto_stories";
    case "mutawassitah":
      return "history_edu";
    case "sanawiyyah":
      return "school";
    case "fazilat":
      return "military_tech";
    default:
      return "description";
  }
};

// Dynamic syllabus, exam criteria, and subjects generator
export const getResultDetailsMetadata = (className = "", classDescription = "") => {
  const cat = getCategoryForClass(className);

  switch (cat) {
    case "nurani":
      return {
        category: "nurani",
        badge: "নূরানী পাঠ্যক্রম",
        level: "নূরানী ও বুনিয়াদী তালীম",
        examSession: "বার্ষিক শালানা ইমতিহান ২০২৬ — অনুমোদিত",
        board: "শায়েস্তাগঞ্জ কেন্দ্রীয় নূরানী ও কওমি শিক্ষাবোর্ড",
        syllabusDesc:
          classDescription ||
          `${className}-এর শিক্ষার্থীদের সহীহ কুরআন তিলাওয়াত, হরফ ও মাখরাজ পরিচিতি, মাসনুন দোয়া এবং প্রাথমিক বাংলা, ইংরেজি ও গণিত বিষয়ের সমন্বিত বার্ষিক শালানা ইমতিহান।`,
        syllabus: [
          { name: "সহীহ কুরআন ও কায়দা", marks: "১০০ নম্বর" },
          { name: "আমপারা তিলাওয়াত", marks: "১০০ নম্বর" },
          { name: "মাসনুন দু‘আ ও মাসায়েল", marks: "১০০ নম্বর" },
          { name: "বাংলা, ইংরেজি ও গণিত", marks: "১০০ নম্বর" },
        ],
        totalStudents: "৩২",
        passedStudents: "৩০",
        passRate: "৯৩%",
        passDetail: "মুমতাজ ও জায়্যিদ",
        certificateStatus: "অনুমোদিত",
        certificateDetail: "মূল কপি",
      };

    case "hifz":
      return {
        category: "hifz",
        badge: "হিফজুল কুরআন",
        level: "তাহফিজুল কুরআনুল কারীম",
        examSession: "হিফজ সমাপনী ও শালানা ইমতিহান ২০২৬",
        board: "হুফ্ফাজুল কুরআন কেন্দ্রীয় পরিষদ ও মাদ্রাসা বোর্ড",
        syllabusDesc:
          classDescription ||
          `${className}-এর শিক্ষার্থীদের বিশুদ্ধ কুরআন হিফজ, শোনানো (দোর), তাজবীদুল কুরআন, লাহজা এবং প্রয়োজনীয় সুন্নতি আদবের পূর্ণাঙ্গ বার্ষিক মূল্যায়ন বিবরণী।`,
        syllabus: [
          { name: "হিফজ তিলাওয়াত ও পরীক্ষা", marks: "১০০ নম্বর" },
          { name: "তাজবীদ ও সিফাতুল হুরুফ", marks: "১০০ নম্বর" },
          { name: "আমালুস্সানাহ্ ও আদব", marks: "১০০ নম্বর" },
          { name: "দৈনিক মাসনুন আমল ও দু‘আ", marks: "১০০ নম্বর" },
        ],
        totalStudents: "২৫",
        passedStudents: "২৩",
        passRate: "৯২%",
        passDetail: "মুমতাজ ও জায়্যিদ",
        certificateStatus: "অনুমোদিত",
        certificateDetail: "সনদপত্র প্রস্তুত",
      };

    case "mutawassitah":
      return {
        category: "mutawassitah",
        badge: "মুতাওয়াসসিতাহ বিভাগ",
        level: "দরসে নিজামী মধ্যম পর্যায়",
        examSession: "মুতাওয়াসসিতাহ কেন্দ্রীয় বার্ষিক পরীক্ষা ২০২৬",
        board: "বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ সমমান",
        syllabusDesc:
          classDescription ||
          `${className}-এর শিক্ষার্থীদের আরবি ব্যাকরণ (নাহব-সরফ), ফিকহ, মানতিক, তারকিব এবং আরবি সাহিত্যের বুনিয়াদী পাঠের বার্ষিক মেধা ও মার্কশীট।`,
        syllabus: [
          { name: "নাহবেমীর ও সরফ", marks: "১০০ নম্বর" },
          { name: "নূরুল ঈযাহ / কুদূরী", marks: "১০০ নম্বর" },
          { name: "তারজুমায়ে কুরআন মাজীদ", marks: "১০০ নম্বর" },
          { name: "সিরাত ও আখলাক", marks: "১০০ নম্বর" },
        ],
        totalStudents: "২৮",
        passedStudents: "২৫",
        passRate: "৮৯%",
        passDetail: "জায়্যিদ জিদ্দান",
        certificateStatus: "অনুমোদিত",
        certificateDetail: "মূল রেকর্ড",
      };

    case "sanawiyyah":
      return {
        category: "sanawiyyah",
        badge: "ছানাবিয়্যাহ উচ্চ বিভাগ",
        level: "দরসে নিজামী উচ্চ মাধ্যমিক",
        examSession: "মারকাযী সালানা ইমতিহান ২০২৬",
        board: "বাংলাদেশ কওমি মাদ্রাসা শিক্ষাবোর্ড",
        syllabusDesc:
          classDescription ||
          `${className}-এর শিক্ষার্থীদের কাফিয়া, উসূলুশ শাশী, শরহে তাহযীব ও হাদিসের মূল গ্রন্থের উপর পরিচালিত উচ্চতর শিক্ষাবর্ষের ফলাফল।`,
        syllabus: [
          { name: "কাফিয়া ও শরহে জামী", marks: "১০০ নম্বর" },
          { name: "মুখতাসারুল কুদূরী", marks: "১০০ নম্বর" },
          { name: "উসূলুল ফিকহ", marks: "১০০ নম্বর" },
          { name: "বালাগাত ও মানতিক", marks: "১০০ নম্বর" },
        ],
        totalStudents: "২২",
        passedStudents: "২০",
        passRate: "৯১%",
        passDetail: "মুমতাজ ও জায়্যিদ জিদ্দান",
        certificateStatus: "অনুমোদিত",
        certificateDetail: "অফিসিয়াল কপি",
      };

    case "fazilat":
      return {
        category: "fazilat",
        badge: "ফযীলত ও দাওরা",
        level: "উচ্চতর হাদিস ও তাফসীর বিভাগ",
        examSession: "দাওরায়ে হাদিস কেন্দ্রীয় পরীক্ষা ২০২৬",
        board: "আল-হাইআতুল উলয়া লিল-জামি‘আতিল কওমিয়্যা বাংলাদেশ",
        syllabusDesc:
          classDescription ||
          `${className}-এর শিক্ষার্থীদের সিহাহ সিত্তাহ হাদিস গ্রন্থসমূহ, তাফসীরে জালালাইন ও উচ্চতর ইসলামী ফিকহের সমন্বিত মেধা তালিকা ও মার্কশীট।`,
        syllabus: [
          { name: "সহীহুল বুখারী ও মুসলিম", marks: "১০০ নম্বর" },
          { name: "জামে তিরমিযী ও আবু দাউদ", marks: "১০০ নম্বর" },
          { name: "তাফসীরে জালালাইন", marks: "১০০ নম্বর" },
          { name: "শরহে নুখবাতুল ফিকার", marks: "১০০ নম্বর" },
        ],
        totalStudents: "১৮",
        passedStudents: "১৮",
        passRate: "১০০%",
        passDetail: "মুমতাজ (সর্বোচ্চ)",
        certificateStatus: "অনুমোদিত",
        certificateDetail: "সনদপত্র প্রস্তুত",
      };

    default:
      return {
        category: "ibtedai",
        badge: "একাডেমিক জামাত",
        level: "প্রাথমিক ও বুনিয়াদী শাখা",
        examSession: "বার্ষিক শালানা ইমতিহান ২০২৬ — অনুমোদিত",
        board: "শায়েস্তাগঞ্জ কেন্দ্রীয় মাদ্রাসা শিক্ষাবোর্ড",
        syllabusDesc:
          classDescription ||
          `${className}-এর শিক্ষার্থীদের কুরআন শিক্ষা, হাদিস শরীফ, মাসায়েল এবং বুনিয়াদী দ্বীনিয়াত বিষয়ের সমন্বিত বার্ষিক শালানা ইমতিহান ফলাফল।`,
        syllabus: [
          { name: "কুরআন মাজীদ তিলাওয়াত", marks: "১০০ নম্বর" },
          { name: "মৌলিক ফিকহ ও মাসনুন আমল", marks: "১০০ নম্বর" },
          { name: "আরবি ও উর্দু কিতাব", marks: "১০০ নম্বর" },
          { name: "বাংলা, গণিত ও নীতিশিক্ষা", marks: "১০০ নম্বর" },
        ],
        totalStudents: "২৪",
        passedStudents: "২২",
        passRate: "৯১%",
        passDetail: "মুমতাজ ও জায়্যিদ",
        certificateStatus: "অনুমোদিত",
        certificateDetail: "মূল কপি",
      };
  }
};
