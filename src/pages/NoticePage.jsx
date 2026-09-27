import React from "react";
import PageTitle from "../utils/PageTitle";
import Notices from "../features/notice/components/Notices";

const NoticePage = () => {
  return (
    <>
      <PageTitle title="জামিয়ার নোটিশ সমূহ | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        <Notices />
      </main>
    </>
  );
};

export default NoticePage;