// NoticeDetails.jsx
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error";
import Loader from "../../../components/Loader";
import Time from "../../../utils/formateData";
import noticeService from "../services/notice.services";

const NoticeDetails = ({ id }) => {
  const navigate = useNavigate();
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["noticeDetails", id],
    queryFn: () => noticeService.getOne(id),
  });
  const refinedData = data?.data;

  return (
    <div className="space-y-6">
      {isPending && (
        <div className="flex justify-center py-12">
          <Loader size="lg" variant="pulse" />
        </div>
      )}

      {isError && (
        <Error message={error.message || "নোটিশ লোড করতে সমস্যা হয়েছে"} />
      )}

      {!isPending && refinedData && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {refinedData.title}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>প্রকাশ: {Time(refinedData.created_at)}</span>
                  </div>
                  {refinedData.updated_at !== refinedData.created_at && (
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      <span>আপডেট: {Time(refinedData.updated_at)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <br />
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaArrowLeft />
              ফিরে যান
            </button>
          </div>

          <div className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 text-justify dark:text-gray-300 whitespace-pre-line">
                {refinedData.description || "এই নোটিশের বিস্তারিত তথ্য নেই।"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeDetails;
