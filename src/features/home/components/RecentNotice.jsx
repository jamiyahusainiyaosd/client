// RecentNotice.jsx
import { useNavigate } from "react-router-dom";
import Time from "../../../utils/formateData";

export const RecentNotice = ({ id, title, created_at }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/notice/${id}`)}
      className="group cursor-pointer flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-200  hover:bg-white  hover:shadow-sm transition-all duration-200"
    >
      {/* Icon */}
      <div className="mt-0.5 h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-emerald-50  text-emerald-600  group-hover:bg-emerald-100  transition-colors">
        <svg
          className="w-4 h-4"
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

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h2 className="text-sm sm:text-base font-medium text-slate-800  group-hover:text-emerald-700  line-clamp-2 transition-colors leading-snug">
          {title}
        </h2>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400 ">
          <svg
            className="w-3 h-3"
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

      {/* Arrow */}
      <svg
        className="w-4 h-4 mt-1 flex-shrink-0 text-slate-300  group-hover:text-emerald-500  group-hover:translate-x-0.5 transition-all duration-200"
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
    </article>
  );
};

export default RecentNotice;
