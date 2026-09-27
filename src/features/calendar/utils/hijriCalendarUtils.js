// Hijri Academic & Islamic Calendar Utility for Jamiyah Husainiya Madrasah
// 100% Arabic nomenclature (transliterated in Bengali + Arabic script) per Qawmi Madrasah standards.

export const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toBengaliNumber(num) {
  if (num === null || num === undefined) return "";
  return num
    .toString()
    .split("")
    .map((ch) => (BENGALI_DIGITS[ch] !== undefined ? BENGALI_DIGITS[ch] : ch))
    .join("");
}

export function toArabicNumber(num) {
  if (num === null || num === undefined) return "";
  return num
    .toString()
    .split("")
    .map((ch) => (ARABIC_DIGITS[ch] !== undefined ? ARABIC_DIGITS[ch] : ch))
    .join("");
}

// 12 Hijri Months in Arabic (with standard Bengali transliteration and original Arabic script)
export const HIJRI_MONTHS = [
  { id: 1, name: "আল-মুহাররম", arabic: "المحرّم", isSacred: true },
  { id: 2, name: "সফর", arabic: "صفر", isSacred: false },
  { id: 3, name: "রবিউল আউয়াল", arabic: "ربيع الأوّل", isSacred: false },
  { id: 4, name: "রবিউছ-ছানী", arabic: "ربيع الثاني", isSacred: false },
  { id: 5, name: "জুমাদাল উলা", arabic: "جمادى الأولى", isSacred: false },
  { id: 6, name: "জুমাদাল আখিরাহ", arabic: "جمادى الآخرة", isSacred: false },
  { id: 7, name: "রজব", arabic: "رجب", isSacred: true },
  { id: 8, name: "শা'বান", arabic: "شعبان", isSacred: false },
  { id: 9, name: "রমাদান", arabic: "رمضان", isSacred: true },
  { id: 10, name: "শাওয়াল", arabic: "شوّال", isSacred: false },
  { id: 11, name: "যুল কা'দাহ", arabic: "ذو القعدة", isSacred: true },
  { id: 12, name: "যুল হিজ্জাহ", arabic: "ذو الحجّة", isSacred: true },
];

// Weekday columns starting on Saturday (আস-সাবত) per Islamic & Qawmi madrasa tradition
// Standard Bengali day names (শনিবার, রবিবার etc.) are replaced with Arabic day names!
export const WEEK_DAYS = [
  { key: "sat", name: "সাবত", full: "আস-সাবত", arabic: "السبت", weekdayIndex: 6 },
  { key: "sun", name: "আহাদ", full: "আল-আহাদ", arabic: "الأحد", weekdayIndex: 0 },
  { key: "mon", name: "ইছনাইন", full: "আল-ইছনাইন", arabic: "الإثنين", weekdayIndex: 1 },
  { key: "tue", name: "ছুলাছা", full: "আছ-ছুলাছা", arabic: "الثلاثاء", weekdayIndex: 2 },
  { key: "wed", name: "আরবিআ", full: "আল-আরবিআ", arabic: "الأربعاء", weekdayIndex: 3 },
  { key: "thu", name: "খামিস", full: "আল-খামিস", arabic: "الخميس", weekdayIndex: 4 },
  { key: "fri", name: "জুমু'আ", full: "আল-জুমু'আ", arabic: "الجمعة", weekdayIndex: 5, isJummah: true },
];

// Islamic events with authentic Arabic titles
export const ISLAMIC_EVENTS = {
  "1-1": "রা'সুল সানাহ (হিজরি নববর্ষ)",
  "1-9": "সাওমে তাসূ'আ (রোজা)",
  "1-10": "ইয়াওমু আশুরা (পবিত্র আশুরা)",
  "3-12": "ঈদে মিলাদুন্নবী (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম)",
  "7-27": "লাইলাতুল মি'রাজ",
  "8-15": "লাইলাতুল বারাআত (শবে বরাত)",
  "9-1": "আউয়ালু রমাদান (রোজা শুরু)",
  "9-17": "গাজওয়াতু বদর (ঐতিহাসিক বদর দিবস)",
  "9-20": "ফাতহু মাক্কাহ (মক্কা বিজয়)",
  "9-21": "লাইলাতুল কদর (সম্ভাব্য)",
  "9-23": "লাইলাতুল কদর (সম্ভাব্য)",
  "9-25": "লাইলাতুল কদর (সম্ভাব্য)",
  "9-27": "লাইলাতুল কদর (মহিমান্বিত রাত)",
  "9-29": "লাইলাতুল কদর (সম্ভাব্য)",
  "10-1": "ঈদুল ফিতর (১ম দিন)",
  "10-2": "ঈদুল ফিতর (২য় দিন)",
  "10-3": "ঈদুল ফিতর (৩য় দিন)",
  "12-8": "ইয়াওমুত তারবিয়াহ (হজ শুরু)",
  "12-9": "ইয়াওমু আরাফাহ (আরাফাহ দিবস)",
  "12-10": "ইয়াওমুন নাহর (ঈদুল আজহা)",
  "12-11": "আইয়ামুত তাশরিক (১ম দিন)",
  "12-12": "আইয়ামুত তাশরিক (২য় দিন)",
  "12-13": "আইয়ামুত তাশরিক (৩য় দিন)",
};

