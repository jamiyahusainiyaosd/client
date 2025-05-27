import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import NoDataFound from "../../../components/NoDataFound";
import Time from "../../../utils/formateData";
import ResultsServices from "../services/results.services";
import { HiOutlineDocumentText } from "react-icons/hi";

const AllResults = () => {
  const { data: results, isLoading, isError } = useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const response = await ResultsServices.getAllResults();
      return response.data.sort(
        (a, b) => new Date(b.resultCreatedAt) - new Date(a.resultCreatedAt)
      );
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" variant="pulse" />
      </div>
    );
  }

  if (isError) {
    return <Error message="ফলাফল লোড করতে সমস্যা হয়েছে!" fullWidth />;
  }

  return (
    <div className="space-y-6">
      {results?.length === 0 ? (
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
          <NoDataFound message="কোনো ফলাফল পাওয়া যায়নি" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results?.map((result) => (
            <Link
              key={result.id}
              to={`/results/${result.id}`}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-black text-white dark:bg-white dark:text-black p-3 rounded-lg shadow-md">
                    <HiOutlineDocumentText className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                      {result.studentClassName}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-1">
                      <FaCalendarAlt className="text-sm" />
                      <span className="text-sm">{Time(result.resultCreatedAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                    বিস্তারিত দেখুন →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllResults;