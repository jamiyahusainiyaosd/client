import React from "react";
import PageTitle from "../utils/PageTitle";
import FinancialReport from "../features/financialReport/components/financialReport";

const FinancialReportPage = () => {
  return (
    <>
      <PageTitle title="আর্থিক প্রতিবেদন" />
      <section className="max-w-4xl w-[95%] mx-auto mt-28">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-300">
          আর্থিক প্রতিবেদন
        </h1>
        <FinancialReport />
      </section>
    </>
  );
};

export default FinancialReportPage;
