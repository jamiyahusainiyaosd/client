import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../utils/PageTitle";
import BoardingHero from "../features/boarding/components/BoardingHero";
import BoardingQuickStats from "../features/boarding/components/BoardingQuickStats";
import BoardingRulesList from "../features/boarding/components/BoardingRulesList";
import boardingService from "../features/boarding/services/boarding.services";

const BoardingPolicyPage = () => {
  const { data: allRules } = useQuery({
    queryKey: ["boardingRules", "all"],
    queryFn: () => boardingService.getAllRules("all"),
    staleTime: 1000 * 60 * 5,
  });

  const totalRules = Array.isArray(allRules)
    ? allRules.length
    : allRules?.results?.length || 26;

  return (
    <>
      <PageTitle title="আবাসিক নীতিমালা ও আচরণবিধি | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col print:p-0 print:m-0 print:min-h-0 print:h-auto print:block print:bg-white">
        {/* Top Hero Section */}
        <div className="screen-only">
          <BoardingHero totalRules={totalRules} />
        </div>

        {/* Main Body Section */}
        <section className="w-full bg-white py-8 sm:py-12 flex-1 print:p-0 print:m-0 print:min-h-0 print:h-auto print:block print:bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:max-w-full print:p-0 print:m-0">
            <div className="screen-only">
              <BoardingQuickStats />
            </div>
            <BoardingRulesList />
          </div>
        </section>
      </main>
    </>
  );
};

export default BoardingPolicyPage;
