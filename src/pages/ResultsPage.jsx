import React from "react";
import PageTitle from "../utils/PageTitle";
import AllResults from "../features/results/components/AllResults";

const ResultsPage = () => {
  return (
    <>
      <PageTitle title="মাদ্রাসার প্রকাশিত ফলাফল | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        <AllResults />
      </main>
    </>
  );
};

export default ResultsPage;