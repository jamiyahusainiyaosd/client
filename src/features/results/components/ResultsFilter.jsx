import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/resultsUtils";

const CATEGORIES = [
  { id: "all", label: "সকল ফলাফল" },
  { id: "nurani", label: "নূরানী বিভাগ" },
  { id: "hifz", label: "হিফজ ও নাজেরা" },
  { id: "ibtedai", label: "ইবতেদাইয়্যাহ" },
  { id: "mutawassitah", label: "মুতাওয়াসসিতাহ" },
  { id: "sanawiyyah", label: "ছানাবিয়্যাহ" },
  { id: "fazilat", label: "ফযীলত ও দাওরা" },
];

const ResultsFilter = ({
  activeCategory = "all",
  onSelectCategory,
  searchQuery = "",
  onSearchChange,
  onClearSearch,
  totalCount = 0,
}) => {
  return (
    <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Pills Slider */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"
          id="result-filter-tabs"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const label =
              cat.id === "all"
                ? `সকল ফলাফল (${toBengaliDigits(totalCount)})`
                : cat.label;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
                  isSelected
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-300/90 shadow-xs"
                    : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search Box with Clear Button */}
        <div className="relative w-full lg:w-80 shrink-0">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="result-search-input"
            placeholder="জামাত বা বিভাগ দিয়ে খুঁজুন..."
            className="w-full bg-white text-slate-900 pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200/80 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs placeholder:text-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={onClearSearch}
              id="clear-result-search"
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

ResultsFilter.propTypes = {
  activeCategory: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
};

export default ResultsFilter;
