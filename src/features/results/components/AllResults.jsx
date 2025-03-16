import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ResultsServices from "../services/results.services";
import Loader from "../../../components/Loader";
import Time from "../../../utils/formateData";

const fetchResults = async () => {
    const response = await ResultsServices.getAllResults();
    return response.data.sort((a, b) => new Date(a.resultCreatedAt) - new Date(b.resultCreatedAt));
};

const AllResults = () => {
    const { data: results, isLoading, error } = useQuery({
        queryKey: ["results"],
        queryFn: fetchResults,
    });

    if (isLoading) return <Loader />;
    if (error) return <p className="text-center text-red-500 mt-10">ফলাফল লোড করতে সমস্যা হয়েছে!</p>;

    return (
        <section>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {results.map((result) => (
                    <li key={result.id} className="p-4 border rounded-lg leading-8 shadow-2xl">
                        <h3 className="text-xl font-semibold">{result.studentClassName}</h3>
                        <p>📅 রেজাল্ট ক্রিয়েটেড : {Time(result.resultCreatedAt)}</p>
                        <p>📅 রেজাল্ট আপডেটেড : {Time(result.resultUpdatedAt)}</p>
                        <br />
                        <Link to={`/results/${result.id}`}>
                            <button className="button1">
                                📄 বিস্তারিত দেখুন
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default AllResults;