import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  getCategoryLabel,
  getIconForResultClass,
  getResultDetailsMetadata,
} from "../utils/resultsUtils";

const ResultsCard = ({ result }) => {
  const className = result.studentClassName || "জামাত";
  const icon = result.icon || getIconForResultClass(className);
  const meta = getResultDetailsMetadata(className, result.studentClassDescription);
  const categoryLabel = getCategoryLabel(className);

  return (
    <article className="group bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-5 sm:p-6 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-200/80 text-primary flex items-center justify-center shrink-0 shadow-xs group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[22px] sm:text-[24px]">
              {icon}
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-white text-emerald-800 border border-emerald-200/80 text-xs font-semibold shrink-0 shadow-xs">
            {categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
          {className}
        </h2>

        {/* Session / Tagline */}
        <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
          {result.studentClassDescription ||
            result.description ||
            meta.syllabusDesc ||
            "বার্ষিক পরীক্ষার সম্পূর্ণ ফলাফল ও ছাত্রভিত্তিক পৃথক মার্কশীট ও তালীমী রিপোর্ট।"}
        </p>

        {/* Dynamic Exam Session Badge */}
        <div className="mt-2.5 bg-white/70 rounded-lg p-2 border border-slate-200/60 flex items-center justify-between text-[11px] sm:text-xs text-slate-600">
          <span className="flex items-center gap-1 text-slate-700 font-medium truncate">
            <span className="material-symbols-outlined text-[15px] text-primary shrink-0">
              event_note
            </span>
            <span className="truncate">{result.exam_session || meta.examSession}</span>
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/70 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
          <span className="material-symbols-outlined text-[17px] text-primary">
            verified
          </span>
          <span className="text-slate-800 font-semibold">ফলাফল প্রকাশিত</span>
        </div>

        <Link
          to={`/results/${result.id}`}
          className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-white hover:bg-primary hover:text-white text-primary text-xs sm:text-sm font-semibold border border-slate-200/80 transition-colors shadow-xs active:scale-98"
        >
          <span>ফলাফল দেখুন</span>
          <span className="material-symbols-outlined text-[16px]">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  );
};

ResultsCard.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    studentClassName: PropTypes.string,
    studentClassDescription: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default ResultsCard;
