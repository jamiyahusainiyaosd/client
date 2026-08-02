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
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-slate-900 leading-snug font-display">
            {notice.title}
          </h2>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 font-mono">
            <FiCalendar size={11} className="text-emerald-600" />
            <span>প্রকাশ: {Time(notice.created_at)}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-800 hover:bg-slate-50 transition-all self-start whitespace-nowrap"
        >
          <FiArrowLeft size={14} className="text-slate-600" />
          ফিরে যান
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line text-bengali">
          {notice.description || "এই নোটিশের বিস্তারিত তথ্য নেই।"}
        </p>
      </div>
    </div>
  );
};

export default NoticeDetails;