import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Clock,
  MapPin,
  AlertCircle,
  FileText,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import examRoutineService from "../services/examRoutine.services";
import classRoutineService from "../../classRoutine/services/classRoutine.services";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

const toBengaliNumber = (num) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[Number(d)]);
};

const ITEMS_PER_PAGE = 8;

const ExamRoutineTable = ({ activeSession = "" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;

  const [selectedJamat, setSelectedJamat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (p) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

  const handleJamatClick = (jamatId) => {
    setSelectedJamat(jamatId);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", "1");
      return next;
    });
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", "1");
      return next;
    });
  };

  // Reset page to 1 ONLY when activeSession actually changes
  const prevSessionRef = useRef(activeSession);
  useEffect(() => {
    if (prevSessionRef.current !== activeSession) {
      prevSessionRef.current = activeSession;
      setSelectedJamat("all");
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", "1");
        return next;
      });
    }
  }, [activeSession, setSearchParams]);


  // Dynamic Sessions from API to get active session details
  const { data: apiSessions } = useQuery({
    queryKey: ["examSessions"],
    queryFn: () => examRoutineService.getAllSessions(),
    staleTime: 1000 * 60 * 5,
  });

  const activeSessionObj = useMemo(() => {
    const raw = Array.isArray(apiSessions)
      ? apiSessions
      : apiSessions?.results || apiSessions?.sessions || [];
    return raw.find((s) => String(s.session_id || s.id || s.slug) === String(activeSession));
  }, [apiSessions, activeSession]);

  // Dynamic Master Jamats from routine metadata as fallback when session has no exam routines yet
  const { data: routineMeta } = useQuery({
    queryKey: ["classRoutineMeta"],
    queryFn: () => classRoutineService.getRoutineMeta(),
    staleTime: 1000 * 60 * 5,
  });

  const allMasterJamats = useMemo(() => {
    const map = routineMeta?.jamats_by_dept || {};
    const list = [];
    const seen = new Set();
    Object.values(map).forEach((group) => {
      if (Array.isArray(group)) {
        group.forEach((j) => {
          const id = j.id || j.jamat_id;
          const name = j.name || j.jamat_name || j.title;
          if (id && !seen.has(String(id))) {
            seen.add(String(id));
            list.push({ id, name });
          }
        });
      }
    });
    return list;
  }, [routineMeta]);

  // Dynamic Instructions from API
  const { data: apiInstructions } = useQuery({
    queryKey: ["examInstructions"],
    queryFn: () => examRoutineService.getAllInstructions(),
    staleTime: 1000 * 60 * 5,
  });

  const examInstructions = useMemo(() => {
    const raw = Array.isArray(apiInstructions)
      ? apiInstructions
      : apiInstructions?.results || apiInstructions?.instructions || [];
    return raw
      .map((item) =>
        typeof item === "string" ? item : item.instruction || item.text || item.title || ""
      )
      .filter(Boolean);
  }, [apiInstructions]);

  // Dynamic fetch from API based on selected session
  const {
    data: apiRoutines,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["examRoutines", activeSession],
    queryFn: () => examRoutineService.getAllExamRoutines(activeSession),
    enabled: Boolean(activeSession),
    staleTime: 1000 * 60 * 5,
  });

  // Normalize API data
  const schedules = useMemo(() => {
    const rawList = Array.isArray(apiRoutines)
      ? apiRoutines
      : apiRoutines?.results || apiRoutines?.data || [];

    return rawList.map((item) => ({
      id: item.id,
      jamatId: item.jamat_id || item.jamat?.id || item.jamat,
      jamatName: item.jamat_name || item.jamat?.name || item.jamat || "",
      date: item.date_str || item.date || item.exam_date || "",
      day: item.day_name || item.day || "",
      subject: item.subject || item.subject_name || "",
      code: item.subject_code || item.code || "",
      time: item.time_str || item.time || item.exam_time || "",
      hall: item.hall_name || item.hall || item.room || "",
      marks: item.marks || item.total_marks || "১০০",
      sessionName: item.session_name || item.session?.name || "",
      academicYear: item.academic_year || "",
    }));
  }, [apiRoutines]);

  // Dynamically extract jamats: if active session has exam routines, show those jamats;
  // otherwise, fall back to master jamats list so the category filter bar is not completely empty
  const jamats = useMemo(() => {
    if (schedules.length > 0) {
      const seen = new Set();
      const list = [];
      schedules.forEach((item) => {
        const id = item.jamatId;
        const name = item.jamatName;
        if (id && !seen.has(String(id))) {
          seen.add(String(id));
          list.push({ id, name: name || String(id) });
        }
      });
      if (list.length > 0) {
        return [{ id: "all", name: "সকল জামাত" }, ...list];
      }
    }

    if (allMasterJamats.length > 0) {
      return [{ id: "all", name: "সকল জামাত" }, ...allMasterJamats];
    }

    return [{ id: "all", name: "সকল জামাত" }];
  }, [schedules, allMasterJamats]);

  // Reset selectedJamat to "all" if current selection is not present in this session's jamats
  useEffect(() => {
    if (
      selectedJamat !== "all" &&
      !jamats.some((j) => String(j.id) === String(selectedJamat))
    ) {
      setSelectedJamat("all");
    }
  }, [jamats, selectedJamat]);

  const filteredSchedules = useMemo(() => {
    return schedules.filter((item) => {
      // If a specific jamat is selected, verify match
      if (
        selectedJamat !== "all" &&
        item.jamatId &&
        String(item.jamatId) !== String(selectedJamat)
      ) {
        return false;
      }

      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;

      return (
        item.subject?.toLowerCase().includes(q) ||
        item.code?.toLowerCase().includes(q) ||
        item.date?.toLowerCase().includes(q) ||
        item.day?.toLowerCase().includes(q) ||
        item.hall?.toLowerCase().includes(q) ||
        item.jamatName?.toLowerCase().includes(q)
      );
    });
  }, [schedules, selectedJamat, searchQuery]);

  const paginatedSchedules = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSchedules.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSchedules, currentPage]);

  const currentJamatObj = jamats.find((j) => j.id === selectedJamat);

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
  }, [checkScroll, jamats]);

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

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* PRINT-ONLY OFFICIAL 1-PAGE EXAM ROUTINE DOCUMENT                          */}
      {/* ========================================================================= */}
      <div className="print-only">
        <div className="border-b-2 border-emerald-900 pb-2 mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-emerald-950">জামিয়া হুসাইনিয়া মাদরাসা</h1>
            <p className="text-[11px] text-slate-600">শায়েস্তাগঞ্জ, হবিগঞ্জ • পরীক্ষা নিয়ন্ত্রণ দফতর</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-800 text-emerald-900 bg-emerald-50">
              {activeSessionObj?.name || "পরীক্ষার রুটিন ও সময়সূচি"}
            </span>
            <p className="text-[9px] text-slate-500 mt-0.5">
              জামাত: {selectedJamat !== "all" ? currentJamatObj?.name : "সকল জামাত"} • পৃষ্ঠা: {toBengaliNumber(currentPage)}/{toBengaliNumber(Math.ceil(filteredSchedules.length / ITEMS_PER_PAGE) || 1)} • মোট পরীক্ষা: {toBengaliNumber(filteredSchedules.length)}টি
            </p>
          </div>
        </div>

        {paginatedSchedules.length > 0 ? (
          <table className="w-full print-table text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[8.5pt]">
                <th className="py-1 px-1.5 text-center w-8">ক্র.</th>
                <th className="py-1 px-2">তারিখ ও বার</th>
                <th className="py-1 px-2">জামাত</th>
                <th className="py-1 px-2">বিষয় / কিতাব</th>
                <th className="py-1 px-1.5 text-center">কোড</th>
                <th className="py-1 px-2">সময়</th>
                <th className="py-1 px-2">হল / কক্ষ</th>
                <th className="py-1 px-1.5 text-center">পূর্ণমান</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300 text-[8pt]">
              {paginatedSchedules.map((item, idx) => (
                <tr key={item.id || idx} className="print-avoid-break">
                  <td className="py-1 px-1.5 text-center font-bold font-sans">
                    {toBengaliNumber((currentPage - 1) * ITEMS_PER_PAGE + idx + 1)}
                  </td>
                  <td className="py-1 px-2 whitespace-nowrap">
                    {item.date} ({item.day})
                  </td>
                  <td className="py-1 px-2 font-semibold">
                    {item.jamatName}
                  </td>
                  <td className="py-1 px-2 font-bold text-slate-900">
                    {item.subject}
                  </td>
                  <td className="py-1 px-1.5 text-center font-mono">
                    {item.code || "—"}
                  </td>
                  <td className="py-1 px-2 whitespace-nowrap font-medium text-emerald-950">
                    {item.time}
                  </td>
                  <td className="py-1 px-2">
                    {item.hall}
                  </td>
                  <td className="py-1 px-1.5 text-center font-bold">
                    {item.marks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-8 text-center text-xs text-slate-600">
            এই সেশনে কোনো পরীক্ষার সময়সূচি নেই।
          </div>
        )}

        {/* Official Signatures */}
        <div className="mt-4 pt-3 border-t border-slate-300 flex justify-between items-end text-[8.5pt] text-slate-700 print-avoid-break">
          <div className="text-center flex flex-col items-center">
            <div className="h-10"></div>
            <div className="w-32 border-t border-slate-500 mb-1"></div>
            <p className="font-semibold text-slate-800">পরীক্ষা নিয়ন্ত্রক</p>
            <p className="text-[7.5pt] text-slate-500">জামিয়া হুসাইনিয়া মাদরাসা</p>
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
        {/* Jamat Switcher Bar & Search (Matches NoticeFilter style with arrow buttons & scrollbar) */}
        <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs mb-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
          {/* Jamat Pills Slider with Scroll Buttons */}
          <div className="relative flex-1 min-w-0 flex items-center">
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
              className={`flex items-center gap-2 overflow-x-auto pb-1.5 lg:pb-0 scroll-smooth w-full select-none ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#cbd5e1 transparent",
              }}
            >
              {jamats.map((jamat) => {
                const isActive = selectedJamat === jamat.id;
                return (
                  <button
                    key={jamat.id}
                    type="button"
                    onClick={() => handleJamatClick(jamat.id)}
                    className={`shrink-0 px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-primary text-white shadow-xs font-bold"
                        : "bg-white text-slate-700 hover:text-main border border-slate-200/80 hover:bg-slate-50"
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

          {/* Search Input */}
          <div className="relative w-full lg:w-72 xl:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="বিষয় বা তারিখ খুঁজুন..."
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200/80 bg-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Selected Jamat Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm sm:text-base font-bold text-main">
          {selectedJamat === "all" ? "সকল জামাত" : currentJamatObj ? currentJamatObj.name : "রুটিন তালিকা"} — পরীক্ষার সময়সূচি
        </h3>
        <span className="text-xs text-slate-500">
          মোট পরীক্ষা:{" "}
          <strong className="text-main">
            {toBengaliNumber(filteredSchedules.length)}টি
          </strong>
        </span>
      </div>

      {/* Error state with retry */}
      {isError && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>সার্ভার থেকে সরাসরি রুটিন লোড হতে বিঘ্ন ঘটেছে।</span>
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

      {/* Loading or Data Display */}
      {isLoading || (!activeSession && !isError) ? (
        <Loader />
      ) : paginatedSchedules.length > 0 ? (
        <>
          {/* DESKTOP TABLE VIEW (hidden on mobile, visible on md and up) */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200/80 shadow-xs bg-[#f1f3ff]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-900 text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center w-14">ক্র. নং</th>
                  <th className="py-3.5 px-4">তারিখ ও বার</th>
                  <th className="py-3.5 px-5">বিষয় / কিতাবের নাম</th>
                  <th className="py-3.5 px-3">বিষয় কোড</th>
                  <th className="py-3.5 px-4">পরীক্ষার সময়</th>
                  <th className="py-3.5 px-4">পরীক্ষার হল / কক্ষ</th>
                  <th className="py-3.5 px-3 text-center">পূর্ণমান</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 text-xs sm:text-sm">
                {paginatedSchedules.map((item, idx) => {
                  const globalIdx = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
                  return (
                    <tr
                      key={item.id || idx}
                      className={`transition-colors duration-150 ${
                        idx % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-[#f1f3ff] hover:bg-slate-100/70"
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center font-bold text-slate-500 font-sans">
                        {toBengaliNumber(globalIdx)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 whitespace-nowrap">
                        <p className="font-bold text-main">{item.date}</p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {item.day}
                        </p>
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="font-bold text-main">{item.subject}</p>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-xs text-slate-600">
                        {item.code || "—"}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-800 whitespace-nowrap">
                        {item.time}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          {item.hall}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md font-bold text-xs bg-slate-100 text-slate-800 border border-slate-200">
                          {item.marks}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW (tailored for iPhone X 375px screens) */}
          <div className="md:hidden space-y-3">
            {paginatedSchedules.map((item, idx) => {
              const globalIdx = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
              return (
                <div
                  key={item.id || idx}
                  className="p-4 rounded-2xl bg-[#f1f3ff] border border-slate-200/80 shadow-xs hover:border-primary/40 space-y-2.5 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-200/80 text-primary text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                        {toBengaliNumber(globalIdx)}
                      </span>
                      <span className="font-semibold text-xs text-slate-700">
                        {item.date} ({item.day})
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md font-bold text-[11px] bg-white border border-slate-200/80 text-slate-800 shrink-0 shadow-2xs">
                      পূর্ণমান: {item.marks}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-main leading-snug">
                    {item.subject}
                  </h4>

                  <div className="bg-white rounded-xl p-2.5 border border-slate-200/70 grid grid-cols-2 gap-2 text-xs shadow-2xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Clock className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span className="truncate">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span className="truncate">{item.hall}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shared Pagination component */}
          {filteredSchedules.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalCount={filteredSchedules.length}
              pageSize={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              useBengaliDigits={true}
            />
          )}
        </>
      ) : (
        <div className="p-8 sm:p-12 text-center bg-[#f1f3ff] rounded-2xl border border-dashed border-slate-200/80 shadow-xs space-y-2">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-1 opacity-70" />
          <h3 className="text-sm sm:text-base font-bold text-slate-800">
            {searchQuery
              ? `"${searchQuery}" এর সাথে মিলে এমন কোনো পরীক্ষা পাওয়া যায়নি`
              : selectedJamat !== "all"
              ? `"${currentJamatObj?.name || 'নির্বাচিত জামাত'}"-এর জন্য এই সেশনে কোনো রুটিন পাওয়া যায়নি`
              : activeSessionObj?.name
              ? `${activeSessionObj.name}-এর সময়সূচি এখনো অন্তর্ভুক্ত করা হয়নি`
              : "কোনো পরীক্ষার রুটিন পাওয়া যায়নি"}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            পরীক্ষা নিয়ন্ত্রণ দফতর কর্তৃক রুটিন অনুমোদিত ও ডাটাবেজে অন্তর্ভুক্ত করা হলে এখানে বিস্তারিত সময়সূচি, তারিখ ও হল বরাদ্দ প্রদর্শিত হবে।
          </p>
        </div>
      )}

      {/* Exam Rules & Guidelines Accordion / Box */}
      {examInstructions.length > 0 && (
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#f1f3ff] border border-slate-200/80 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-main font-bold text-sm sm:text-base">
            <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>পরীক্ষার্থীদের জন্য বিশেষ নির্দেশনাবলী</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700">
            {examInstructions.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ExamRoutineTable;
