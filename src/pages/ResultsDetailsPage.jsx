import React from "react";
import PageTitle from "../utils/PageTitle";
import ResultsDetails from "../features/results/components/ResultsDetails";

const ResultsDetailsPage = () => (
    <>
        <PageTitle title="ফলাফল বিস্তারিত" />
        <section className="max-w-6xl w-[95%] mx-auto mt-32">
            <h1 className="text-3xl font-bold text-center mb-8 text-cyan-400">ফলাফল বিস্তারিত</h1>
            <ResultsDetails />
        </section>
    </>
);

export default ResultsDetailsPage;