const hijriFormatter = new Intl.DateTimeFormat("en-TN-u-ca-islamic-umalqura", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

/**
 * Get Hijri details for any date
 */
export function getHijriDate(date = new Date(), adjustment = 0) {
  const adjusted = new Date(date.getTime() + adjustment * 86400000);
  try {
    const parts = hijriFormatter.formatToParts(adjusted);
    const getVal = (type) => parseInt(parts.find((p) => p.type === type)?.value || "0", 10);
    const hDay = getVal("day");
    const hMonth = getVal("month");
    const hYear = getVal("year");

    const monthObj = HIJRI_MONTHS.find((m) => m.id === hMonth) || HIJRI_MONTHS[0];
    const eventKey = `${hMonth}-${hDay}`;
    const event = ISLAMIC_EVENTS[eventKey] || null;

    // Weekday
    const gDayOfWeek = adjusted.getDay(); // 0 (Sun) to 6 (Sat)
    const weekDayObj = WEEK_DAYS.find((w) => w.weekdayIndex === gDayOfWeek) || WEEK_DAYS[0];

    return {
      hDay,
      hDayBn: toBengaliNumber(hDay),
      hDayAr: toArabicNumber(hDay),
      hMonth,
      hMonthName: monthObj.name,
      hMonthArabic: monthObj.arabic,
      hYear,
      hYearBn: toBengaliNumber(hYear),
      hYearAr: toArabicNumber(hYear),
      dayName: weekDayObj.full,
      dayArabic: weekDayObj.arabic,
      gDate: adjusted,
      event,
      isSacred: monthObj.isSacred,
    };
  } catch {
    return {
      hDay: 1,
      hDayBn: "১",
      hDayAr: "١",
      hMonth: 1,
      hMonthName: "আল-মুহাররম",
      hMonthArabic: "المحرّم",
      hYear: 1448,
      hYearBn: "১৪৪৮",
      hYearAr: "١٤٤٨",
      dayName: "আস-সাবত",
      dayArabic: "السبت",
      gDate: adjusted,
      event: null,
      isSacred: true,
    };
  }
}

/**
 * Finds Gregorian start date of a given Hijri month and year
 */
export function findFirstOfHijriMonth(targetHYear, targetHMonth, adjustment = 0) {
  const baseDate = new Date();
  const currentH = getHijriDate(baseDate, adjustment);

  const diffMonths = (targetHYear - currentH.hYear) * 12 + (targetHMonth - currentH.hMonth);
  const approxTime = baseDate.getTime() + diffMonths * 29.530588 * 86400000;

  for (let offset = -20; offset <= 20; offset++) {
    const candidate = new Date(approxTime + offset * 86400000);
    const h = getHijriDate(candidate, adjustment);
    if (h.hYear === targetHYear && h.hMonth === targetHMonth && h.hDay === 1) {
      return candidate;
    }
  }

  return new Date(approxTime);
}

/**
 * Generate full month days array for grid rendering
 */
export function generateHijriMonthDays(hYear, hMonth, adjustment = 0) {
  const firstDayGDate = findFirstOfHijriMonth(hYear, hMonth, adjustment);
  const today = new Date();
  const todayH = getHijriDate(today, adjustment);

  // Column start: Saturday (6) = 0, Sunday (0) = 1, ..., Friday (5) = 6
  const gDayOfWeek = firstDayGDate.getDay();
  const startColIndex = (gDayOfWeek + 1) % 7;

  const days = [];
  const walkDate = new Date(firstDayGDate);

  while (true) {
    const h = getHijriDate(walkDate, adjustment);
    if (h.hMonth !== hMonth) break;

    const weekday = walkDate.getDay();
    const weekDayObj = WEEK_DAYS.find((w) => w.weekdayIndex === weekday) || WEEK_DAYS[0];

    const isToday =
      todayH.hYear === hYear &&
      todayH.hMonth === hMonth &&
      todayH.hDay === h.hDay;

    const isJummah = weekday === 5; // Friday (আল-জুমু'আ)
    const isAyyamAlBid = h.hDay === 13 || h.hDay === 14 || h.hDay === 15;
    const eventKey = `${hMonth}-${h.hDay}`;
    const event = ISLAMIC_EVENTS[eventKey] || null;

    days.push({
      hDay: h.hDay,
      hDayBn: h.hDayBn,
      hDayAr: h.hDayAr,
      hMonth,
      hYear,
      dayName: weekDayObj.full,
      dayArabic: weekDayObj.arabic,
      gDate: new Date(walkDate),
      gDay: walkDate.getDate(),
      weekday,
      isToday,
      isJummah,
      isAyyamAlBid,
      event,
    });

    walkDate.setDate(walkDate.getDate() + 1);
  }

  return {
    startColIndex,
    days,
    totalDays: days.length,
    totalDaysBn: toBengaliNumber(days.length),
    totalDaysAr: toArabicNumber(days.length),
  };
}

export function getPrevHijriMonth(hYear, hMonth) {
  if (hMonth === 1) {
    return { hYear: hYear - 1, hMonth: 12 };
  }
  return { hYear, hMonth: hMonth - 1 };
}

export function getNextHijriMonth(hYear, hMonth) {
  if (hMonth === 12) {
    return { hYear: hYear + 1, hMonth: 1 };
  }
  return { hYear, hMonth: hMonth + 1 };
}
