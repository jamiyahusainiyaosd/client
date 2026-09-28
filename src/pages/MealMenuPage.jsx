import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../utils/PageTitle";
import MealMenuHero from "../features/meal-menu/components/MealMenuHero";
import TodayMealHighlight from "../features/meal-menu/components/TodayMealHighlight";
import MealTimingCards from "../features/meal-menu/components/MealTimingCards";
import MealMenuTable from "../features/meal-menu/components/MealMenuTable";
import MealRulesList from "../features/meal-menu/components/MealRulesList";
import mealMenuService from "../features/meal-menu/services/mealMenu.services";
import Loader from "../components/Loader";

const MealMenuPage = () => {
  const { data: mealMenus = [], isLoading: isMenusLoading } = useQuery({
    queryKey: ["mealMenus"],
    queryFn: mealMenuService.getMealMenus,
    staleTime: 1000 * 60 * 5,
  });

  const { data: mealTimings = [], isLoading: isTimingsLoading } = useQuery({
    queryKey: ["mealTimings"],
    queryFn: mealMenuService.getMealTimings,
    staleTime: 1000 * 60 * 5,
  });

  const { data: mealRules = [], isLoading: isRulesLoading } = useQuery({
    queryKey: ["mealRules"],
    queryFn: mealMenuService.getMealRules,
    staleTime: 1000 * 60 * 5,
  });

  const handlePrint = () => {
    window.print();
  };

  const isLoading = isMenusLoading || isTimingsLoading || isRulesLoading;

  return (
    <>
      <PageTitle title="আবাসিক শিক্ষার্থীদের দৈনিক খাবার তালিকা | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        {/* Top Hero */}
        <MealMenuHero onPrint={handlePrint} />

        {/* Main Body */}
        <section className="w-full bg-white py-8 sm:py-12 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {isLoading ? (
              <div className="py-20 flex justify-center">
                <Loader />
              </div>
            ) : (
              <>
                {/* 1. Today's Live Highlight Card */}
                <TodayMealHighlight mealMenus={mealMenus} />

                {/* 2. Serving Timing Cards */}
                <MealTimingCards timings={mealTimings} />

                {/* 3. 7 Days Authentic Meal Table */}
                <MealMenuTable mealMenus={mealMenus} />

                {/* 4. Dining Guidelines & Rules */}
                <MealRulesList rules={mealRules} />
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default MealMenuPage;
