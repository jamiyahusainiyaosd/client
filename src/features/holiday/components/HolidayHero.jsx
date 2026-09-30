import React, { useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Printer, CalendarDays, Sparkles } from "lucide-react";
import holidayService from "../services/holiday.services";

const toBengaliNumber = (num) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[Number(d)]);
};

const HolidayHero = ({ activeYear, onSelectYear, totalHolidays = 0 }) => {
  const { data: apiAllHolidays } = useQuery({
    queryKey: ["holidays", "allYears"],
    queryFn: () => holidayService.getAllHolidays(),
    staleTime: 1000 * 60 * 5,
  });

  const academicYears = useMemo(() => {
    const raw = Array.isArray(apiAllHolidays) ? apiAllHolidays : apiAllHolidays?.results || [];
    const yearsSet = new Set();
    raw.forEach((h) => {
      if (h.academic_year) yearsSet.add(h.academic_year);
    });
    return Array.from(yearsSet).map((yr) => ({ id: yr, label: yr }));
  }, [apiAllHolidays]);

  // Sync activeYear to the first available year from API
  useEffect(() => {
    if (academicYears.length > 0) {
      const match = academicYears.find((yr) => String(yr.id) === String(activeYear));
      if (!match && onSelectYear) {
        onSelectYear(academicYears[0].id);
      }
    }
  }, [academicYears, activeYear, onSelectYear]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="w-full bg-[#f1f3ff] border-b border-slate-200/60 pt-6 sm:pt-10 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with Session pill & Print button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              ছুটির তালিকা
            </span>
            <span className="text-secondary text-xs">•</span>
            <span className="text-secondary text-xs font-medium">শিক্ষাবর্ষ ক্যালেণ্ডার ও অবকাশ তালিকা</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Year Selector */}
            <div className="inline-flex rounded-xl bg-white border border-slate-200/80 p-0.5 shadow-xs">
              {academicYears.map((yr) => (
                <button
                  key={yr.id}
                  onClick={() => onSelectYear(yr.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeYear === yr.id
                      ? "bg-primary text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {yr.id}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-primary hover:border-primary/40 hover:bg-slate-50 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">প্রিন্ট / PDF</span>
            </button>
          </div>
        </div>

        {/* Heading & Intro */}
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.3] font-bold text-slate-900 tracking-tight leading-snug">
            বার্ষিক ছুটির তালিকা ও <span className="text-primary">শিক্ষাপঞ্জিকা</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
            জামিয়া হুসাইনিয়া মাদ্রাসার নূরানী, হিফজুল কুরআন ও কিতাব বিভাগের ২০২৫ — ২০২৬
            শিক্ষাবর্ষের (১৪৪৬-১৪৪৭ হিজরী) সকল ইসলামিক ছুটি, জাতীয় দিবস ও সাময়িক পরীক্ষা পরবর্তী অবকাশ তালিকা।
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
              <CalendarDays className="w-4 h-4 text-emerald-600 shrink-0" />
              সর্বমোট ছুটির পর্ব: <strong className="text-main font-bold">{toBengaliNumber(totalHolidays)}টি</strong>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HolidayHero;
