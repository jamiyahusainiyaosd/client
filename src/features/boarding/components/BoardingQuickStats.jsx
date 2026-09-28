import React from "react";
import { useQuery } from "@tanstack/react-query";
import boardingService from "../services/boarding.services";

const toBengaliNumber = (num) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[Number(d)]);
};

const BoardingQuickStats = () => {
  const { data: apiRules } = useQuery({
    queryKey: ["boardingRules", "all"],
    queryFn: () => boardingService.getAllRules("all"),
    staleTime: 1000 * 60 * 5,
  });

  const totalRules = Array.isArray(apiRules)
    ? apiRules.length
    : apiRules?.results?.length || 26;

  const categoryCount = React.useMemo(() => {
    const list = Array.isArray(apiRules) ? apiRules : apiRules?.results || [];
    const cats = new Set(list.map((r) => r.category).filter(Boolean));
    return cats.size || 5;
  }, [apiRules]);

  const stats = [
    {
      number: `${toBengaliNumber(totalRules)}+`,
      label: "মোট আবাসিক নীতিমালা",
      desc: "কর্তৃপক্ষ কর্তৃক জারিকৃত সক্রিয় বিধিমালা",
      icon: "verified_user",
    },
    {
      number: `${toBengaliNumber(categoryCount)}টি`,
      label: "শৃঙ্খলা বিভাগ",
      desc: "সাধারণ, মেস, নামাজ, ছুটি ও বিশেষ নিষেধ",
      icon: "category",
    },
    {
      number: "২৪ ঘণ্টা",
      label: "সুন্নতি অনুশাসন",
      desc: "তাকবীরে উলা ও নৈশ তাকরারের পাবন্দি",
      icon: "schedule",
    },
    {
      number: "১০০%",
      label: "নিরাপদ পরিবেশ",
      desc: "পরিপূর্ণ সিসিটিভি ও নিগরান তত্ত্বাবধান",
      icon: "shield",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-primary/40 hover:shadow-sm transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[22px]">{stat.icon}</span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-main tracking-tight">
            {stat.number}
          </p>
          <h4 className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
            {stat.label}
          </h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
            {stat.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BoardingQuickStats;
