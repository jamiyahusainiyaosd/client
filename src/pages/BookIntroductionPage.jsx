import React from "react";
import PageTitle from "../utils/PageTitle";
import BookIntroduction from "../features/BookIntroduction/components/BookIntroduction";

const BookIntroductionPage = () => {
  return (
    <>
      <PageTitle title="বই পরিচিতি" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="relative">বুজুর্গানে দ্বীনের লিখা বইসমূহ</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ইসলামিক স্কলারদের রচিত মূল্যবান বইগুলোর সংক্ষিপ্ত পরিচিতি
          </p>
        </div>
        <BookIntroduction />
      </section>
    </>
  );
};

export default BookIntroductionPage;
