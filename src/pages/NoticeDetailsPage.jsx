import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../utils/PageTitle";
import NoticeDetails from "../features/notice/components/NoticeDetails";

const NoticeDetailsPage = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle key={"noticePage"} title={"নোটিশ বিস্তারিত"} />
      <section className="max-w-[800px] w-[95%] mx-auto mt-28 mb-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-300">
          অত্র জামিয়ার বিস্তারিত নোটিশ
        </h1>
        <NoticeDetails id={id} />
      </section>
    </>
  );
};

export default NoticeDetailsPage;