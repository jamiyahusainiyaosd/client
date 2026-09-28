import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Printer, Clock, BookOpen } from "lucide-react";
import classRoutineService from "../services/classRoutine.services";

const ClassRoutineHero = ({
  activeDept,
  onSelectDept,
  viewMode,
  onSelectViewMode,
}) => {
  const { data: apiDepts } = useQuery({
    queryKey: ["classDepartments"],
    queryFn: () => classRoutineService.getAllDepartments(),
    staleTime: 1000 * 60 * 5,
  });

  const departments = useMemo(() => {
    const raw = Array.isArray(apiDepts) ? apiDepts : apiDepts?.results || [];
    if (raw.length > 0) {
      return raw.map((d) => ({
        id: d.dept_id,
        name: d.name,
        desc: d.desc,
        icon: d.icon,
      }));
    }
    return [
      {
        id: "kitab",
        name: "কিতাব বিভাগ (ফযিলত ও সানাবিয়্যাহ)",
        desc: "ইবতেদাইয়্যাহ হতে ফযিলত (মেশকাত) পর্যন্ত",
        icon: "menu_book",
      },
      {
        id: "hifz",
        name: "হিফজুল কুরআন একাডেমি",
        desc: "নাজেরা ও তাহফিজুল কোরআন বিভাগ",
        icon: "auto_stories",
      },
      {
        id: "noorani",
        name: "নূরানী ও মক্তব শাখা",
        desc: "আর-রাওদাহ শিশু হতে ৩য় বর্ষ",
        icon: "school",
      },
    ];
  }, [apiDepts]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="w-full bg-[#f1f3ff] border-b border-slate-200/60 pt-6 sm:pt-10 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with Breadcrumb & Print button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-primary text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            শিক্ষাক্রম ও প্রাত্যহিক পাঠ পরিকল্পনা
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="inline-flex rounded-xl bg-white border border-slate-200/80 p-0.5 shadow-xs text-xs font-semibold">
              <button
                type="button"
                onClick={() => onSelectViewMode("routine")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "routine"
                    ? "bg-primary text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>ক্লাস রুটিন</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectViewMode("timeline")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "timeline"
                    ? "bg-primary text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>২৪ ঘণ্টা রুটিন</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-primary hover:border-primary/40 hover:bg-slate-50 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">রুটিন প্রিন্ট</span>
            </button>
          </div>
        </div>

        {/* Heading & Intro */}
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-main tracking-tight leading-snug">
            দৈনিক ক্লাস রুটিন ও সময়সারণী
          </h1>
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
            দরসে নিজামী (কিতাব বিভাগ), হিফজুল কুরআন এবং নূরানী শাখার দৈনিক ঘণ্টাওয়ারি
            পাঠদান, তাকরার ও ২৪ ঘণ্টার প্রাত্যহিক সুন্নতি আমলের পূর্ণাঙ্গ সূচি।
          </p>
        </div>

        {/* Department Switcher Tabs */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {departments.map((dept) => {
            const isActive = activeDept === dept.id;
            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => onSelectDept(dept.id)}
                className={`p-3 sm:p-3.5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                  isActive
                    ? "bg-white border-primary shadow-sm ring-1 ring-primary/20"
                    : "bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-[#f1f3ff] text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
                    {dept.icon}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`text-xs sm:text-sm font-bold truncate ${
                    isActive ? "text-primary" : "text-main"
                  }`}>
                    {dept.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {dept.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClassRoutineHero;
