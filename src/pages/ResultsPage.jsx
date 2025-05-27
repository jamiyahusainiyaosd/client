import PageTitle from "../utils/PageTitle";
import AllResults from "../features/results/components/AllResults";

const ResultsPage = () => {
  return (
    <>
      <PageTitle title="ফলাফল প্রকাশ" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="relative">
              ফলাফল প্রকাশ
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            আমাদের মাদ্রাসার বিভিন্ন ক্লাসের প্রকাশিত ফলাফল
          </p>
        </div>
        <AllResults />
      </section>
    </>
  );
};

export default ResultsPage;