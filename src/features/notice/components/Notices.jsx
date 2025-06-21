import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Error from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import noticeService from "../services/notice.services";
import Notice from "./Notice";

const Notices = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const noticesPerPage = 9;

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["notices"],
    queryFn: noticeService.getAll,
    retry: 2,
    staleTime: 60000,
  });

  const refinedData = useMemo(() => data?.data ?? [], [data]);
  const totalPages = Math.ceil(refinedData.length / noticesPerPage);
  const currentNotices = refinedData.slice(
    currentPage * noticesPerPage,
    (currentPage + 1) * noticesPerPage
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          মোট নোটিশ: {refinedData.length}
        </h2>
      </div>

      {isPending ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" variant="pulse" />
        </div>
      ) : isError ? (
        <Error message={error.message || "ডাটা লোড করতে সমস্যা হয়েছে"} />
      ) : refinedData.length === 0 ? (
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
          <NoDataFound message="কোন নোটিশ পাওয়া যায়নি" />
        </div>
      ) : (
        <>
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

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              items={refinedData} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default Notices;