import React, { useState } from "react";
import PageTitle from "../utils/PageTitle";
import ClassRoutineHero from "../features/classRoutine/components/ClassRoutineHero";
import ClassRoutineTimeline from "../features/classRoutine/components/ClassRoutineTimeline";

const ClassRoutinePage = () => {
  const [activeDept, setActiveDept] = useState("");
  const [viewMode, setViewMode] = useState("routine"); // "routine" or "timeline"

  return (
    <>
      <PageTitle title="দৈনিক ক্লাস রুটিন ও সময়সারণী | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col print:p-0 print:m-0 print:min-h-0 print:h-auto print:block print:bg-white">
        {/* Top Hero Section */}
        <div className="screen-only">
          <ClassRoutineHero
            activeDept={activeDept}
            onSelectDept={setActiveDept}
            viewMode={viewMode}
            onSelectViewMode={setViewMode}
          />
        </div>

        {/* Main Body Section */}
        <section className="w-full bg-white py-8 sm:py-12 flex-1 print:p-0 print:m-0 print:min-h-0 print:h-auto print:block print:bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:max-w-full print:p-0 print:m-0">
            <ClassRoutineTimeline
              activeDept={activeDept}
              viewMode={viewMode}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default ClassRoutinePage;
