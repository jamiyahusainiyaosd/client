import React, { useState } from "react";
import PageTitle from "../utils/PageTitle";
import ExamRoutineHero from "../features/examRoutine/components/ExamRoutineHero";
import ExamRoutineTable from "../features/examRoutine/components/ExamRoutineTable";

const ExamRoutinePage = () => {
  const [activeSession, setActiveSession] = useState("");

  return (
    <>
      <PageTitle title="পরীক্ষার রুটিন ও সময়সূচি | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        {/* Top Hero Section */}
        <ExamRoutineHero
          activeSession={activeSession}
          onSelectSession={setActiveSession}
        />

        {/* Main Body Section */}
        <section className="w-full bg-white py-8 sm:py-12 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ExamRoutineTable activeSession={activeSession} />
          </div>
        </section>
      </main>
    </>
  );
};

export default ExamRoutinePage;
