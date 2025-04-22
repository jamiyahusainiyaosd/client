import React from "react";
import PageTitle from "../utils/PageTitle";
import AllResults from "../features/results/components/AllResults";

const ResultsPage = () => (
    <>
        <PageTitle title="ফলাফল প্রকাশ" />
        <section className="max-w-6xl w-[95%] mx-auto mt-28">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-300">ফলাফল প্রকাশ</h1>
            <AllResults />
        </section>
    </>
);

export default ResultsPage;