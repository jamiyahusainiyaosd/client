import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, Clock, MapPin, User, CheckCircle2, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import coCurricularService from "../services/coCurricular.services";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

const ITEMS_PER_PAGE = 6;

const CoCurricularCards = () => {
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

  // Fetch all activities once to derive categories dynamically
  const { data: apiAllActivities } = useQuery({
    queryKey: ["coCurricular", "all"],
    queryFn: () => coCurricularService.getAllActivities("all"),
    staleTime: 1000 * 60 * 5,
  });

  const categories = useMemo(() => {
    const raw = Array.isArray(apiAllActivities) ? apiAllActivities : apiAllActivities?.results || [];
    const cats = [{ id: "all", label: "সকল কার্যক্রম" }];
    const seen = new Set();
    raw.forEach((a) => {
      if (a.category && !seen.has(a.category)) {
        seen.add(a.category);
        cats.push({ id: a.category, label: a.category_label || a.category });
      }
    });
    return cats;
  }, [apiAllActivities]);

  // Fetch dynamic activities from DRF API
  const {
    data: apiActivities,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["coCurricular", selectedCategory],
    queryFn: () => coCurricularService.getAllActivities(selectedCategory),
    staleTime: 1000 * 60 * 5,
  });

  // Normalize API data
  const activities = useMemo(() => {
    const rawList = Array.isArray(apiActivities)
      ? apiActivities
      : apiActivities?.results || apiActivities?.data || [];

    return rawList.map((item) => {
      let parsedItems = [];
      if (Array.isArray(item.items) && item.items.length > 0) {
        parsedItems = item.items;
      } else if (item.items_json) {
        try {
          parsedItems = JSON.parse(item.items_json);
        } catch {
          parsedItems = [];
        }
      }

      return {
        id: item.activity_id || item.id,
        title: item.title,
        shortDesc: item.short_desc,
        category: item.category,
        timing: item.timing,
        venue: item.venue,
        mentor: item.mentor,
        badge: item.badge,
        icon: item.icon,
        items: parsedItems,
      };
    });
  }, [apiActivities]);

  const filteredActivities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return activities.filter((item) => {
      if (!q) return true;
      return (
        item.title?.toLowerCase().includes(q) ||
        item.shortDesc?.toLowerCase().includes(q) ||
        item.mentor?.toLowerCase().includes(q)
      );
    });
  }, [activities, searchQuery]);

  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredActivities.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredActivities, currentPage]);

  return (
    <div className="space-y-6">
      {/* Category Pills & Search */}
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
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

        {/* Search Input */}
        <div className="relative w-full sm:w-64 md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="কার্যক্রম বা উস্তাদের নাম..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200/80 bg-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Error state with retry */}
      {isError && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>সার্ভার থেকে সরাসরি কার্যক্রম লোড হতে বিঘ্ন ঘটেছে।</span>
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
      ) : paginatedActivities.length > 0 ? (
        <>
          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {paginatedActivities.map((act) => (
              <div
                key={act.id}
                className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-primary/40 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Header: Icon + Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200/80 text-primary flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[22px]">
                        {act.icon}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200/80 shadow-2xs">
                      {act.badge}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-base sm:text-lg font-bold text-main leading-snug">
                    {act.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {act.shortDesc}
                  </p>

                  {/* Key Features Bullet List */}
                  {act.items && act.items.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-slate-200/70 space-y-2">
                      {act.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: Timing, Venue & Mentor */}
                <div className="mt-5 pt-3.5 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-white border p-3 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium truncate">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{act.timing}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium truncate">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{act.venue}</span>
                  </div>
                  <div className="col-span-1 sm:col-span-2 flex items-center gap-1.5 text-slate-600 pt-1 text-[11px] border-t border-slate-100">
                    <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate font-medium">দায়িত্বে: {act.mentor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shared Pagination component */}
          {filteredActivities.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalCount={filteredActivities.length}
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
            কোনো কার্যক্রম পাওয়া যায়নি
          </p>
        </div>
      )}
    </div>
  );
};

export default CoCurricularCards;
