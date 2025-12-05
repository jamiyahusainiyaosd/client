// src/features/notice/components/Notice.jsx
import { useNavigate } from "react-router-dom";
import Time from "../../../utils/formateData";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const Notice = ({ title, created_at, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/notice/${id}`)}
      className="cursor-pointer bg-white/90 dark:bg-slate-900/90 
      border border-emerald-100/70 dark:border-emerald-700/40 
      rounded-3xl shadow-md hover:shadow-emerald-600/30 
      hover:-translate-y-1 transition-all duration-300 overflow-hidden 
      group p-6 flex flex-col"
    >
      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white 
        mb-3 line-clamp-2 group-hover:text-emerald-600 
        dark:group-hover:text-emerald-300 transition-colors">
        {title}
      </h3>

      {/* Date */}
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
        <FaCalendarAlt className="text-emerald-600 dark:text-emerald-400" />
        <span>{Time(created_at)}</span>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 
          flex items-center justify-between">
        <span className="text-emerald-600 dark:text-emerald-300 font-medium">
          বিস্তারিত দেখুন
        </span>
        <FaArrowRight className="text-emerald-600 dark:text-emerald-300" />
      </div>
    </div>
  );
};

export default Notice;
