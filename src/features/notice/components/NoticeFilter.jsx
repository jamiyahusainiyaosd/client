import { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/noticeUtils";

const NOTICE_CATEGORIES = [
  { id: "all", label: "সকল নোটিশ", icon: "select_all" },
  { id: "academic", label: "শিক্ষা ও সবক", icon: "menu_book" },
  { id: "exam", label: "পরীক্ষা ও ফলাফল", icon: "assignment" },
  { id: "holiday", label: "ছুটি ও অবকাশ", icon: "event_available" },
  { id: "admission", label: "ভর্তি সংক্রান্ত", icon: "how_to_reg" },
  { id: "administrative", label: "সাধারণ বিজ্ঞপ্তি", icon: "campaign" },
];

const NoticeFilter = ({
  activeCategory = "all",
  onSelectCategory,
  searchQuery = "",
  onSearchChange,
  totalCount = 0,
  categoryCounts = {},
}) => {
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
  }, [checkScroll]);

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
    <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Pills Slider with Scroll Buttons */}
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
            id="notice-filter-tabs"
          >
            {NOTICE_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const count =
                cat.id === "all" ? totalCount : categoryCounts[cat.id] ?? 0;
              const label = `${cat.label} (${toBengaliDigits(count)})`;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`shrink-0 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-300/90 shadow-xs"
                      : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] shrink-0">
                    {cat.icon}
                  </span>
                  <span>{label}</span>
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

        {/* Search Box with Clear Button */}
        <div className="relative w-full lg:w-72 xl:w-80 shrink-0">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="notice-search-input"
            placeholder="নোটিশের শিরোনাম বা বিষয় দিয়ে খুঁজুন..."
            className="w-full bg-white text-slate-900 pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200/80 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs placeholder:text-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              id="clear-notice-search"
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

NoticeFilter.propTypes = {
  activeCategory: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  categoryCounts: PropTypes.object,
};

export default NoticeFilter;
