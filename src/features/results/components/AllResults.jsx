import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ResultsServices from "../services/results.services";
import Loader from "../../../components/Loader";
import Time from "../../../utils/formateData";
import { FaCalendarAlt, FaFileAlt } from "react-icons/fa";

const fetchResults = async () => {
    const response = await ResultsServices.getAllResults();
    return response.data.sort((a, b) => new Date(a.resultCreatedAt) - new Date(b.resultCreatedAt));
};

const AllResults = () => {
    const { data: results, isLoading, error } = useQuery({
        queryKey: ["results"],
        queryFn: fetchResults,
    });

    if (isLoading) return (
        <div className="flex justify-center py-12">
            <Loader />
        </div>
    );

    if (error) return (
        <div className="bg-red-900/50 text-red-300 p-4 rounded-lg text-center">
            ফলাফল লোড করতে সমস্যা হয়েছে!
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
                <div key={result.id} className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-cyan-400 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="bg-cyan-600 p-3 rounded-lg">
                            <FaFileAlt className="text-white text-xl" />
                        </div>
                        <div>
                            <Link  to={`/results/${result.id}`} className="text-xl font-semibold text-gray-100">{result.studentClassName}</Link>
                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                <FaCalendarAlt className="text-amber-400" />
                                <span>{Time(result.resultCreatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllResults;