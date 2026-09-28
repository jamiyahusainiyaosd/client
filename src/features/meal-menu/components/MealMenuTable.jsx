import React, { useState } from "react";
import {
  Utensils,
  Sunrise,
  Sun,
  Moon,
  Info,
  Sparkles,
  Search,
  CheckCircle,
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
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="space-y-6">
      {/* Table Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-main">
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

        {/* Filter / Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Day Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setSelectedDay("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDay === "all"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              সব দিন
            </button>
            {mealMenus.map((m) => (
              <button
                key={m.id || m.day_key}
                onClick={() => setSelectedDay(m.day_key)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedDay === m.day_key
                    ? "bg-primary text-white shadow-sm"
                    : m.day_key === todayKey
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {m.day_name}
                {m.day_key === todayKey && (
                  <span className="ml-1 w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-900 text-white text-xs sm:text-sm">
                <th className="py-3.5 px-4 sm:px-6 font-bold w-36 sm:w-44 text-emerald-300">
                  <div className="flex items-center gap-2">
                    <span>বার</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 sm:px-6 font-bold text-amber-300">
                  <div className="flex items-center gap-2">
                    <Sunrise className="w-4 h-4 text-amber-400" />
                    <span>সকাল (নাস্তা)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 sm:px-6 font-bold text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-emerald-400" />
                    <span>দুপুর (আহার)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 sm:px-6 font-bold text-sky-300">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-sky-400" />
                    <span>রাত (নৈশভোজ)</span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredMenus.map((row, index) => {
                const isToday = row.day_key === todayKey;
                return (
                  <tr
                    key={row.id || row.day_key}
                    className={`transition-colors ${
                      isToday
                        ? "bg-emerald-50/70 font-medium hover:bg-emerald-50"
                        : index % 2 === 0
                        ? "bg-white hover:bg-slate-50/80"
                        : "bg-slate-50/40 hover:bg-slate-50/80"
                    }`}
                  >
                    {/* Day Column */}
                    <td className="py-4 px-4 sm:px-6 align-top">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-sm sm:text-base ${
                            isToday ? "text-primary" : "text-slate-900"
                          }`}
                        >
                          {row.day_name}
                        </span>
                        {isToday && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white">
                            আজ
                          </span>
                        )}
                      </div>
                      {row.day_key === "fri" && (
                        <span className="inline-block mt-1 text-[10px] text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded font-semibold">
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
