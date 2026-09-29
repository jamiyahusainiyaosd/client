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
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col print:p-0 print:m-0 print:min-h-0 print:h-auto print:block print:bg-white">
        {/* Top Hero */}
        <div className="screen-only">
          <MealMenuHero onPrint={handlePrint} />
        </div>

        {/* Main Body */}
        <section className="w-full bg-white py-8 sm:py-12 flex-1 print:p-0 print:m-0 print:min-h-0 print:h-auto print:block print:bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 print:space-y-0 print:max-w-full print:p-0 print:m-0">
            {isLoading ? (
              <div className="py-20 flex justify-center">
                <Loader />
              </div>
            ) : (
              <>
                {/* ========================================================================= */}
                {/* PRINT-ONLY OFFICIAL 1-PAGE MEAL MENU DOCUMENT                             */}
                {/* ========================================================================= */}
                <div className="print-only">
                  <div className="border-b-2 border-emerald-900 pb-2 mb-3 flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-black text-emerald-950">জামিয়া হুসাইনিয়া মাদরাসা</h1>
                      <p className="text-[11px] text-slate-600">শায়েস্তাগঞ্জ, হবিগঞ্জ • দারুল ইতআম (লিল্লাহ বোর্ডিং ও পাকশালা)</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-800 text-emerald-900 bg-emerald-50">
                        সাপ্তাহিক অনুমোদিত খাদ্য তালিকা
                      </span>
                      <p className="text-[9px] text-slate-500 mt-0.5">
                        শিক্ষাবর্ষ: ২০২৫ — ২০২৬ • ৭ দিনের আহার সূচি
                      </p>
                    </div>
                  </div>

                  <table className="w-full print-table text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-[8.5pt]">
                        <th className="py-1.5 px-3 w-28">বার / দিন</th>
                        <th className="py-1.5 px-3">সকালের নাস্তা</th>
                        <th className="py-1.5 px-3">দুপুরের খাবার</th>
                        <th className="py-1.5 px-3">রাতের খাবার</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-300 text-[8pt]">
                      {mealMenus.map((day, idx) => (
                        <tr key={day.id || idx} className="print-avoid-break">
                          <td className="py-1.5 px-3 font-bold text-emerald-950 whitespace-nowrap">
                            {day.day_name || day.day}
                          </td>
                          <td className="py-1.5 px-3 text-slate-800">
                            {day.breakfast_menu || day.breakfast || "—"}
                          </td>
                          <td className="py-1.5 px-3 text-slate-800">
                            {day.lunch_menu || day.lunch || "—"}
                          </td>
                          <td className="py-1.5 px-3 text-slate-800">
                            {day.dinner_menu || day.dinner || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Official Signatures */}
                  <div className="mt-4 pt-3 border-t border-slate-300 flex justify-between items-end text-[8.5pt] text-slate-700 print-avoid-break">
                    <div className="text-center flex flex-col items-center">
                      <div className="h-10"></div>
                      <div className="w-32 border-t border-slate-500 mb-1"></div>
                      <p className="font-semibold text-slate-800">পাকশালা তত্ত্বাবধায়ক</p>
                      <p className="text-[7.5pt] text-slate-500">মেস পরিচালক</p>
                    </div>
                    <div className="text-center flex flex-col items-center">
                      <div className="h-10 flex items-end justify-center mb-0.5">
                        <img
                          src="/signature_transparent.webp"
                          alt="মুহতামিমের স্বাক্ষর"
                          className="h-9 w-auto object-contain"
                        />
                      </div>
                      <div className="w-32 border-t border-slate-500 mb-1"></div>
                      <p className="font-bold text-slate-900">মুহতামিম</p>
                      <p className="text-[7.5pt] text-slate-500">জামিয়া হুসাইনিয়া মাদরাসা</p>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* SCREEN-ONLY INTERACTIVE UI                                                */}
                {/* ========================================================================= */}
                <div className="screen-only space-y-10">
                  {/* 1. Today's Live Highlight Card */}
                  <TodayMealHighlight mealMenus={mealMenus} />

                  {/* 2. Serving Timing Cards */}
                  <MealTimingCards timings={mealTimings} />

                  {/* 3. 7 Days Authentic Meal Table */}
                  <MealMenuTable mealMenus={mealMenus} />

                  {/* 4. Dining Guidelines & Rules */}
                  <MealRulesList rules={mealRules} />
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default MealMenuPage;
