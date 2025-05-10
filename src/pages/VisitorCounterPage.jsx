import PageTitle from "../utils/PageTitle";
import VisitorCounter from "../features/VisitorCounter/components/VisitorCounter";

const VisitorCounterPage = () => {
  return (
    <>
      <PageTitle title="ভিজিটর কাউন্টার" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="relative">
              ওয়েবসাইট পরিসংখ্যান
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            আমাদের ওয়েবসাইটে মোট ভিজিটরের সংখ্যা
          </p>
        </div>
        <VisitorCounter />
      </div>
    </>
  );
};

export default VisitorCounterPage;
