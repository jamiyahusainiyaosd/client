import React from "react";
import PageTitle from "../utils/PageTitle";
import NoticeDetails from "../features/notice/components/NoticeDetails";

const NoticeDetailsPage = () => {
  return (
    <>
      <PageTitle title="নোটিশ বিস্তারিত | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        <NoticeDetails />
      </main>
    </>
  );
};

export default NoticeDetailsPage;