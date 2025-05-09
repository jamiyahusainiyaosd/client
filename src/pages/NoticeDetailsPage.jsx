// NoticeDetailsPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../utils/PageTitle";
import NoticeDetails from "../features/notice/components/NoticeDetails";

const NoticeDetailsPage = () => {
  const { id } = useParams();
  return (
    <>
      <PageTitle title="নোটিশ বিস্তারিত" />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-36">
        <NoticeDetails id={id} />
      </section>
    </>
  );
};

export default NoticeDetailsPage;