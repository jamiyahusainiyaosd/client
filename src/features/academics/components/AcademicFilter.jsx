import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/academicUtils";

const AcademicFilter = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  viewMode = "grid",
  onViewModeChange,
  totalCount = 17,
  from = 1,
  to = 9,
}) => {
  const categories = [
    "সকল বিভাগ",
    "নূরানী ও মক্তব",
    "হিফজুল কুরআন",
    "মুতাওয়াসসিতাহ",
    "সানাবিয়্যাহ",
    "ফযিলত",
  ];

  return (
    <div className="bg-[#f1f3ff] border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-xs mb-8">
      {/* Top Row: Search Input + Result Counter & View Switcher */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            className="w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 pl-11 pr-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 shadow-xs transition-all"
            id="academicSearch"
            placeholder="একাডেমিক বিভাগ বা ক্লাস খুঁজুন..."
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Info & View Switcher */}
        <div className="flex items-center justify-between lg:justify-end gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
            <span className="material-symbols-outlined text-[18px] text-primary">
              school
            </span>
            <span>
              মোট {toBengaliDigits(totalCount)}টির মধ্যে{" "}
              <strong className="text-slate-900 font-semibold">
                {toBengaliDigits(from)}-{toBengaliDigits(to)}টি
              </strong>{" "}
              প্রদর্শিত
            </span>
          </div>

          <div className="inline-flex items-center bg-white border border-slate-200/80 p-1 rounded-xl shadow-xs">
            <button
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-primary text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              onClick={() => onViewModeChange("grid")}
              title="গ্রিড ভিউ"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px] block">
                grid_view
              </span>
            </button>
            <button
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-primary text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              onClick={() => onViewModeChange("list")}
              title="তালিকা ভিউ"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px] block">
                view_list
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
              activeCategory === cat
                ? "bg-primary text-white shadow-xs font-semibold"
                : "bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
            onClick={() => onCategoryChange(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

AcademicFilter.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  viewMode: PropTypes.string,
  onViewModeChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  from: PropTypes.number,
  to: PropTypes.number,
};

export default AcademicFilter;
