// src/features/results/components/AllResults.jsx
import { useQuery } from "@tanstack/react-query";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import NoDataFound from "../../../components/NoDataFound";
import ResultsServices from "../services/results.services";

const AllResults = () => {
  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const response = await ResultsServices.getAllResults();
      return response.data.sort(
        (a, b) => new Date(b.resultCreatedAt) - new Date(a.resultCreatedAt)
      );
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-16">
        <Loader size="lg" />
      </div>
    );

  if (isError)
    return <Error message="ফলাফল লোড করতে সমস্যা হয়েছে!" fullWidth />;

  if (!results || results.length === 0)
    return (
      <div
        className="bg-white/80 dark:bg-slate-900/80 border border-emerald-200 
      dark:border-emerald-700 rounded-3xl p-8 shadow-xl text-center"
      >
        <NoDataFound message="কোনো ফলাফল পাওয়া যায়নি" />
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {results.map((result) => (
        <Link
          key={result.id}
          to={`/results/${result.id}`}
          className="group bg-white/90 dark:bg-slate-900/90 border border-emerald-100/70 
          dark:border-emerald-700/40 rounded-3xl shadow-md shadow-emerald-900/10
          hover:shadow-emerald-600/40 transition-all duration-300 p-6 hover:-translate-y-1 
          relative overflow-hidden"
        >
          {/* Subtle glow */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-emerald-200/10 
            to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>

          <div className="flex items-start gap-4 mb-6">
            <div
              className="bg-gradient-to-br from-emerald-600 to-emerald-400 text-white 
              dark:from-emerald-700 dark:to-emerald-500 p-3 rounded-xl shadow-lg"
            >
              <HiOutlineDocumentText className="text-2xl" />
            </div>

            <h3
              className="text-xl font-bold text-slate-900 dark:text-slate-50 
              group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition"
            >
              {result.studentClassName}
            </h3>
          </div>

          <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between">
            <span className="text-emerald-600 dark:text-emerald-300 font-medium group-hover:underline">
              বিস্তারিত দেখুন →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllResults;
