import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    formatNoticeDate,
    getNoticeCategoryLabel,
    getNoticeIcon,
} from "../utils/noticeUtils";

const NoticeCard = ({ notice }) => {
  const title = notice.title || "বিজ্ঞপ্তি";
  const icon = getNoticeIcon(title);
  const categoryLabel = getNoticeCategoryLabel(title);
  const formattedDate = formatNoticeDate(notice.created_at || notice.formattedDate);

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
        <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {title}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {notice.description || "বিস্তারিত তথ্যের জন্য নোটিশটি সম্পূর্ণ পড়ুন।"}
        </p>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/70 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium min-w-0 flex-1">
          <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
            calendar_today
          </span>
          <span className="truncate">{formattedDate}</span>
        </div>

        <Link
          to={`/notice/${notice.id}`}
          className="inline-flex items-center gap-1.5 py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-xl bg-white hover:bg-primary hover:text-white text-primary text-xs sm:text-sm font-semibold border border-slate-200/80 transition-colors shadow-xs active:scale-98 whitespace-nowrap shrink-0"
        >
          <span className="whitespace-nowrap">বিস্তারিত পড়ুন</span>
          <span className="material-symbols-outlined text-[16px] shrink-0">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  );
};

NoticeCard.propTypes = {
  notice: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
    formattedDate: PropTypes.string,
  }).isRequired,
};

export default NoticeCard;
