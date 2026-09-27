import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/bengaliUtils";

const FormerStudentFilter = ({
  searchQuery,
  onSearchChange,
  selectedYear,
  onSelectYear,
  availableYears = ["2024", "2023", "2021", "2020", "2015", "2010"],
  resultCount = 6,
}) => {
  return (
    <div className="bg-[#f1f3ff] border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-xs mb-8">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Live Search Input */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white border border-slate-200 text-slate-800 placeholder-slate-400 font-body-md text-sm sm:text-base rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all shadow-xs"
            id="alumniSearchInput"
            placeholder="নাম, মোবাইল নম্বর, ঠিকানা বা পাশের সাল দিয়ে খুঁজুন..."
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Batch Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none" id="yearFilterGroup">
          <button
            className={`filter-pill px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
              selectedYear === "all"
                ? "bg-primary text-white shadow-xs font-semibold"
                : "bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            }`}
            onClick={() => onSelectYear("all")}
            type="button"
          >
            সব ব্যাচ
          </button>
          {availableYears.map((yr) => (
            <button
              key={yr}
              className={`filter-pill px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                selectedYear === String(yr)
                  ? "bg-primary text-white shadow-xs font-semibold"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              }`}
              onClick={() => onSelectYear(String(yr))}
              type="button"
            >
              {toBengaliDigits(yr)}
            </button>
          ))}
        </div>
      </div>

      {/* Meta Results Bar */}
      <div className="mt-4 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-500 font-label-sm text-xs border-t border-slate-200/60">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
          <span id="resultCountLabel">
            মোট {toBengaliDigits(resultCount)} জন সাবেক ছাত্র পাওয়া গেছে
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500">সাজানো: সর্বশেষ ব্যাচানুযায়ী</span>
          <span className="text-slate-300">•</span>
          <span className="text-primary font-medium">যাচাইকৃত প্রোফাইল</span>
        </div>
      </div>
    </div>
  );
};

FormerStudentFilter.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedYear: PropTypes.string.isRequired,
  onSelectYear: PropTypes.func.isRequired,
  availableYears: PropTypes.arrayOf(PropTypes.string),
  resultCount: PropTypes.number,
};

export default FormerStudentFilter;
