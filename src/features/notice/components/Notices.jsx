// src/features/notice/components/Notices.jsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Error from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import noticeService from "../services/notice.services";
import Notice from "./Notice";

const Notices = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["notices", currentPage],
    queryFn: () => noticeService.getAll(currentPage),
  });

  const refinedData = data?.results || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / 9);

  return (
    <div className="space-y-10">

      {/* Count */}
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
        মোট প্রকাশিত নোটিশ:{" "}
        <span className="text-emerald-600 dark:text-emerald-400">{totalCount}</span>
      </h2>

      {/* Loading */}
      {isPending && (
        <div className="flex justify-center py-16">
          <Loader size="lg" />
        </div>
      )}

      {/* Error */}
      {isError && <Error message={error?.message} />}

      {/* No Data */}
      {refinedData.length === 0 && !isPending && (
        <div className="rounded-2xl p-8 bg-white/90 dark:bg-slate-900/90 shadow-xl 
        border border-emerald-100/70 dark:border-emerald-700/40 text-center">
          <NoDataFound message="কোনো নোটিশ পাওয়া যায়নি" />
        </div>
      )}

      {/* Grid */}
      {refinedData.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {refinedData.map((item) => (
              <Notice key={item.id} {...item} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              totalCount={totalCount}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Notices;
