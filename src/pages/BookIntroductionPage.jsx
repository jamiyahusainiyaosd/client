import React from "react";
import PageTitle from "../utils/PageTitle";
import BookIntroduction from "../features/BookIntroduction/components/BookIntroduction";

const BookIntroductionPage = () => {
  return (
    <>
      <PageTitle title="বই পরিচিতি" />
      <div className="max-w-6xl w-[95%] mx-auto mt-28">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-300">
          বুজুর্গানে দ্বীনের লিখা বই সমূহ
        </h1>
        <BookIntroduction />
      </div>
    </>
  );
};

export default BookIntroductionPage;
