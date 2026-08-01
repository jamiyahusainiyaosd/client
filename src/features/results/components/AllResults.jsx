import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ErrorDisplay from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import ResultsServices from "../services/results.services";

const AllResults = () => {
  const { data: results, isLoading, isError } = useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const response = await ResultsServices.getAllResults();
      return response.data.sort(
        (a, b) => new Date(b.resultCreatedAt) - new Date(a.resultCreatedAt)
      );
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorDisplay errorMessage="ফলাফল লোড করতে সমস্যা হয়েছে!" />;
  if (!results || results.length === 0) return <NoDataFound />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <Link
          key={result.id}
          to={`/results/${result.id}`}
          className="group flex items-start gap-4 rounded-2xl border border-slate-200/80  bg-white/70  backdrop-blur-sm p-5 hover:border-emerald-200  hover:bg-white  hover:shadow-sm transition-all duration-200"
        >
          {/* Icon */}
          <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-emerald-50  text-emerald-600  group-hover:bg-emerald-100  transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900  group-hover:text-emerald-700  transition-colors leading-snug">
              {result.studentClassName}
            </h3>
            <span className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600  group-hover:gap-2 transition-all">
              বিস্তারিত দেখুন
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllResults;