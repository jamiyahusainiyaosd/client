import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toBengaliDigits, getIconForClass, getCategoryForClass } from "../utils/academicUtils";

const AcademicCards = ({
  classes = [],
  viewMode = "grid",
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="bg-[#f1f3ff] rounded-2xl p-5 sm:p-6 h-64 border border-slate-200/80 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="text-center py-16 bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-6 my-6 shadow-xs">
        <span className="material-symbols-outlined text-slate-400 text-[48px] mb-2">
          search_off
        </span>
        <h3 className="text-lg font-bold text-slate-900">
          কোন একাডেমিক ক্লাসের তথ্য পাওয়া যায়নি
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          অনুগ্রহ করে অন্য কোনো বিভাগ বা ভিন্ন কি-ওয়ার্ড দিয়ে অনুসন্ধান করুন।
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-3.5 sm:gap-4 my-6" id="academicList">
        {classes.map((item) => {
          const icon = item.icon || getIconForClass(item.class_name);
          const level = item.category || item.level || getCategoryForClass(item.class_name);

          return (
            <div
              key={item.id}
              className="group bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-200/80 text-primary flex items-center justify-center shrink-0 shadow-xs group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[22px] sm:text-[24px]">
                    {icon}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold shadow-xs">
                      {level}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                    {item.class_name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 line-clamp-1">
                    {item.class_title}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200/70 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    groups
                  </span>
                  <span>ছাত্র:</span>
                  <strong className="text-slate-900 font-bold">
                    {toBengaliDigits(item.student_count || 0)}
                  </strong>
                </div>

                <Link
                  className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-white hover:bg-primary hover:text-white text-primary text-xs sm:text-sm font-semibold border border-slate-200/80 transition-colors shadow-xs active:scale-98"
                  to={`/academic/${item.id}`}
                >
                  <span>বিস্তারিত</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 my-6"
      id="academicGrid"
    >
      {classes.map((item) => {
        const icon = item.icon || getIconForClass(item.class_name);
        const level = item.category || item.level || getCategoryForClass(item.class_name);

        return (
          <div
            key={item.id}
            className="group bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-5 sm:p-6 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-3.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-200/80 text-primary flex items-center justify-center shrink-0 shadow-xs group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[22px] sm:text-[24px]">
                    {icon}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-white text-emerald-800 border border-emerald-200/80 text-xs font-semibold shrink-0 shadow-xs">
                  {level}
                </span>
              </div>

              {/* Class Info */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                {item.class_name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {item.class_title}
              </p>

              {/* Description snippet */}
              {item.class_description && (
                <p className="text-[11px] sm:text-xs text-slate-500 mt-2 line-clamp-2 bg-white p-2 rounded-lg border border-slate-200/60">
                  {item.class_description}
                </p>
              )}
            </div>

            {/* Bottom Section */}
            <div className="mt-4 pt-3.5 border-t border-slate-200/70 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  groups
                </span>
                <span>ছাত্র:</span>
                <strong className="text-slate-900 font-bold">
                  {toBengaliDigits(item.student_count || 0)}
                </strong>
                {item.number_seat > 0 && (
                  <span className="text-slate-400 text-[11px]">
                    / {toBengaliDigits(item.number_seat)} আসন
                  </span>
                )}
              </div>

              <Link
                className="inline-flex items-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-primary hover:text-white text-primary text-xs sm:text-sm font-semibold border border-slate-200/80 transition-colors shadow-xs active:scale-98"
                to={`/academic/${item.id}`}
              >
                <span>বিস্তারিত</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

AcademicCards.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.object),
  viewMode: PropTypes.oneOf(["grid", "list"]),
  isLoading: PropTypes.bool,
};

export default AcademicCards;
