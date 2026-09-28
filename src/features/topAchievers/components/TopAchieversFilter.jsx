import React, { useRef } from "react";
import { Search, Trophy, Globe, MapPin, Building2, BookOpen, X, RotateCcw } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "সকল সেরা", icon: Trophy },
  { id: "national", label: "জাতীয় / দেশ সেরা", icon: Globe },
  { id: "division", label: "বিভাগীয় সেরা", icon: MapPin },
  { id: "district", label: "জেলা ভিত্তিক সেরা", icon: Building2 },
  { id: "madrasa", label: "মাদ্রাসার অভ্যন্তরীণ", icon: BookOpen },
];

const TopAchieversFilter = ({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  academicYear,
  onAcademicYearChange,
  availableYears = [],
  totalCount = 0,
}) => {
  const tabsRef = useRef(null);

  // Enable horizontal scrolling with mouse wheel
  const handleTabsWheel = (e) => {
    if (tabsRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        tabsRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  const isFiltered = activeCategory !== "all" || academicYear !== "all" || searchQuery.trim() !== "";

  return (
    <div className="w-full bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
      {/* TIER 1: Category Filter Tabs (Full width, mouse-wheel scrollable on mobile/tablet, full visibility on desktop) */}
      <div className="w-full">
        <div
          ref={tabsRef}
          onWheel={handleTabsWheel}
          className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 scroll-smooth"
        >
          {CATEGORIES.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onCategoryChange(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:text-main border border-slate-200/80 shadow-2xs active:scale-95"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TIER 2: Search Input, Academic Year Filter & Results Summary */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3.5 border-t border-slate-200/80">
        {/* Search Input with Clear Button */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="শিক্ষার্থী, জামাত, শিক্ষাবোর্ড বা রোল নম্বর দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-white border border-slate-200/80 rounded-xl text-main placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              title="মুছে ফেলুন"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Right Controls: Academic Year Dropdown & Reset */}
        <div className="flex items-center gap-2.5 shrink-0">
          {availableYears.length > 0 && (
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={academicYear}
                onChange={(e) => onAcademicYearChange(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-white border border-slate-200/80 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer shadow-2xs"
              >
                <option value="all">সকল শিক্ষাবর্ষ</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    শিক্ষাবর্ষ: {year}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Reset Filters button if any filter is active */}
          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                onCategoryChange("all");
                onSearchChange("");
                onAcademicYearChange("all");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
              title="ফিল্টার রিসেট করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">রিসেট</span>
            </button>
          )}

          {/* Total Count Badge */}
          {totalCount > 0 && (
            <span className="text-xs font-medium text-slate-600 bg-white px-3 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs font-mono hidden md:inline-block">
              {totalCount} জন শিক্ষার্থী
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopAchieversFilter;
