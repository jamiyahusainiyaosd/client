import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../utils/PageTitle";
import CoCurricularHero from "../features/coCurricular/components/CoCurricularHero";
import CoCurricularCards from "../features/coCurricular/components/CoCurricularCards";
import coCurricularService from "../features/coCurricular/services/coCurricular.services";

const CoCurricularPage = () => {
  const { data: allActivities } = useQuery({
    queryKey: ["coCurricular", "all"],
    queryFn: () => coCurricularService.getAllActivities("all"),
    staleTime: 1000 * 60 * 5,
  });

  const totalActivities = Array.isArray(allActivities)
    ? allActivities.length
    : allActivities?.results?.length || 10;

  return (
    <>
      <PageTitle title="সহ-পাঠ্যক্রমিক কার্যক্রম | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        {/* Top Hero Section */}
        <CoCurricularHero totalActivities={totalActivities} />

        {/* Main Body Section */}
        <section className="w-full bg-white py-8 sm:py-12 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CoCurricularCards />
          </div>
        </section>
      </main>
    </>
  );
};

export default CoCurricularPage;
