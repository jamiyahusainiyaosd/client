import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import Time from "../../../utils/formateData";
import ResultsServices from "../services/results.services";
import { FaChalkboardTeacher } from "react-icons/fa";

const fetchResults = async () => {
  const response = await ResultsServices.getAllResults();
  return response.data.sort(
    (a, b) => new Date(b.resultCreatedAt) - new Date(a.resultCreatedAt)
  );
};

const AllResults = () => {
  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["results"],
    queryFn: fetchResults,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="bg-red-900/50 text-red-300 p-4 rounded-lg text-center">
        ফলাফল লোড করতে সমস্যা হয়েছে!
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((result) => (
        <div
          key={result.id}
          className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-blue-300 transition-all duration-300 flex flex-col h-full"
        >
          <div className="flex items-start gap-4 mb-4 flex-grow">
            <div className="bg-gradient-to-br from-blue-500 to-blue-400 p-3 rounded-xl shadow-md">
              <FaChalkboardTeacher className="text-white text-2xl" />
            </div>
            <div>
              <a className="text-xl font-semibold text-gray-100 hover:text-blue-300 transition-colors duration-200">
                {result.studentClassName}
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                <FaCalendarAlt className="text-blue-300" />
                <span>{Time(result.resultCreatedAt)}</span>
              </div>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-gray-600">
            <Link to={`/results/${result.id}`}>
              <div className="mt-auto border-gray-700/50 group-hover:border-cyan-400/30 transition-colors duration-300">
                <button className="button1">📄 বিস্তারিত দেখুন</button>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllResults;
