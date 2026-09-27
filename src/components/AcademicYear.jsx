import React from "react";
import PropTypes from "prop-types";

import { getAcademicYear } from "../utils/academicYear";

/**
 * Main AcademicYear Component
 * Usage:
 *   <AcademicYear /> -> "২০২৬ — ২০২৭" (or current dynamic academic year)
 *   <AcademicYear prefix="শিক্ষাবর্ষ: " />
 */
const AcademicYear = ({ prefix = "", suffix = "", separator = " — ", className = "" }) => {
  const yearString = getAcademicYear(separator);
  return (
    <span className={className}>
      {prefix}
      {yearString}
      {suffix}
    </span>
  );
};

AcademicYear.propTypes = {
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  separator: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Reusable Academic Year Stat/Hero Card (Matches Screenshot 4)
 */
export const AcademicYearCard = ({
  title = "বর্তমান শিক্ষাবর্ষ",
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex items-center gap-3.5 ${className}`}
    >
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[24px]">
          calendar_month
        </span>
      </div>
      <div>
        <p className="text-xs text-slate-600 font-medium">{title}</p>
        <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
          <AcademicYear />
        </p>
      </div>
    </div>
  );
};

AcademicYearCard.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default AcademicYear;
