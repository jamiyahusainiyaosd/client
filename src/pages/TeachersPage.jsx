import PageTitle from "../utils/PageTitle";
import Teachers from "../features/teachers/components/Teachers";

const TeachersPage = () => {
  return (
    <>
      <PageTitle title="শিক্ষকবৃন্দ" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="relative">
              আমাদের শিক্ষকবৃন্দ
            </span>
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            জামিয়া হুসাইনিয়ার সম্মানিত শিক্ষকমণ্ডলী যারা দ্বীনি শিক্ষা ও আদর্শ ছাত্র গঠনে নিরলসভাবে কাজ করে যাচ্ছেন
          </p>
        </div>
        <Teachers />
      </div>
    </>
  );
};

export default TeachersPage;