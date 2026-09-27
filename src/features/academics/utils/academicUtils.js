export const toBengaliDigits = (num) => {
  if (num === null || num === undefined) return "";
  const bDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bDigits[d] || d);
};

export const formatBengaliDate = (dateStr) => {
  if (!dateStr) return "৪ মার্চ, ২০২৫";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "৪ মার্চ, ২০২৫";
    const months = [
      "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
      "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
    ];
    const day = toBengaliDigits(d.getDate());
    const month = months[d.getMonth()];
    const year = toBengaliDigits(d.getFullYear());
    return `${day} ${month}, ${year}`;
  } catch {
    return "৪ মার্চ, ২০২৫";
  }
};

export const formatBengaliTime = (dateStr) => {
  if (!dateStr) return "১১:০৫:৫২ PM";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "১১:০৫:৫২ PM";
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${toBengaliDigits(hours)}:${toBengaliDigits(minutes)}:${toBengaliDigits(seconds)} ${ampm}`;
  } catch {
    return "১১:০৫:৫২ PM";
  }
};

export const getIconForClass = (name = "") => {
  if (name.includes("শিশু") || name.includes("নূরানী")) return "child_care";
  if (name.includes("হুফ্ফাজ") || name.includes("হিফজ")) return "menu_book";
  if (name.includes("ছরফ") || name.includes("মুতাওয়াসসিতাহ ১ম")) return "history_edu";
  if (name.includes("হেদায়াতুন্নাহ")) return "auto_stories";
  if (name.includes("কাফিয়া")) return "school";
  if (name.includes("শরহে জামি") || name.includes("ছানিয়া")) return "import_contacts";
  if (name.includes("মুখতাছার") || name.includes("উলা")) return "local_library";
  if (name.includes("জালালাইন")) return "menu_book";
  if (name.includes("মেশকাত")) return "workspace_premium";
  return "menu_book";
};

export const getCategoryForClass = (name = "") => {
  if (name.includes("শিশু") || name.includes("নূরানী") || name.includes("মক্তব")) return "নূরানী ও মক্তব";
  if (name.includes("হুফ্ফাজ") || name.includes("হিফজ")) return "হিফজুল কুরআন";
  if (name.includes("মুতাওয়াসসিতাহ")) return "মুতাওয়াসসিতাহ";
  if (name.includes("সানাবিয়্যাহ") || name.includes("কাফিয়া") || name.includes("শরহে জামি") || name.includes("মুখতাছার")) return "সানাবিয়্যাহ";
  if (name.includes("ফযিলত") || name.includes("জালালাইন") || name.includes("মেশকাত")) return "ফযিলত";
  return "কিতাব বিভাগ";
};

export const getCurriculumDetails = (className = "", level = "") => {
  const name = className.toLowerCase();
  const cat = (level || "").toLowerCase();

  // 1. Noorani / Maktab
  if (
    name.includes("নূরানী") ||
    name.includes("শিশু") ||
    cat.includes("নূরানী") ||
    cat.includes("মক্তব")
  ) {
    return {
      features: [
        {
          title: "সহীহ কুরআন ও কায়দা",
          desc: "নূরানী পদ্ধতিতে শুদ্ধ হরফ উচ্চারণ, মাখরাজ ও প্রাথমিক কায়দা শিক্ষা।",
          icon: "child_care",
        },
        {
          title: "মৌলিক মাসআলা ও দু‘আ",
          desc: "দৈনন্দিন প্রয়োজনীয় সুন্নাত ও মাসনূন দু‘আ এবং ওযু-নামাযের বাস্তব শিক্ষা।",
          icon: "menu_book",
        },
        {
          title: "বাংলা ও সাধারণ গণিত",
          desc: "প্রাথমিক বাংলা বর্ণমালা, সুন্দর হাতের লেখা ও সাধারণ গণিত পাঠদান।",
          icon: "edit_note",
        },
        {
          title: "স্নেহশীল পর্যবেক্ষণ",
          desc: "কোমলমতি শিশুদের মানসিক বিকাশে অভিজ্ঞ শিক্ষকমণ্ডলীর সার্বক্ষণিক যত্ন।",
          icon: "verified_user",
        },
      ],
      routine: [
        { time: "সকাল ৮:০০ – ১০:৩০", label: "১ম অধিবেশন", title: "হরফ পরিচয়, মাখরাজ ও কুরআন শিক্ষা" },
        { time: "সকাল ১০:৪৫ – ১২:০০", label: "২য় অধিবেশন", title: "মাসনূন দু‘আ, আখলাক ও মাসআলা" },
        { time: "দুপুর ১২:১৫ – ১:৩০", label: "৩য় অধিবেশন", title: "বাংলা, অঙ্ক ও সুন্দর হস্তলিপি" },
      ],
      routineBadge: "৩ পালা পাঠদান",
      teacherNote:
        "নূরানী প্রশিক্ষণপ্রাপ্ত অভিজ্ঞ মুয়াল্লিমগণের স্নেহামৃত নেগরানিতে এই বিভাগ পরিচালিত হয়।",
    };
  }

  // 2. Hifz
  if (name.includes("হিফজ") || name.includes("হুফ্ফাজ") || cat.includes("হিফজ")) {
    return {
      features: [
        {
          title: "তাজবীদ ও মাখরাজ",
          desc: "বিশুদ্ধ মাখরাজ ও সিফাত সহ তাজবীদের সূক্ষ্ম নিয়মকানুন নিবিড় অনুশীলন।",
          icon: "record_voice_over",
        },
        {
          title: "সবক ও দাওর",
          desc: "প্রতিদিনের নির্ধারিত রুকু মুখস্থকরণ এবং ইয়াদ রাখার জন্য গভীর পুনরাবৃত্তি।",
          icon: "repeat",
        },
        {
          title: "হুসনুল সওত ও ক্বেরাত",
          desc: "মধুর কণ্ঠে তেলাওয়াত চর্চা এবং নিয়মিত হুসনুল সওত প্রতিযোগিতা।",
          icon: "spatial_audio",
        },
        {
          title: "সার্বক্ষণিক তত্ত্বাবধান",
          desc: "অভিজ্ঞ হাফেজ ও কারী সাহেবগণের প্রত্যক্ষ ও স্নেহামৃত দিকনির্দেশনা।",
          icon: "verified_user",
        },
      ],
      routine: [
        { time: "ফজর – সকাল ৮:০০", label: "ফজর পর", title: "নতুন সবক পাঠ (হিফজুল কুরআন)" },
        { time: "যোহর – আসর", label: "যোহর পর", title: "আমপারা ও সাবকী দাওর অনুশীলন" },
        { time: "মাগরিব – এশা", label: "মাগরিব পর", title: "তাজবীদ অনুশীলন ও রাতের খাস দাওর" },
      ],
      routineBadge: "সার্বক্ষণিক হিফজ নেগরানি",
      teacherNote:
        "শায়েস্তাগঞ্জ হুসাইনিয়া মাদ্রাসার অভিজ্ঞ হুফ্ফাজ মণ্ডলীর আন্তরিক নেগরানি ও সুন্নাতি তারবিয়াতের অধীনে এই জামাত পরিচালিত হয়।",
    };
  }

  // 3. Mutawassitah / Kitab (Shorof, Nahw)
  if (
    name.includes("মুতাওয়াসসিতাহ") ||
    name.includes("ছরফ") ||
    name.includes("নাহ") ||
    cat.includes("মুতাওয়াসসিতাহ")
  ) {
    return {
      features: [
        {
          title: "মিজান ও ছরফ তাহকিক",
          desc: "আরবি রূপতত্ত্ব, বাবের পরিবর্তন ও শব্দ গঠনের গভীর ব্যাকরণগত বিশ্লেষণ।",
          icon: "history_edu",
        },
        {
          title: "ইলমুন নাহব ও বাক্যরীতি",
          desc: "আরবি বাক্যের গঠন, এরাব বিশ্লেষণ এবং নাহবে মীর ও হেদায়াতুন্নাহ অধ্যয়ন।",
          icon: "auto_stories",
        },
        {
          title: "ফিকহি মাসআলা (কুদূরী)",
          desc: "ইবাদত ও মুয়ামালাতের বুনিয়াদি ফিকহি হুকুম-আহকাম ও মাসআলা শিক্ষা।",
          icon: "gavel",
        },
        {
          title: "আরবি ভাষা ও কথোপকথন",
          desc: "আরবি ভাষায় কথা বলা ও লেখার প্রাথমিক বুনিয়াদ তৈরির বিশেষ তালিম।",
          icon: "translate",
        },
      ],
      routine: [
        { time: "সকাল ৮:০০ – ১১:০০", label: "সকাল", title: "ছরফ ও নাহব শাস্ত্রের মূল কিতাব পাঠ" },
        { time: "সকাল ১১:১৫ – ১:০০", label: "দুপুর", title: "ফিকহ ও আদব বিষয়ক কিতাব অধ্যয়ন" },
        { time: "মাগরিব – এশা", label: "সন্ধ্যা", title: "তাকরার (পারস্পরিক আলোচনা ও মুতালাআ)" },
      ],
      routineBadge: "নিয়মিত পাঠ ও তাকরার",
      teacherNote:
        "যোগ্যতাসম্পন্ন ফাজেল ও মুফতি সাহেবগণের নিবিড় তত্ত্বাবধানে এই জামাতের সবক পরিচালিত হয়।",
    };
  }

  // 4. Sanawiyyah (Kafiyah, Sharhe Jami, Usul)
  if (
    name.includes("সানাবিয়্যাহ") ||
    name.includes("কাফিয়া") ||
    name.includes("জামি") ||
    cat.includes("সানাবিয়্যাহ")
  ) {
    return {
      features: [
        {
          title: "উচ্চতর নাহব ও কাফিয়া",
          desc: "কাফিয়া ও শরহে জামির মাধ্যমে আরবি ব্যাকরণের জটিল তত্ত্বের সমাধান।",
          icon: "school",
        },
        {
          title: "উসূলে ফিকহ (উসূলে শাশী)",
          desc: "ইসলামি আইনশাস্ত্রের উৎস ও বিধান প্রণয়নের বিজ্ঞানসম্মত নীতিমালা।",
          icon: "balance",
        },
        {
          title: "মানতিক ও বেলাগাত",
          desc: "যুক্তিবিদ্যা ও অলঙ্কার শাস্ত্রের গভীর অনুধাবন ও ভাবার্থ বিশ্লেষণ।",
          icon: "psychology",
        },
        {
          title: "তাহকিক ও বাহাস",
          desc: "ইলমি মাসআলাসমূহে গভীর গবেষণা এবং দলীলভিত্তিক যুক্তি প্রদর্শনের দক্ষতা।",
          icon: "find_in_page",
        },
      ],
      routine: [
        { time: "সকাল ৮:০০ – ১১:০০", label: "প্রভাতী সেশন", title: "কাফিয়া, জামি ও উসূলে ফিকহ পাঠদান" },
        { time: "সকাল ১১:১৫ – ১:৩০", label: "মধ্যাহ্ন সেশন", title: "মানতিক, বালাগাত ও সাহিত্যের নিবিড় পাঠ" },
        { time: "মাগরিব – এশা", label: "সান্ধ্যকালীন", title: "শিক্ষার্থীদের ইলমি মুবাহাসা ও ইবারত অনুশীলন" },
      ],
      routineBadge: "উচ্চতর শাস্ত্রীয় পাঠ",
      teacherNote:
        "দক্ষ ও বিদগ্ধ উস্তাদগণের সরাসরি পাঠদান ও দিকনির্দেশনায় শিক্ষার্থীরা পূর্ণ শাস্ত্রীয় বুৎপত্তি অর্জন করে।",
    };
  }

  // 5. Fazilat / Dawra-e-Hadith / Mishkat / Advanced Default
  return {
    features: [
      {
        title: "হাদিস শাস্ত্রের গভীর পাঠ",
        desc: "হাদিসের মতন, সনদ, রিজাল ও জটিল ব্যাখ্যামূলক গবেষণা।",
        icon: "workspace_premium",
      },
      {
        title: "তুলনামূলক ফিকহ",
        desc: "চার মাজহাবের দালিলিক বাহাস ও সমসাময়িক মাসআলার ইসলামি সমাধান।",
        icon: "menu_book",
      },
      {
        title: "তাফসীরে কুরআন",
        desc: "আহকামুল কুরআন ও প্রামাণ্য তাফসীর গ্রন্থের আলোকে গভীর বিশ্লেষণ।",
        icon: "import_contacts",
      },
      {
        title: "আদর্শ আলেম গঠন",
        desc: "ইলম ও আমলের পূর্ণতায় দ্বীনের খাদেম ও সমাজ সংস্কারক হিসেবে প্রস্তুতকরণ।",
        icon: "verified",
      },
    ],
    routine: [
      { time: "সকাল ৮:০০ – ১১:০০", label: "১ম অধিবেশন", title: "হাদিসের কিতাবসমূহের মূল দরস" },
      { time: "সকাল ১১:১৫ – ১:৩০", label: "২য় অধিবেশন", title: "তাফসীর ও ফিকহি তাহকিকি দরস" },
      { time: "রাত ৮:০০ – ১০:০০", label: "রাত্রিকালীন", title: "ব্যক্তিগত মুতালাআ ও কিতাব গবেষণা" },
    ],
    routineBadge: "উচ্চতর হাদিস ও ফিকহ",
    teacherNote:
      "মুহাদ্দিস ও শায়খুল হাদিসগণের প্রত্যক্ষ সান্নিধ্যে শিক্ষার্থীদের নৈতিক ও আত্মিক তরবিয়ত প্রদান করা হয়।",
  };
};
