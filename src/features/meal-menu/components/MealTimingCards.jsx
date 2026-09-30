import React from "react";
import { Coffee, Utensils, MoonStar, Clock, Sparkles } from "lucide-react";

const getIcon = (iconName, index) => {
  if (index === 0 || iconName === "free_breakfast" || iconName?.includes("breakfast")) {
    return <Coffee className="w-5 h-5 text-amber-600" />;
  }
  if (index === 1 || iconName === "lunch_dining" || iconName?.includes("lunch")) {
    return <Utensils className="w-5 h-5 text-emerald-600" />;
  }
  return <MoonStar className="w-5 h-5 text-emerald-600" />;
};

const getBadgeStyle = (index) => {
  if (index === 0) return "bg-amber-50 text-amber-700 border-amber-200/80";
  if (index === 1) return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
  return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
};

const MealTimingCards = ({ timings = [] }) => {
  if (!timings || timings.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-main">
            খাবার পরিবেশন সময়সূচি
          </h2>
          <p className="text-xs text-slate-500">
            আবাসিক ডাইনিং হলে সুশৃঙ্খলভাবে ৩ বেলা খাবার বিতরণের সময়
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {timings.map((t, idx) => (
          <div
            key={t.id || idx}
            className="group relative rounded-2xl bg-[#f1f3ff] border border-slate-200/80 p-5 shadow-xs hover:shadow-sm hover:border-primary/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {getIcon(t.icon, idx)}
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white border ${getBadgeStyle(idx)} shadow-2xs`}>
                  <Clock className="w-3.5 h-3.5" />
                  {t.time_slot}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                {t.meal_type}
              </h3>

              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                {t.details || "নির্ধারিত সময়ে ডাইনিং হলে উপস্থিত হয়ে খাবার গ্রহণ আবশ্যক।"}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
              <span>পর্ব ০{idx + 1}</span>
              <span className="text-emerald-700 font-medium">আবাসিক ডাইনিং হল</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealTimingCards;
