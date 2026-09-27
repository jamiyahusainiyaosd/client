import React from "react";
import PageTitle from "../utils/PageTitle";
import ResultsDetails from "../features/results/components/ResultsDetails";

const ResultsDetailsPage = () => {
  return (
    <>
      <PageTitle title="জামাতের প্রকাশিত ফলাফল | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        <ResultsDetails />
      </main>
    </>
  );
};

export default ResultsDetailsPage;