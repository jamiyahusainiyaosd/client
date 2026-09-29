import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, User, MapPin, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import classRoutineService from "../services/classRoutine.services";
import Loader from "../../../components/Loader";

const ClassRoutineTimeline = ({ activeDept = "", viewMode = "routine" }) => {
  // Fetch departments to identify the active department's title
  const { data: apiDepts } = useQuery({
    queryKey: ["classDepartments"],
    queryFn: () => classRoutineService.getAllDepartments(),
    staleTime: 1000 * 60 * 5,
  });

  // Dynamic 24-hr Sunnah Schedule from API for selected department
  const {
    data: apiDailySchedules,
    isLoading: isDailyLoading,
    isError: isDailyError,
    refetch: refetchDaily,
  } = useQuery({
    queryKey: ["dailySchedules", activeDept],
    queryFn: () => classRoutineService.getAllDailySchedules(activeDept),
    staleTime: 1000 * 60 * 5,
  });

  const dailyTimeline = useMemo(() => {
    const raw = Array.isArray(apiDailySchedules)
      ? apiDailySchedules
      : apiDailySchedules?.results || [];

    if (raw.length === 0) return [];

    // Check if items contain department fields (department, dept, dept_id, etc.)
    const hasDeptField = raw.some(
      (item) =>
        item.department !== undefined ||
        item.dept !== undefined ||
        item.department_id !== undefined ||
        item.dept_id !== undefined
    );

    let list = raw;
    if (hasDeptField && activeDept) {
      const filtered = raw.filter((item) => {
        const d =
          item.department?.id ??
          item.department?.dept_id ??
          item.department ??
          item.dept ??
          item.department_id ??
          item.dept_id;

        if (d === null || d === undefined || d === "" || d === "all") return true;
        return String(d) === String(activeDept);
      });
      if (filtered.length > 0) {
        list = filtered;
      }
    }

    return list.map((item) => ({
      id: item.id,
      time: item.time_slot || item.time,
      title: item.title,
      desc: item.description || item.desc,
      badge: item.badge || item.category || item.activity_type,
    }));
  }, [apiDailySchedules, activeDept]);

  // Dynamic Jamats from API metadata
  const { data: routineMeta } = useQuery({
    queryKey: ["classRoutineMeta"],
    queryFn: () => classRoutineService.getRoutineMeta(),
    staleTime: 1000 * 60 * 5,
  });

  const currentJamats = useMemo(() => {
    const dynamicMap = routineMeta?.jamats_by_dept || {};
    if (dynamicMap[activeDept] && Array.isArray(dynamicMap[activeDept])) {
      return dynamicMap[activeDept].map((j) => ({
        id: j.id || j.jamat_id,
        name: j.name || j.jamat_name || j.title,
      }));
    }
    return [];
  }, [routineMeta, activeDept]);

  const [activeJamat, setActiveJamat] = useState("");

  // When active department or currentJamats change, reset active jamat
  useEffect(() => {
    if (currentJamats.length > 0) {
      const match = currentJamats.find((j) => String(j.id) === String(activeJamat));
      if (!match) {
        setActiveJamat(currentJamats[0].id);
      }
    } else {
      setActiveJamat("");
    }
  }, [currentJamats, activeJamat]);

  // Horizontal scroll controls for jamat pills
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  }, []);

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [checkScroll, currentJamats]);

  const handleScrollBy = (distance) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: distance, behavior: "smooth" });
      setTimeout(checkScroll, 200);
    }
  };

  const handleWheel = (e) => {
    if (scrollContainerRef.current && e.deltaY !== 0) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
      checkScroll();
    }
  };

  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftPos(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftPos - walk;
    checkScroll();
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  // Fetch dynamic routine from DRF API
  const {
    data: apiRoutines,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["classRoutines", activeDept, activeJamat],
    queryFn: () => classRoutineService.getAllClassRoutines(activeDept, activeJamat),
    enabled: Boolean(activeDept && activeJamat),
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

  const activeDeptObj = useMemo(() => {
    const list = Array.isArray(apiDepts)
      ? apiDepts
      : apiDepts?.results || routineMeta?.departments || [];
    return list.find((d) => String(d.id || d.dept_id || d.code) === String(activeDept));
  }, [apiDepts, routineMeta, activeDept]);

  const activeJamatObj = currentJamats.find((j) => String(j.id) === String(activeJamat)) || currentJamats[0];

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* PRINT-ONLY OFFICIAL 1-PAGE DOCUMENT                                       */}
      {/* ========================================================================= */}
      <div className="print-only">
        <div className="border-b-2 border-emerald-900 pb-2 mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-emerald-950">জামিয়া হুসাইনিয়া মাদরাসা</h1>
            <p className="text-[11px] text-slate-600">শায়েস্তাগঞ্জ, হবিগঞ্জ • শিক্ষা ও পাঠদান দফতর</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-800 text-emerald-900 bg-emerald-50">
              {viewMode === "timeline" ? "২৪ ঘণ্টার সুন্নতি রুটিন" : "শ্রেণি পাঠদান রুটিন"}
            </span>
            <p className="text-[9px] text-slate-500 mt-0.5">
              বিভাগ: {activeDeptObj?.name || "কিতাব বিভাগ"} {viewMode === "routine" && `• জামাত: ${activeJamatObj?.name || ""}`}
            </p>
          </div>
        </div>

        {viewMode === "timeline" ? (
          dailyTimeline.length > 0 ? (
            <table className="w-full print-table text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[8.5pt]">
                  <th className="py-1 px-2 w-28">সময়সূচি</th>
                  <th className="py-1 px-2">আমল ও কর্মসূচি</th>
                  <th className="py-1 px-3">বিস্তারিত বিবরণ</th>
                  <th className="py-1 px-2 text-center w-24">বিভাগ / ধরন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 text-[8pt]">
                {dailyTimeline.map((item, idx) => (
                  <tr key={item.id || idx} className="print-avoid-break">
                    <td className="py-1 px-2 whitespace-nowrap font-bold text-emerald-900 font-mono">
                      {item.time}
                    </td>
                    <td className="py-1 px-2 font-bold text-slate-900">
                      {item.title}
                    </td>
                    <td className="py-1 px-3 text-slate-700">
                      {item.desc || "—"}
                    </td>
                    <td className="py-1 px-2 text-center">
                      <span className="inline-block px-1.5 py-0.2 rounded text-[7.5pt] bg-slate-100 border border-slate-300">
                        {item.badge || "দৈনিক আমল"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">কোনো সময়সূচি নেই</div>
          )
        ) : (
          currentJamatSchedule.length > 0 ? (
            <table className="w-full print-table text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[8.5pt]">
                  <th className="py-1 px-2 w-24">পিরিয়ড</th>
                  <th className="py-1 px-2 w-28">সময়</th>
                  <th className="py-1 px-3">বিষয় / কিতাবের নাম</th>
                  <th className="py-1 px-3">পাঠদানকারী ওস্তাদ</th>
                  <th className="py-1 px-2 text-center w-20">কক্ষ নম্বর</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 text-[8pt]">
                {currentJamatSchedule.map((row) => (
                  <tr key={row.id} className="print-avoid-break">
                    <td className="py-1 px-2 font-semibold">
                      {row.period}
                    </td>
                    <td className="py-1 px-2 whitespace-nowrap font-mono text-emerald-900">
                      {row.time}
                    </td>
                    <td className="py-1 px-3 font-bold text-slate-900">
                      {row.subject}
                    </td>
                    <td className="py-1 px-3 text-slate-700">
                      {row.teacher}
                    </td>
                    <td className="py-1 px-2 text-center font-mono">
                      {row.room}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">কোনো ক্লাস রুটিন নেই</div>
          )
        )}

        {/* Official Signatures */}
        <div className="mt-4 pt-3 border-t border-slate-300 flex justify-between items-end text-[8.5pt] text-slate-700 print-avoid-break">
          <div className="text-center flex flex-col items-center">
            <div className="h-10"></div>
            <div className="w-32 border-t border-slate-500 mb-1"></div>
            <p className="font-semibold text-slate-800">নাজেমে তালিমাত</p>
            <p className="text-[7.5pt] text-slate-500">শিক্ষা সচিব</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="h-10 flex items-end justify-center mb-0.5">
              <img
                src="/signature_transparent.webp"
                alt="মুহতামিমের স্বাক্ষর"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="w-32 border-t border-slate-500 mb-1"></div>
            <p className="font-bold text-slate-900">মুহতামিম</p>
            <p className="text-[7.5pt] text-slate-500">জামিয়া হুসাইনিয়া মাদরাসা</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCREEN-ONLY INTERACTIVE UI                                                */}
      {/* ========================================================================= */}
      <div className="screen-only space-y-6">
        {/* If viewMode is "timeline", render the full 24-hour Sunnah Daily Schedule */}
        {viewMode === "timeline" ? (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                প্রাত্যহিক আমল ও সময়সারণী
              </span>
              <h2 className="text-base sm:text-lg font-bold text-emerald-950 mt-1">
                {activeDeptObj?.name ? `${activeDeptObj.name} — ২৪ ঘণ্টার সুন্নতি দৈনিক রুটিন` : "মাদরাসার ২৪ ঘণ্টার সুন্নতি দৈনিক রুটিন"}
              </h2>
              <p className="text-xs text-emerald-800 mt-0.5">
                {activeDeptObj?.name
                  ? `${activeDeptObj.name}-এর তালিবুল ইলমদের জন্য প্রাত্যহিক আমল, পাঠ ও সুন্নতি জীবনযাত্রার সময়সূচি।`
                  : "ফজরের পূর্ব হতে নিশীথ নিদ্রা পর্যন্ত একজন তালিবুল ইলমের প্রাত্যহিক সময়সূচি।"}
              </p>
            </div>
            <Clock className="w-8 h-8 text-emerald-700 shrink-0 opacity-80" />
          </div>

          {isDailyLoading ? (
            <div className="py-12 flex justify-center items-center">
              <Loader />
            </div>
          ) : isDailyError ? (
            <div className="p-8 text-center bg-rose-50/50 rounded-2xl border border-rose-100">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-2 opacity-80" />
              <h3 className="text-base font-bold text-slate-800">রুটিন লোড করতে সমস্যা হয়েছে</h3>
              <p className="text-xs text-slate-600 mt-1">অনুগ্রহ করে পুনরায় চেষ্টা করুন।</p>
              <button
                type="button"
                onClick={() => refetchDaily()}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                পুনরায় চেষ্টা করুন
              </button>
            </div>
          ) : dailyTimeline.length === 0 ? (
            <div className="p-8 sm:p-12 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
              <Clock className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-70" />
              <h3 className="text-base font-bold text-slate-700">কোনো ২৪ ঘণ্টার রুটিন পাওয়া যায়নি</h3>
              <p className="text-xs text-slate-500 mt-1">
                {activeDeptObj?.name ? `${activeDeptObj.name}-এর জন্য এখনো কোনো সময়সূচি যুক্ত করা হয়নি।` : "এই বিভাগের জন্য কোনো সময়সূচি পাওয়া যায়নি।"}
              </p>
            </div>
          ) : (
            <div className="relative border-l-2 border-emerald-200 ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-4 sm:space-y-6 pt-2">
              {dailyTimeline.map((item, idx) => (
                <div key={item.id || idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-3 border-primary shadow-xs group-hover:scale-125 transition-transform" />

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#f1f3ff] border border-slate-200/80 shadow-xs hover:border-primary/40 hover:shadow-sm transition-all space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-md border border-emerald-200/80 font-mono shadow-2xs">
                        {item.time}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-semibold text-slate-600 bg-white border border-slate-200/70 px-2 py-0.5 rounded shadow-2xs">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-main">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* If viewMode is "routine", render Period-by-Period Routine for Selected Jamat */
        <div className="space-y-6">
          {/* Jamat Switcher Pills Slider with Scroll Buttons & Drag */}
          {currentJamats.length > 0 && (
            <div className="relative w-full flex items-center">
              {/* Left Arrow Button */}
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={() => handleScrollBy(-220)}
                  aria-label="Scroll left"
                  className="absolute -left-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-primary hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
              )}

              {/* Scrollable Pills Container */}
              <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                className={`flex items-center gap-2 overflow-x-auto pb-1.5 scroll-smooth w-full select-none ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#cbd5e1 transparent",
                }}
              >
                {currentJamats.map((jamat) => {
                  const isActive = String(activeJamat) === String(jamat.id);
                  return (
                    <button
                      key={jamat.id}
                      type="button"
                      onClick={() => setActiveJamat(jamat.id)}
                      className={`shrink-0 px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-primary text-white shadow-xs font-bold"
                          : "bg-[#f1f3ff] text-slate-700 hover:text-main border border-slate-200/80 hover:bg-slate-200/70"
                      }`}
                    >
                      {jamat.name}
                    </button>
                  );
                })}
              </div>

              {/* Right Arrow Button */}
              {canScrollRight && (
                <button
                  type="button"
                  onClick={() => handleScrollBy(220)}
                  aria-label="Scroll right"
                  className="absolute -right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-primary hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              )}
            </div>
          )}

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
                          : "bg-[#f1f3ff] border-slate-200/80 hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            isBreak
                              ? "bg-amber-200 text-amber-950"
                              : "bg-white text-primary border border-slate-200/80 shadow-2xs"
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
                        <div className="pt-2 flex flex-col gap-1 text-xs border-t border-slate-200/70 text-slate-600">
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
            <div className="p-8 text-center bg-[#f1f3ff] rounded-2xl border border-slate-200/80 shadow-xs">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">
                কোনো ক্লাস রুটিন পাওয়া যায়নি
              </p>
            </div>
          )}
        </div>
      )}

        {/* Routine Note */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#f1f3ff] border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600 shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-800">রুটিন পালন সংক্রান্ত নির্দেশনা:</strong>{" "}
            সকল ছাত্রকে পিরিয়ড শুরুর অন্তত ২ মিনিট পূর্বে কিতাব ও খাতা প্রস্তুত করে
            শ্রেণিকক্ষে আসন গ্রহণ করতে হবে। বিনা অনুমতিতে কোনো পিরিয়ডে অনুপস্থিতি
            শাস্তিযোগ্য অপরাধ বলে গণ্য হবে।
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassRoutineTimeline;
