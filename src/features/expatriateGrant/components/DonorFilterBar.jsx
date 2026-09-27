import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/donorUtils";

const DonorFilterBar = ({
  totalCount = 0,
  searchTerm = "",
  onSearchChange,
  selectedCountry = "all",
  onSelectCountry,
  countryList = [],
}) => {
  return (
    <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Country Filter Pills */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"
          id="donor-country-pills"
        >
          <button
            type="button"
            onClick={() => onSelectCountry("all")}
            className={`shrink-0 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
              selectedCountry === "all"
                ? "bg-primary-light text-primary border border-primary-border shadow-xs font-bold"
                : "bg-white text-slate-700 hover:text-main border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            সকল প্রবাসী ({toBengaliDigits(totalCount)})
          </button>

          {countryList.map((c) => {
            const isSelected = selectedCountry === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => onSelectCountry(c.name)}
                className={`shrink-0 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-primary-light text-primary border border-primary-border shadow-xs font-bold"
                    : "bg-white text-slate-700 hover:text-main border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                {c.name} ({toBengaliDigits(c.count)})
              </button>
            );
          })}
        </div>

        {/* Search Bar with Instant Clear */}
        <div className="relative w-full lg:w-80 shrink-0">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            id="donorSearchInput"
            placeholder="দাতার নাম, দেশ বা এলাকা দিয়ে খুঁজুন..."
            className="w-full bg-white text-slate-900 pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200/80 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs placeholder:text-slate-400 transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              id="clear-donor-search"
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

DonorFilterBar.propTypes = {
  totalCount: PropTypes.number,
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  selectedCountry: PropTypes.string,
  onSelectCountry: PropTypes.func.isRequired,
  countryList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
};

export default DonorFilterBar;
