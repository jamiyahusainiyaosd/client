import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, User, MapPin, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import classRoutineService from "../services/classRoutine.services";
import Loader from "../../../components/Loader";

const DEFAULT_DEPT_JAMATS = {
  kitab: [
    { id: "meshkat", name: "ফযিলত ২য় বর্ষ (মেশকাত)" },
    { id: "jalalain", name: "ফযিলত ১ম বর্ষ (জালালাইন)" },
    { id: "jami", name: "সানাবিয়্যাতুল উলইয়া (শরহে জামি)" },
    { id: "kafia", name: "সানাবিয়্যাহ আম্মাহ (কাফিয়া)" },
    { id: "nahbemir", name: "মুতাওয়াসসিতাহ ২য় বর্ষ (নাহবেমির)" },
  ],
  hifz: [{ id: "tahfiz", name: "তাহফিজুল কোরআন (হিফজ বিভাগ)" }],
  noorani: [{ id: "noorani3", name: "নূরানী ৩য় বর্ষ (আস-সালিস)" }],
};

const ClassRoutineTimeline = ({ activeDept = "kitab", viewMode = "routine" }) => {
  // Dynamic 24-hr Sunnah Schedule from API
  const { data: apiDailySchedules } = useQuery({
    queryKey: ["dailySchedules"],
    queryFn: () => classRoutineService.getAllDailySchedules(),
    staleTime: 1000 * 60 * 5,
  });

  const dailyTimeline = useMemo(() => {
    const raw = Array.isArray(apiDailySchedules) ? apiDailySchedules : apiDailySchedules?.results || [];
    if (raw.length > 0) {
      return raw.map((item) => ({
        time: item.time_slot,
        title: item.title,
        desc: item.description,
        badge: item.badge,
      }));
    }
    return [];
  }, [apiDailySchedules]);

  // Dynamic Jamats from API metadata
  const { data: routineMeta } = useQuery({
    queryKey: ["classRoutineMeta"],
    queryFn: () => classRoutineService.getRoutineMeta(),
    staleTime: 1000 * 60 * 5,
  });

  const currentJamats = useMemo(() => {
    const dynamicMap = routineMeta?.jamats_by_dept || {};
    if (dynamicMap[activeDept] && dynamicMap[activeDept].length > 0) {
      return dynamicMap[activeDept];
    }
    return DEFAULT_DEPT_JAMATS[activeDept] || DEFAULT_DEPT_JAMATS.kitab;
  }, [routineMeta, activeDept]);

  const [activeJamat, setActiveJamat] = useState(currentJamats[0]?.id || "meshkat");

  // When active department or currentJamats change, reset active jamat
  useEffect(() => {
    if (currentJamats.length > 0 && !currentJamats.some((j) => j.id === activeJamat)) {
      setActiveJamat(currentJamats[0].id);
    }
  }, [activeDept, currentJamats, activeJamat]);

  // Fetch dynamic routine from DRF API
  const {
    data: apiRoutines,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["classRoutines", activeDept, activeJamat],
    queryFn: () => classRoutineService.getAllClassRoutines(activeDept, activeJamat),
    staleTime: 1000 * 60 * 5,
  });

  // Extract schedule items dynamically from DRF API
  const currentJamatSchedule = useMemo(() => {
    const rawList = Array.isArray(apiRoutines)
      ? apiRoutines
      : apiRoutines?.results || apiRoutines?.data || [];

    return rawList.map((item) => ({
      id: item.id,
      period: item.period,
      time: item.time_slot,
      subject: item.subject,
      teacher: item.teacher || "—",
      room: item.room || "—",
      isBreak: item.is_break || item.period?.includes("বিরতি"),
    }));
  }, [apiRoutines]);

  const activeJamatObj = currentJamats.find((j) => j.id === activeJamat) || currentJamats[0];

  return (
    <div className="space-y-6">
      {/* If viewMode is "timeline", render the full 24-hour Sunnah Daily Schedule */}
      {viewMode === "timeline" ? (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                প্রাত্যহিক আমল ও সময়সারণী
              </span>
              <h2 className="text-base sm:text-lg font-bold text-emerald-950 mt-1">
                মাদরাসার ২৪ ঘণ্টার সুন্নতি দৈনিক রুটিন
              </h2>
              <p className="text-xs text-emerald-800 mt-0.5">
                ফজরের পূর্ব হতে নিশীথ নিদ্রা পর্যন্ত একজন তালিবুল ইলমের প্রাত্যহিক সময়সূচি।
              </p>
            </div>
            <Clock className="w-8 h-8 text-emerald-700 shrink-0 opacity-80" />
          </div>

          <div className="relative border-l-2 border-emerald-200 ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-4 sm:space-y-6 pt-2">
            {dailyTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-3 border-primary shadow-xs group-hover:scale-125 transition-transform" />

                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-primary/40 hover:shadow-sm transition-all space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60 font-mono">
                      {item.time}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-main">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* If viewMode is "routine", render Period-by-Period Routine for Selected Jamat */
        <div className="space-y-6">
          {/* Jamat Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
            {currentJamats.map((jamat) => {
              const isActive = activeJamat === jamat.id;
              return (
                <button
                  key={jamat.id}
                  type="button"
                  onClick={() => setActiveJamat(jamat.id)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "bg-[#f1f3ff] text-slate-700 hover:bg-slate-200/70"
                  }`}
                >
                  {jamat.name}
                </button>
              );
            })}
          </div>

          {/* Jamat Title Banner */}
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-main">
                {activeJamatObj?.name} — পিরিয়ড ও পাঠদান সূচি
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                সকাল ৮:০০ হতে প্রাতিষ্ঠানিক ঘণ্টাওয়ারি ক্লাস ও উস্তাদদের দায়িত্ব
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 hidden sm:inline-block">
              {currentJamatSchedule.length}টি অধিবেশন
            </span>
          </div>

          {/* Error state with retry */}
          {isError && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>সার্ভার থেকে সরাসরি ক্লাস রুটিন লোড হতে বিঘ্ন ঘটেছে।</span>
              </div>
              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-3 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                পুনরায় চেষ্টা
              </button>
            </div>
          )}

          {/* Loading or Content */}
          {isLoading ? (
            <Loader />
          ) : currentJamatSchedule.length > 0 ? (
            <>
              {/* DESKTOP TABLE VIEW (hidden on mobile, visible on md and up) */}
              <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200/80 shadow-xs bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-emerald-900 text-white text-xs font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4 text-center w-24">ঘণ্টা</th>
                      <th className="py-3.5 px-4">সময়কাল</th>
                      <th className="py-3.5 px-5">বিষয় / কিতাবের নাম</th>
                      <th className="py-3.5 px-5">পাঠদানকারী সম্মানিত উস্তাদ</th>
                      <th className="py-3.5 px-4">কক্ষ / হল</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {currentJamatSchedule.map((row, idx) => {
                      const isBreak = row.isBreak || row.period?.includes("বিরতি");
                      return (
                        <tr
                          key={row.id || idx}
                          className={`transition-colors duration-150 ${
                            isBreak
                              ? "bg-amber-50/60 text-amber-900 font-semibold"
                              : idx % 2 === 0
                              ? "bg-white hover:bg-emerald-50/40"
                              : "bg-slate-50/60 hover:bg-emerald-50/40"
                          }`}
                        >
                          <td className="py-3.5 px-4 text-center font-bold text-slate-700 whitespace-nowrap">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-md text-xs ${
                                isBreak
                                  ? "bg-amber-100 text-amber-900 font-bold"
                                  : "bg-[#f1f3ff] text-primary"
                              }`}
                            >
                              {row.period}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-medium text-slate-700 whitespace-nowrap">
                            {row.time}
                          </td>
                          <td className="py-3.5 px-5">
                            <p className="font-bold text-main">{row.subject}</p>
                          </td>
                          <td className="py-3.5 px-5 text-slate-800">
                            {row.teacher && row.teacher !== "—" ? (
                              <div className="flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="font-medium">{row.teacher}</span>
                              </div>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                            <div className="flex items-center gap-1 text-slate-600">
                              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{row.room}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARD VIEW (optimized for iPhone X 375px screens) */}
              <div className="md:hidden space-y-3">
                {currentJamatSchedule.map((row, idx) => {
                  const isBreak = row.isBreak || row.period?.includes("বিরতি");
                  return (
                    <div
                      key={row.id || idx}
                      className={`p-4 rounded-2xl border shadow-xs space-y-2 ${
                        isBreak
                          ? "bg-amber-50/70 border-amber-200"
                          : "bg-white border-slate-200/80"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            isBreak
                              ? "bg-amber-200 text-amber-950"
                              : "bg-[#f1f3ff] text-primary"
                          }`}
                        >
                          {row.period}
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-600">
                          {row.time}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-main leading-snug">
                        {row.subject}
                      </h3>

                      {row.teacher && row.teacher !== "—" && (
                        <div className="pt-1 flex flex-col gap-1 text-xs border-t border-slate-100 text-slate-600">
                          <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                            <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{row.teacher}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>কক্ষ: {row.room}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">
                কোনো ক্লাস রুটিন পাওয়া যায়নি
              </p>
            </div>
          )}
        </div>
      )}

      {/* Routine Note */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">রুটিন পালন সংক্রান্ত নির্দেশনা:</strong>{" "}
          সকল ছাত্রকে পিরিয়ড শুরুর অন্তত ২ মিনিট পূর্বে কিতাব ও খাতা প্রস্তুত করে
          শ্রেণিকক্ষে আসন গ্রহণ করতে হবে। বিনা অনুমতিতে কোনো পিরিয়ডে অনুপস্থিতি
          শাস্তিযোগ্য অপরাধ বলে গণ্য হবে।
        </p>
      </div>
    </div>
  );
};

export default ClassRoutineTimeline;
