import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../utils/PageTitle";
import NoticeDetails from "../features/notice/components/NoticeDetails";

const NoticeDetailsPage = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle key={"noticePage"} title={"Notice Details"} />
      <section className="max-w-[800px] w-[95%] mx-auto mt-28">
        <h1 className="text-2xl font-bold text-center mb-4">
          অত্র জামিয়ার বিস্তারিত নোটিশ
        </h1>
        <br />
        <NoticeDetails id={id} />
      </section>
    </>
  );
};

export default NoticeDetailsPage;
