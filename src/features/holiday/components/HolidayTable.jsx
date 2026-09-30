import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, Calendar, AlertCircle, Quote, RefreshCw } from "lucide-react";
import holidayService from "../services/holiday.services";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

const toBengaliNumber = (num) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[Number(d)]);
};

const HOLIDAY_HADITH = {
  bangla:
    "রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) ইরশাদ করেন: 'নিশ্চয়ই আল্লাহ তাআলা তোমাদেরকে জাহেলিয়াতের উৎসবের চেয়ে উত্তম দুটি আনন্দের দিন দান করেছেন— তা হলো ঈদুল ফিতর ও ঈদুল আজহা।'",
  source: "— সুনানে আবু দাউদ ও নাসায়ী (সহীহ হাদিস)",
};

const ITEMS_PER_PAGE = 8;

const HolidayTable = ({ activeYear }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (p) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
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

  // Reset pagination on external year change
  const prevYearRef = React.useRef(activeYear);
  useEffect(() => {
    if (prevYearRef.current !== activeYear) {
      prevYearRef.current = activeYear;
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", "1");
        return next;
      });
    }
  }, [activeYear, setSearchParams]);

  // Fetch dynamic holidays from DRF API (all holidays for activeYear)
  const {
    data: apiHolidays,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["holidays", activeYear],
    queryFn: () => holidayService.getAllHolidays(activeYear, "all"),
    enabled: Boolean(activeYear),
    staleTime: 1000 * 60 * 5,
  });

  // Normalize API data
  const holidays = useMemo(() => {
    const rawList = Array.isArray(apiHolidays)
      ? apiHolidays
      : apiHolidays?.results || apiHolidays?.data || [];

    return rawList.map((item) => ({
      id: item.id,
      year: item.academic_year || "",
      title: item.title,
      category: item.category,
      dateRange: item.date_range,
      hijriDate: item.hijri_date || "—",
      day: item.day_name,
      duration: item.duration,
      reopenDate: item.reopen_date,
      note: item.note || "",
    }));
  }, [apiHolidays]);

  // Dynamic categories from all fetched holidays
  const categories = useMemo(() => {
    const cats = [{ id: "all", label: "সকল ছুটি" }];
    const seen = new Set();
    holidays.forEach((h) => {
      if (h.category && !seen.has(h.category)) {
        seen.add(h.category);
        cats.push({ id: h.category, label: h.category });
      }
    });
    return cats;
  }, [holidays]);

  const filteredHolidays = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return holidays.filter((item) => {
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      if (!matchCategory) return false;
      if (!q) return true;

      return (
        item.title?.toLowerCase().includes(q) ||
        item.dateRange?.toLowerCase().includes(q) ||
        item.day?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
      );
    });
  }, [holidays, selectedCategory, searchQuery]);

  const paginatedHolidays = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredHolidays.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredHolidays, currentPage]);

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* PRINT-ONLY OFFICIAL 1-PAGE HOLIDAY CALENDAR DOCUMENT                      */}
      {/* ========================================================================= */}
      <div className="print-only">
        <div className="border-b-2 border-emerald-900 pb-2 mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-emerald-950">জামিয়া হুসাইনিয়া মাদরাসা</h1>
            <p className="text-[11px] text-slate-600">শায়েস্তাগঞ্জ, হবিগঞ্জ • শিক্ষা ও প্রশাসন দফতর</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-800 text-emerald-900 bg-emerald-50">
              বার্ষিক ছুটির তালিকা ও শিক্ষাপঞ্জিকা
            </span>
            <p className="text-[9px] text-slate-500 mt-0.5">
              শিক্ষাবর্ষ: {activeYear || "২০২৫ — ২০২৬"} • পৃষ্ঠা: {toBengaliNumber(currentPage)}/{toBengaliNumber(Math.ceil(filteredHolidays.length / ITEMS_PER_PAGE) || 1)} • মোট ছুটি: {toBengaliNumber(filteredHolidays.length)}টি
            </p>
          </div>
        </div>

        {paginatedHolidays.length > 0 ? (
          <table className="w-full print-table text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[8.5pt]">
                <th className="py-1 px-1.5 text-center w-8">ক্র.</th>
                <th className="py-1 px-3">ছুটির বিবরণ / উপলক্ষ্য</th>
                <th className="py-1 px-2.5">তারিখ (ইংরেজি)</th>
                <th className="py-1 px-2">হিজরি তারিখ</th>
                <th className="py-1 px-2 text-center w-16">দিনসংখ্যা</th>
                <th className="py-1 px-2.5">মাদরাসা পুনরায় খোলার তারিখ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300 text-[8pt]">
              {paginatedHolidays.map((item, idx) => (
                <tr key={item.id || idx} className="print-avoid-break">
                  <td className="py-1 px-1.5 text-center font-bold font-sans">
                    {toBengaliNumber((currentPage - 1) * ITEMS_PER_PAGE + idx + 1)}
                  </td>
                  <td className="py-1 px-3 font-bold text-slate-900">
                    {item.title}
                  </td>
                  <td className="py-1 px-2.5 whitespace-nowrap">
                    {item.dateRange}
                  </td>
                  <td className="py-1 px-2 text-slate-600">
                    {item.hijriDate || "—"}
                  </td>
                  <td className="py-1 px-2 text-center font-semibold text-emerald-900 font-mono">
                    {item.days}
                  </td>
                  <td className="py-1 px-2.5 font-medium whitespace-nowrap text-slate-800">
                    {item.reopenDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-8 text-center text-xs text-slate-500">কোনো ছুটির রেকর্ড নেই</div>
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
        {/* Quick Summary Banner - Dynamic from API */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-[#f1f3ff] rounded-2xl p-4 border border-emerald-100">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            মোট ছুটির পর্ব
          </p>
          <p className="text-xl sm:text-2xl font-black text-primary mt-1">
            {toBengaliNumber(holidays.length || filteredHolidays.length)}টি
          </p>
          <p className="text-[10px] text-slate-600 mt-0.5">
            অনুমোদিত ছুটি তালিকা
          </p>
        </div>

        <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200/60">
          <p className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
            প্রধান দীর্ঘ অবকাশ
          </p>
          <p className="text-xl sm:text-2xl font-black text-emerald-900 mt-1">
            ৪০ দিন
          </p>
          <p className="text-[10px] text-emerald-700 mt-0.5">
            মাহে রমজান ও ঈদুল ফিতর
          </p>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-amber-50/80 rounded-2xl p-4 border border-amber-200/60">
          <p className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
            আসন্ন ছুটি
          </p>
          <p className="text-sm sm:text-base font-bold text-amber-950 mt-1 line-clamp-1">
            {filteredHolidays[0]?.title || "পবিত্র ঈদুল ফিতর"}
          </p>
          <p className="text-[10px] text-amber-700 mt-0.5">
            {filteredHolidays[0]?.dateRange || "২০ ফেব্রুয়ারি ২০২৬ হতে"}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          {/* Category Pills */}
          <div
            onWheel={(e) => {
              if (e.deltaY !== 0) {
                e.currentTarget.scrollLeft += e.deltaY;
              }
            }}
            className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none scroll-smooth"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs font-bold"
                      : "bg-white text-slate-700 hover:text-main border border-slate-200/80 hover:bg-slate-50"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="ছুটি বা তারিখ খুঁজুন..."
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200/80 bg-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Error state with retry */}
      {isError && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>সার্ভার থেকে সরাসরি তথ্য লোড হতে বিঘ্ন ঘটেছে।</span>
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

      {/* Loading State or Data */}
      {isLoading ? (
        <Loader />
      ) : paginatedHolidays.length > 0 ? (
        <>
          {/* DESKTOP TABLE VIEW (hidden on mobile, visible on md and up) */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200/80 shadow-xs bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f1f3ff] text-slate-900 border-b border-slate-200/90 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center w-14 text-slate-800">ক্র. নং</th>
                  <th className="py-3.5 px-5 text-slate-800">ছুটির বিবরণ / উপলক্ষ</th>
                  <th className="py-3.5 px-4 text-slate-800">তারিখ (ইংরেজি ও হিজরী)</th>
                  <th className="py-3.5 px-3 text-slate-800">বার</th>
                  <th className="py-3.5 px-3 text-center text-slate-800">দিনের সংখ্যা</th>
                  <th className="py-3.5 px-4 text-slate-800">মাদরাসা খোলার তারিখ</th>
                  <th className="py-3.5 px-4 text-slate-800">মন্তব্য</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 text-xs sm:text-sm">
                {paginatedHolidays.map((item, idx) => {
                  const globalIdx =
                    (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
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
                      <td className="py-3.5 px-5">
                        <p className="font-bold text-main">{item.title}</p>
                        <span className="inline-block mt-0.5 text-[10px] font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200/80 shadow-2xs">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-800">
                        <p className="font-semibold">{item.dateRange}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                          {item.hijriDate}
                        </p>
                      </td>
                      <td className="py-3.5 px-3 font-medium text-slate-700 whitespace-nowrap">
                        {item.day}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md font-bold text-xs bg-slate-100 text-slate-800 border border-slate-200">
                          {item.duration}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-800">
                        {item.reopenDate}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-xs">
                        {item.note || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW (visible on < md, tailored for 375px screens) */}
          <div className="md:hidden space-y-3">
            {paginatedHolidays.map((item, idx) => {
              const globalIdx = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
              return (
                <div
                  key={item.id || idx}
                  className="p-4 rounded-2xl bg-[#f1f3ff] border border-slate-200/80 shadow-xs hover:border-primary/40 space-y-2.5 transition-all"
                >
                  {/* Card Header: Sl + Title + Category */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-200/80 text-primary text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                        {toBengaliNumber(globalIdx)}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-white border border-emerald-200/80 px-2 py-0.5 rounded shadow-2xs">
                        {item.category}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md font-bold text-[11px] bg-white border border-slate-200/80 text-slate-800 shrink-0 shadow-2xs">
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-main leading-snug">
                    {item.title}
                  </h3>

                  {/* Date & Hijri */}
                  <div className="bg-white rounded-xl p-2.5 border border-slate-200/70 space-y-1 text-xs shadow-2xs">
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-semibold">{item.dateRange}</span>
                      <span className="text-slate-400">({item.day})</span>
                    </div>
                    <div className="text-[11px] text-slate-500 pl-5">
                      {item.hijriDate}
                    </div>
                  </div>

                  {/* Reopen Date */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/70">
                    <span className="text-slate-500">মাদরাসা খুলবে:</span>
                    <span className="font-bold text-emerald-800">
                      {item.reopenDate}
                    </span>
                  </div>

                  {item.note && (
                    <p className="text-[11px] text-slate-400 italic">
                      * {item.note}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Shared Pagination component */}
          {filteredHolidays.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalCount={filteredHolidays.length}
              pageSize={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              useBengaliDigits={true}
            />
          )}
        </>
      ) : (
        <div className="p-8 text-center bg-[#f1f3ff] rounded-2xl border border-slate-200/80 shadow-xs">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">
            কোনো ছুটির রেকর্ড পাওয়া যায়নি
          </p>
        </div>
      )}

      {/* Bottom Hadith Banner */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#f1f3ff] border border-slate-200/80 text-center shadow-2xs">
        <Quote className="w-6 h-6 text-slate-700 mx-auto mb-2 opacity-80" />
        <p className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-relaxed">
          {HOLIDAY_HADITH.bangla}
        </p>
        <p className="text-xs font-semibold text-slate-600 mt-1">
          {HOLIDAY_HADITH.source}
        </p>
      </div>
      </div>
    </div>
  );
};

export default HolidayTable;
