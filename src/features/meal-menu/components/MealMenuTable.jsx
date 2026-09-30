import React, { useState } from "react";
import {
  Utensils,
  Sunrise,
  Sun,
  Moon,
  Info,
  Calendar,
  LayoutGrid,
  Table as TableIcon,
} from "lucide-react";

const getTodayKey = () => {
  const dayIndex = new Date().getDay();
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

const MealMenuTable = ({ mealMenus = [] }) => {
  const todayKey = getTodayKey();
  const [selectedDay, setSelectedDay] = useState("all");
  const [searchQuery] = useState("");
  // On mobile screen, default to card view for optimal readability
  const [mobileView, setMobileView] = useState("card"); // "card" or "table"

  const filteredMenus = mealMenus.filter((item) => {
    const matchesDay = selectedDay === "all" || item.day_key === selectedDay;
    const matchesSearch =
      !searchQuery ||
      item.day_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.breakfast?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lunch?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dinner?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Table Header & Controls */}
      <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold text-main">
                আবাসিক শিক্ষার্থীদের দৈনিক খাবার তালিকা (মেনু)
              </h2>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                সাপ্তাহিক রুটিন
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              বার অনুযায়ী সকাল, দুপুর ও রাতের নির্ধারিত পুষ্টিকর খাবার তালিকা
            </p>
          </div>

          {/* View Toggle on Mobile (Card vs Table) */}
          <div className="flex md:hidden items-center self-start sm:self-auto bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs">
            <button
              type="button"
              onClick={() => setMobileView("card")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mobileView === "card"
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>কার্ড ভিউ</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileView("table")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mobileView === "table"
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>টেবিল ভিউ</span>
            </button>
          </div>
        </div>

        {/* Day Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
          <button
            onClick={() => setSelectedDay("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              selectedDay === "all"
                ? "bg-primary text-white shadow-xs font-bold"
                : "bg-white text-slate-700 hover:text-main border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            সব দিন
          </button>
          {mealMenus.map((m) => {
            const isToday = m.day_key === todayKey;
            const isSelected = selectedDay === m.day_key;
            return (
              <button
                key={m.id || m.day_key}
                onClick={() => setSelectedDay(m.day_key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white shadow-xs font-bold"
                    : isToday
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold"
                    : "bg-white text-slate-700 hover:text-main border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                {m.day_name}
                {isToday && (
                  <span className="ml-1 px-1 py-0.2 rounded text-[10px] bg-primary text-white font-normal">
                    আজ
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MOBILE-FRIENDLY CARD VIEW (Optimal for small screens)                  */}
      {/* ========================================================================= */}
      <div
        className={`${
          mobileView === "card" ? "block md:hidden" : "hidden"
        } space-y-3.5`}
      >
        {filteredMenus.map((row) => {
          const isToday = row.day_key === todayKey;
          return (
            <div
              key={`card-${row.id || row.day_key}`}
              className={`rounded-2xl border transition-all p-4 shadow-xs ${
                isToday
                  ? "bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-300"
                  : "bg-[#f1f3ff] border-slate-200/80"
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <h3
                    className={`font-bold text-base ${
                      isToday ? "text-primary" : "text-slate-900"
                    }`}
                  >
                    {row.day_name}
                  </h3>
                  {isToday && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white">
                      আজকের দিন
                    </span>
                  )}
                </div>
                {row.day_key === "fri" && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-white border border-emerald-200 px-2 py-0.5 rounded-md shadow-2xs">
                    জুমার বিশেষ মেনু
                  </span>
                )}
              </div>

              {/* 3 Meals in Clean, Readable Rows */}
              <div className="space-y-2.5 text-xs">
                {/* Breakfast */}
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5 text-amber-700">
                    <Sunrise className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wide block mb-0.5">
                      সকালের নাস্তা
                    </span>
                    <p className="text-slate-900 font-semibold text-xs leading-relaxed">
                      {row.breakfast}
                    </p>
                  </div>
                </div>

                {/* Lunch */}
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                    <Sun className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wide block mb-0.5">
                      দুপুরের আহার (প্রধান)
                    </span>
                    <p className="text-slate-950 font-bold text-xs sm:text-sm leading-relaxed">
                      {row.lunch}
                    </p>
                  </div>
                </div>

                {/* Dinner */}
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 flex items-center justify-center shrink-0 mt-0.5 text-sky-700">
                    <Moon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-sky-900 uppercase tracking-wide block mb-0.5">
                      রাতের খাবার
                    </span>
                    <p className="text-slate-900 font-semibold text-xs leading-relaxed">
                      {row.dinner}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 2. TABLE VIEW (Desktop default, and mobile when Table View is selected)    */}
      {/* ========================================================================= */}
      <div
        className={`${
          mobileView === "table" ? "block" : "hidden md:block"
        } overflow-hidden rounded-2xl border border-slate-200/80 bg-[#f1f3ff] shadow-xs`}
      >
        {/* Mobile Horizontal Scroll Hint */}
        <div className="md:hidden bg-slate-100/90 px-3 py-1.5 text-center text-[11px] font-medium text-slate-600 border-b border-slate-200">
          👉 আঙুল দিয়ে ডানে-বামে টেনে পুরো তালিকা দেখুন
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full min-w-[650px] text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-900 text-white text-xs sm:text-sm">
                <th className="py-3.5 px-4 sm:px-6 font-bold w-36 sm:w-44 text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>বার</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 sm:px-6 font-bold w-[28%] text-amber-300">
                  <div className="flex items-center gap-2">
                    <Sunrise className="w-4 h-4 text-amber-400" />
                    <span>সকাল (নাস্তা)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 sm:px-6 font-bold w-[36%] text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-emerald-400" />
                    <span>দুপুর (আহার)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 sm:px-6 font-bold w-[28%] text-sky-300">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-sky-400" />
                    <span>রাত (নৈশভোজ)</span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200/70 text-xs sm:text-sm">
              {filteredMenus.map((row, index) => {
                const isToday = row.day_key === todayKey;
                return (
                  <tr
                    key={row.id || row.day_key}
                    className={`transition-colors ${
                      isToday
                        ? "bg-emerald-50/80 font-medium hover:bg-emerald-100/60"
                        : index % 2 === 0
                        ? "bg-white hover:bg-slate-50"
                        : "bg-[#f1f3ff] hover:bg-slate-100/70"
                    }`}
                  >
                    {/* Day Column */}
                    <td className="py-4 px-4 sm:px-6 align-top">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-sm sm:text-base whitespace-nowrap ${
                            isToday ? "text-primary" : "text-slate-900"
                          }`}
                        >
                          {row.day_name}
                        </span>
                        {isToday && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white shrink-0">
                            আজ
                          </span>
                        )}
                      </div>
                      {row.day_key === "fri" && (
                        <span className="inline-block mt-1 text-[10px] text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                          জুমার বিশেষ মেনু
                        </span>
                      )}
                    </td>

                    {/* Breakfast */}
                    <td className="py-4 px-4 sm:px-6 align-top text-slate-800">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed font-medium">
                          {row.breakfast}
                        </span>
                      </div>
                    </td>

                    {/* Lunch */}
                    <td className="py-4 px-4 sm:px-6 align-top text-slate-900">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span className="leading-relaxed font-bold text-slate-900">
                          {row.lunch}
                        </span>
                      </div>
                    </td>

                    {/* Dinner */}
                    <td className="py-4 px-4 sm:px-6 align-top text-slate-800">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed font-medium">
                          {row.dinner}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Note Footer (Directly matching Madrasah Circled Screenshot) */}
        <div className="p-4 sm:p-5 bg-emerald-50/80 border-t border-emerald-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-emerald-950">
              বি. দ্র. : প্রতি বেলা তরকারীর সাথে পর্যাপ্ত ও সুস্বাদু মুসুরীর ডাল থাকবে।
            </p>
            <p className="text-[11px] text-emerald-800/90 mt-0.5">
              বাজারের মৌসুম ও পুষ্টিমান বিবেচনায় প্রয়োজনে মেন্যুতে সামান্য পরিবর্তন হতে পারে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealMenuTable;
