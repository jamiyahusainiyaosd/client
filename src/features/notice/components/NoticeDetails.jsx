import { useQuery } from "@tanstack/react-query";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ErrorDisplay from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import Time from "../../../utils/formateData";
import noticeService from "../services/notice.services";

const NoticeDetails = ({ id }) => {
  const navigate = useNavigate();

  const { data: notice, isPending, isError, error } = useQuery({
    queryKey: ["noticeDetails", id],
    queryFn: () => noticeService.getOne(id),
  });

  if (isPending) return <Loader />;
  if (isError) return <ErrorDisplay errorMessage={error?.message || "নোটিশ লোড করতে সমস্যা হয়েছে"} />;
  if (!notice) return <NoDataFound />;

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
            {notice.title}
          </h2>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-400 dark:text-slate-500">
            <FiCalendar size={11} />
            <span>প্রকাশ: {Time(notice.created_at)}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-200 dark:hover:border-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all self-start whitespace-nowrap"
        >
          <FiArrowLeft size={14} />
          ফিরে যান
        </button>
      </div>

      {/* Content */}
      <div className="px-5 py-5">
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-justify">
          {notice.description || "এই নোটিশের বিস্তারিত তথ্য নেই।"}
        </p>
      </div>
    </div>
  );
};

export default NoticeDetails;