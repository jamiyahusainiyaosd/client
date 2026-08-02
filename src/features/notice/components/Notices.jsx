import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ErrorDisplay from "../../../components/Error";
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
    <div className="space-y-6">
      {/* Count */}
      <p className="text-xs text-slate-500 font-mono">
        মোট{" "}
        <span className="font-semibold text-slate-900">{totalCount}</span>{" "}
        টি নোটিশ প্রকাশিত
      </p>

      {isPending && <Loader />}

      {isError && <ErrorDisplay errorMessage={error?.message} />}

      {!isPending && !isError && refinedData.length === 0 && <NoDataFound />}

      {refinedData.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {refinedData.map((item) => (
              <Notice key={item.id} {...item} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalCount={totalCount}
          />
        </>
      )}
    </div>
  );
};

export default Notices;