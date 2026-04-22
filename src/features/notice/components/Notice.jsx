import { useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import Time from "../../../utils/formateData";

const Notice = ({ title, created_at, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/notice/${id}`)}
      className="group cursor-pointer flex flex-col rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm p-5 hover:border-emerald-200 dark:hover:border-emerald-800/60 hover:bg-white dark:hover:bg-slate-800/60 hover:shadow-sm transition-all duration-200"
    >
      {/* Title */}
      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug flex-1">
        {title}
      </h3>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <FiCalendar size={11} />
          {Time(created_at)}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-500 group-hover:gap-2 transition-all">
          বিস্তারিত
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Notice;