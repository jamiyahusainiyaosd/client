import React, { useState, useMemo, useEffect } from "react";
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

const DEFAULT_CATEGORIES = [
  { id: "all", label: "সকল নীতিমালা" },
  { id: "general", label: "সাধারণ আচরণ" },
  { id: "dining", label: "মেস ও খাবার" },
  { id: "worship", label: "নামাজ ও তাকরার" },
  { id: "leave", label: "ছুটি ও গেটপাস" },
  { id: "prohibitions", label: "মোবাইল ও বিধিনিষেধ" },
];

const ITEMS_PER_PAGE = 8;

const BoardingRulesList = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useContactSettings();

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

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
      categoryLabel: item.category_label || "সাধারণ আচরণ",
      rule: item.rule_text,
      importance: item.importance || "বাধ্যতামূলক",
    }));
  }, [apiRules]);

  // Dynamically extract categories if available
  const categories = useMemo(() => {
    if (rules.length === 0) return DEFAULT_CATEGORIES;
    const cats = [{ id: "all", label: "সকল নীতিমালা" }];
    const seen = new Set();
    rules.forEach((r) => {
      if (r.category && !seen.has(r.category)) {
        seen.add(r.category);
        cats.push({ id: r.category, label: r.categoryLabel || r.category });
      }
    });
    return cats.length > 1 ? cats : DEFAULT_CATEGORIES;
  }, [rules]);

  const filteredRules = useMemo(() => {
    return rules.filter((item) => {
      const matchCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchSearch =
        !searchQuery.trim() ||
        item.rule.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.importance.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [rules, activeCategory, searchQuery]);

  // Paginated slice
  const paginatedRules = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRules.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRules, currentPage]);

  return (
    <div className="space-y-6">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
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
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নীতিমালা খুঁজুন..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200/80 bg-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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
            onClick={() => setSearchQuery("")}
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
                className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-200 shadow-xs hover:shadow-sm ${
                  isStrict
                    ? "border-red-200/80 hover:border-red-300 bg-red-50/20"
                    : "border-slate-200/80 hover:border-primary/40"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Serial Number Badge */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm font-sans shadow-2xs ${
                      isStrict
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-[#f1f3ff] text-primary border border-emerald-100"
                    }`}
                  >
                    {toBengaliNumber(globalIndex)}
                  </div>

                  {/* Rule Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {rule.categoryLabel}
                      </span>
                      <span
                        className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          isStrict
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100/70 text-emerald-800"
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
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">
            কোনো নীতিমালা পাওয়া যায়নি
          </p>
          <p className="text-xs text-slate-500 mt-1">
            অনুগ্রহ করে অন্য কি-ওয়ার্ড দিয়ে সার্চ করুন।
          </p>
        </div>
      )}

      {/* Shared Pagination component */}
      {!isLoading && filteredRules.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalCount={filteredRules.length}
          pageSize={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
          useBengaliDigits={true}
        />
      )}
    </div>
  );
};

export default BoardingRulesList;
