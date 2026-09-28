import React from "react";
import { Sunrise, Sun, Moon, Calendar, Sparkles } from "lucide-react";

const getTodayKey = () => {
  const dayIndex = new Date().getDay(); // 0 is Sunday, 6 is Saturday
  const map = {
    0: "sun",
    1: "mon",
    2: "tue",
    3: "wed",
    4: "thu",
    5: "fri",
    6: "sat",
  };
  return map[dayIndex] || "sat";
};

const TodayMealHighlight = ({ mealMenus = [] }) => {
  const todayKey = getTodayKey();
  const todayMenu = mealMenus.find((m) => m.day_key === todayKey) || mealMenus[0];

  if (!todayMenu) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-5 sm:p-7 shadow-xl shadow-emerald-950/10 border border-emerald-700/30">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-emerald-300">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">আজকের খাবার মেনু</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                লাইভ আপডেট
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {todayMenu.day_name} — পরিবেশন তালিকা
            </h3>
          </div>
        </div>

        {todayMenu.special_note && (
          <div className="text-xs text-emerald-200/90 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg max-w-sm">
            <Sparkles className="w-3.5 h-3.5 inline mr-1 text-emerald-300" />
            {todayMenu.special_note}
          </div>
        )}
      </div>

      {/* 3 Meal Columns */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {/* Breakfast */}
        <div className="p-4 rounded-xl bg-white/[0.07] border border-white/10 backdrop-blur-sm hover:bg-white/[0.1] transition-all">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-2">
            <Sunrise className="w-4 h-4" />
            <span>সকালের নাস্তা</span>
          </div>
          <p className="text-sm font-semibold text-white leading-snug">
            {todayMenu.breakfast}
          </p>
          <span className="inline-block mt-2 text-[11px] text-slate-300">
            সময়: সকাল ৭:৩০ – ৮:০০
          </span>
        </div>

        {/* Lunch */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-sm hover:bg-emerald-500/15 transition-all">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold mb-2">
            <Sun className="w-4 h-4" />
            <span>দুপুরের আহার (প্রধান)</span>
          </div>
          <p className="text-sm font-bold text-white leading-snug">
            {todayMenu.lunch}
          </p>
          <span className="inline-block mt-2 text-[11px] text-emerald-200/80">
            সময়: দুপুর ১:১৫ – ২:০০
          </span>
        </div>

        {/* Dinner */}
        <div className="p-4 rounded-xl bg-white/[0.07] border border-white/10 backdrop-blur-sm hover:bg-white/[0.1] transition-all">
          <div className="flex items-center gap-2 text-sky-300 text-xs font-semibold mb-2">
            <Moon className="w-4 h-4" />
            <span>রাতের খাবার</span>
          </div>
          <p className="text-sm font-semibold text-white leading-snug">
            {todayMenu.dinner}
          </p>
          <span className="inline-block mt-2 text-[11px] text-slate-300">
            সময়: রাত ৮:৪৫ – ৯:৩০
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodayMealHighlight;
