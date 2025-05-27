import PageTitle from "../utils/PageTitle";
import AllAcademics from "../features/academics/components/AllAcademics";

const Academics = () => {
  return (
    <>
      <PageTitle title="একাডেমিক তথ্য" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="relative">
              আমাদের একাডেমিক ক্লাসসমূহ
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            মাদ্রাসার সকল একাডেমিক ক্লাসের বিস্তারিত তথ্য
          </p>
        </div>
        <AllAcademics />
      </section>
    </>
  );
};

export default Academics;