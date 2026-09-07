import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ErrorDisplay from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import ResultsServices from "../services/results.services";

const AllResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const page = Math.max(1, Number(rawPage) || 1);

  useEffect(() => {
    if (!rawPage) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", "1");
          return next;
        },
        { replace: true }
      );
    }
  }, [rawPage, setSearchParams]);

  const handlePageChange = (p) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

  const { data: responseData, isLoading, isError } = useQuery({
    queryKey: ["results", page],
    queryFn: async () => {
      const response = await ResultsServices.getAllResults(page);
      return response.data;
    },
  });

  const rawResults = responseData?.results || (Array.isArray(responseData) ? responseData : []);
  const results = [...rawResults].sort(
    (a, b) => new Date(b.resultCreatedAt) - new Date(a.resultCreatedAt)
  );
  const totalCount = responseData?.count || results.length;
  const totalPages = Math.ceil(totalCount / 9);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorDisplay errorMessage="ফলাফল লোড করতে সমস্যা হয়েছে!" />;
  if (!results || results.length === 0) return <NoDataFound />;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <Link
            key={result.id}
            to={`/results/${result.id}`}
            className="group flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-150 hover:shadow-md hover:border-slate-300"
          >
            {/* Icon */}
            <div className="h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug font-display">
                {result.studentClassName}
              </h3>
              <span className="mt-2.5 flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:gap-1.5 transition-all">
                বিস্তারিত দেখুন
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllResults;