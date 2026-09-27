import React from "react";
import PageTitle from "../utils/PageTitle";
import Teachers from "../features/teachers/components/Teachers";

const TeachersPage = () => {
  return (
    <>
      <PageTitle title="আমাদের সম্মানিত শিক্ষকবৃন্দ | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        <Teachers />
      </main>
    </>
  );
};

export default TeachersPage;