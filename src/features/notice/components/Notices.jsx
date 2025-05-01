import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import Error from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import noticeService from "../services/notice.services";
import Notice from "./Notice";

const toBengaliNumeral = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
};

const Notices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 9;

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["notices"],
    queryFn: noticeService.getAll,
    retry: 2, 
    staleTime: 60000 
  });

  const refinedData = useMemo(() => data?.data ?? [], [data]);

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = refinedData.slice(indexOfFirstNotice, indexOfLastNotice);
  const totalPages = Math.ceil(refinedData.length / noticesPerPage);

  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="notices-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">
          মোট নোটিশ : {toBengaliNumeral(refinedData.length)}
        </h2>
        
        {refinedData.length > noticesPerPage && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md text-sm sm:text-base ${
                currentPage === 1 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              পূর্ববর্তী
            </button>
            
            <span className="px-3 py-2 bg-gray-800 rounded-md text-white text-sm sm:text-base">
              পাতা {toBengaliNumeral(currentPage)} / {toBengaliNumeral(totalPages)}
            </span>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md text-sm sm:text-base ${
                currentPage === totalPages 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              পরবর্তী
            </button>
          </div>
        )}
      </div>

      {isPending ? (
        <Loader />
      ) : isError ? (
        <Error message={error.message || "ডাটা লোড করতে সমস্যা হয়েছে"} />
      ) : refinedData.length === 0 ? (
        <NoDataFound message="কোন নোটিশ পাওয়া যায়নি" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentNotices.map((notice) => (
            <Notice 
              key={notice.id} 
              id={notice.id} 
              title={notice.title} 
              created_at={notice.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notices;