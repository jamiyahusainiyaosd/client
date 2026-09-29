import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, AlertCircle, PhoneCall, CheckCircle2, RefreshCw } from "lucide-react";
import boardingService from "../services/boarding.services";
import { useContactSettings } from "../../contactus/hooks/useContactSettings";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

const toBengaliNumber = (num) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[Number(d)]);
};

const ITEMS_PER_PAGE = 8;

const BoardingRulesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  useContactSettings();

  const handlePageChange = (p) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
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

  // Fetch dynamic rules from Django REST Framework backend API
  const {
    data: apiRules,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["boardingRules"],
    queryFn: () => boardingService.getAllRules("all"),
    staleTime: 1000 * 60 * 5,
  });

  // Extract rules dynamically from DRF API
  const rules = useMemo(() => {
    const rawList = Array.isArray(apiRules)
      ? apiRules
      : apiRules?.results || apiRules?.data || [];

    return rawList.map((item) => ({
      id: item.rule_number || item.id,
      category: item.category,
      categoryLabel: item.category_label || item.category || "সাধারণ আচরণ",
      rule: item.rule_text,
      importance: item.importance || "বাধ্যতামূলক",
    }));
  }, [apiRules]);

  // Dynamically extract categories from rules
  const categories = useMemo(() => {
    const cats = [{ id: "all", label: "সকল নীতিমালা" }];
    const seen = new Set();
    rules.forEach((r) => {
      if (r.category && !seen.has(r.category)) {
        seen.add(r.category);
        cats.push({ id: r.category, label: r.categoryLabel || r.category });
      }
    });
    return cats;
  }, [rules]);

  const filteredRules = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return rules.filter((item) => {
      const matchCategory =
        activeCategory === "all" || item.category === activeCategory;
      if (!matchCategory) return false;
      if (!q) return true;

      return (
        item.rule?.toLowerCase().includes(q) ||
        item.categoryLabel?.toLowerCase().includes(q) ||
        item.importance?.toLowerCase().includes(q)
      );
    });
  }, [rules, activeCategory, searchQuery]);

  // Paginated slice
  const paginatedRules = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRules.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRules, currentPage]);

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* PRINT-ONLY OFFICIAL 1-PAGE COMPACT DOCUMENT                               */}
      {/* ========================================================================= */}
      <div className="print-only">
        {/* Official Header */}
        <div className="border-b-2 border-emerald-900 pb-2 mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-emerald-950">জামিয়া হুসাইনিয়া মাদরাসা</h1>
            <p className="text-[11px] text-slate-600">শায়েস্তাগঞ্জ, হবিগঞ্জ • দারুল ইক্বামাহ (ছাত্রাবাস দফতর)</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-800 text-emerald-900 bg-emerald-50">
              ছাত্রাবাস নীতিমালা ও আচরণবিধি
            </span>
            <p className="text-[9px] text-slate-500 mt-0.5">
              পৃষ্ঠা: {toBengaliNumber(currentPage)}/{toBengaliNumber(Math.ceil(filteredRules.length / ITEMS_PER_PAGE) || 1)} • মোট বিধিমালা: {toBengaliNumber(filteredRules.length)}টি
            </p>
          </div>
        </div>

        {/* 2-Column Compact Rules Grid (fits on 1 A4 page for current paginated rules) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[8.5pt] leading-tight">
          {paginatedRules.map((rule, idx) => {
            const isStrict =
              rule.importance.includes("নিষেধাজ্ঞা") ||
              rule.importance.includes("বহিষ্কার") ||
              rule.importance.includes("কঠোর");

            const itemNumber = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;

            return (
              <div
                key={rule.id || idx}
                className="flex items-start gap-1.5 p-1.5 rounded border border-slate-300 print-avoid-break bg-white"
              >
                <span className="font-bold text-emerald-900 shrink-0 font-sans min-w-[16px]">
                  {toBengaliNumber(itemNumber)}.
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[7.5pt] font-semibold text-slate-700 bg-slate-100 px-1 rounded">
                      {rule.categoryLabel}
                    </span>
                    {isStrict && (
                      <span className="text-[7pt] font-bold text-red-700 bg-red-50 border border-red-200 px-1 rounded">
                        {rule.importance}
                      </span>
                    )}
                  </div>
                  <p className="text-[8pt] text-slate-800 leading-snug">
                    {rule.rule}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Signatures */}
        <div className="mt-4 pt-3 border-t border-slate-300 flex justify-between items-end text-[8.5pt] text-slate-700 print-avoid-break">
          <div className="text-center flex flex-col items-center">
            <div className="h-10"></div>
            <div className="w-32 border-t border-slate-500 mb-1"></div>
            <p className="font-semibold text-slate-800">নাজেমে দারুল ইক্বামাহ</p>
            <p className="text-[7.5pt] text-slate-500">ছাত্রাবাস সুপার</p>
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
      {/* SCREEN-ONLY INTERACTIVE UI (CARDS, SEARCH, CATEGORIES, PAGINATION)         */}
      {/* ========================================================================= */}
      <div className="screen-only space-y-6">
        {/* Category Pills & Search Bar */}
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
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "bg-[#f1f3ff] text-slate-700 hover:bg-slate-200/70"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64 md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="নীতিমালা খুঁজুন..."
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200/80 bg-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Rules Count & Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            প্রদর্শিত হচ্ছে:{" "}
            <strong className="text-slate-800 font-bold">
              {toBengaliNumber(filteredRules.length)}টি
            </strong>{" "}
            নীতিমালা
          </span>
          {searchQuery && (
            <button
              onClick={() => handleSearchChange("")}
              className="text-primary hover:underline font-semibold cursor-pointer"
            >
              সার্চ মুছুন
            </button>
          )}
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

        {/* Rules List / Cards or Shared Loader */}
        {isLoading ? (
          <Loader />
        ) : paginatedRules.length > 0 ? (
          <div className="space-y-3 sm:space-y-3.5">
            {paginatedRules.map((rule, idx) => {
              const isStrict =
                rule.importance.includes("নিষেধাজ্ঞা") ||
                rule.importance.includes("বহিষ্কার") ||
                rule.importance.includes("কঠোর");

              const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;

              return (
                <div
                  key={rule.id || idx}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-sm ${
                    isStrict
                      ? "border-red-200/80 hover:border-red-300 bg-red-50/40"
                      : "bg-[#f1f3ff] border-slate-200/80 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Serial Number Badge */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm font-sans shadow-2xs ${
                        isStrict
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-white text-primary border border-slate-200/80"
                      }`}
                    >
                      {toBengaliNumber(globalIndex)}
                    </div>

                    {/* Rule Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 bg-white border border-slate-200/70 px-2 py-0.5 rounded-md shadow-2xs">
                          {rule.categoryLabel}
                        </span>
                        <span
                          className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md shadow-2xs ${
                            isStrict
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : "bg-white text-emerald-800 border border-emerald-200/80"
                          }`}
                        >
                          {rule.importance}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                        {rule.rule}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#f1f3ff] rounded-2xl border border-slate-200/80 shadow-xs">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">
              কোনো নীতিমালা পাওয়া যায়নি
            </p>
            <p className="text-xs text-slate-500 mt-1">
              অনুগ্রহ করে অন্য কি-ওয়ার্ড দিয়ে সার্চ করুন।
            </p>
          </div>
        )}

        {/* Shared Pagination component with URL sync */}
        {!isLoading && filteredRules.length > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalCount={filteredRules.length}
            pageSize={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
            useBengaliDigits={true}
          />
        )}
      </div>
    </div>
  );
};

export default BoardingRulesList;
