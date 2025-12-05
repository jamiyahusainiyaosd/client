import { useNavigate } from "react-router-dom";
import Time from "../../../utils/formateData";

const RecentNotice = ({ id, title, created_at }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/notice/${id}`)}
      className="group cursor-pointer rounded-2xl border border-slate-100 bg-white/95 dark:bg-slate-900/95 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-emerald-400/80 transition-all duration-200 p-4 sm:p-5"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 line-clamp-2">
            {title}
          </h2>
          <p className="mt-2 flex items-center text-xs text-slate-500 dark:text-slate-400">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {Time(created_at)}
          </p>
        </div>

        <div className="hidden sm:flex">
          <svg
            className="w-5 h-5 mt-1 text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </article>
  );
};

export default RecentNotice;
