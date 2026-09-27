import React from "react";
import PageTitle from "../utils/PageTitle";
import FinancialReport from "../features/financialReport/components/financialReport";

const FinancialReportPage = () => {
  return (
    <>
      <PageTitle title="স্বচ্ছ আর্থিক ব্যবস্থাপনা ও অডিট রিপোর্ট | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen">
        <FinancialReport />
      </main>
    </>
  );
};

export default FinancialReportPage;