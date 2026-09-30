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
    <div className="relative overflow-hidden rounded-2xl bg-[#f1f3ff] text-slate-900 p-5 sm:p-7 shadow-xs border border-slate-200/80">
      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200/80 text-slate-800 shadow-2xs">
            <Calendar className="w-5 h-5 text-slate-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">আজকের খাবার মেনু</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-800 border border-slate-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                লাইভ আপডেট
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
              {todayMenu.day_name} — পরিবেশন তালিকা
            </h3>
          </div>
        </div>

        {todayMenu.special_note && (
          <div className="text-xs text-slate-700 bg-white border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-2xs max-w-sm">
            <Sparkles className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
            {todayMenu.special_note}
          </div>
        )}
      </div>

      {/* 3 Meal Columns */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {/* Breakfast */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold mb-2">
            <Sunrise className="w-4 h-4 text-amber-600" />
            <span>সকালের নাস্তা</span>
          </div>
          <p className="text-sm font-bold text-slate-900 leading-snug">
            {todayMenu.breakfast}
          </p>
          <span className="inline-block mt-2 text-[11px] text-slate-500 font-medium">
            সময়: সকাল ৭:৩০ – ৮:০০
          </span>
        </div>

        {/* Lunch */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold mb-2">
            <Sun className="w-4 h-4 text-amber-600" />
            <span>দুপুরের আহার (প্রধান)</span>
          </div>
          <p className="text-sm font-bold text-slate-950 leading-snug">
            {todayMenu.lunch}
          </p>
          <span className="inline-block mt-2 text-[11px] text-slate-500 font-medium">
            সময়: দুপুর ১:১৫ – ২:০০
          </span>
        </div>

        {/* Dinner */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center gap-2 text-slate-700 text-xs font-bold mb-2">
            <Moon className="w-4 h-4 text-slate-600" />
            <span>রাতের খাবার</span>
          </div>
          <p className="text-sm font-bold text-slate-900 leading-snug">
            {todayMenu.dinner}
          </p>
          <span className="inline-block mt-2 text-[11px] text-slate-500 font-medium">
            সময়: রাত ৮:৪৫ – ৯:৩০
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodayMealHighlight;
