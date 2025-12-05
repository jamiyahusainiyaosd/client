// src/features/notice/components/NoticeDetails.jsx
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error";
import Loader from "../../../components/Loader";
import Time from "../../../utils/formateData";
import noticeService from "../services/notice.services";

const NoticeDetails = ({ id }) => {
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["noticeDetails", id],
    queryFn: () => noticeService.getOne(id),
  });

  const notice = data;

  if (isPending)
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" />
      </div>
    );

  if (isError)
    return <Error message={error?.message || "নোটিশ লোড করতে সমস্যা হয়েছে"} />;

  if (!notice)
    return (
      <NoDataFound message="নোটিশের তথ্য পাওয়া যায়নি" />
    );

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-xl
      border border-emerald-100/70 dark:border-emerald-700/40 overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          {notice.title}
        </h2>

        <div className="flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-300">
          <FaCalendarAlt className="text-emerald-600 dark:text-emerald-400" />
          <span>প্রকাশ: {Time(notice.created_at)}</span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-5 px-4 py-2 rounded-xl bg-gradient-to-r 
          from-emerald-600 to-emerald-500 text-white shadow hover:opacity-90 
          flex items-center gap-2">
          <FaArrowLeft />
          ফিরে যান
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed 
        whitespace-pre-line text-justify">
          {notice.description || "এই নোটিশের বিস্তারিত তথ্য নেই।"}
        </p>
      </div>
    </div>
  );
};

export default NoticeDetails;
