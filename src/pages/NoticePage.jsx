import PageTitle from "../utils/PageTitle";
import Notices from "../features/notice/components/Notices";

const NoticePage = () => {
  return (
    <>
      <PageTitle title="নোটিশ সমূহ" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            জামিয়ার নোটিশ সমূহ
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            সকল প্রকার অফিসিয়াল নোটিশ ও বিজ্ঞপ্তি
          </p>
        </div>
        <Notices />
      </section>
    </>
  );
};

export default NoticePage;