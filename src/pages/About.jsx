import React from "react";
import PageTitle from "../utils/PageTitle";
import FounderInfo from "../features/about/components/FounderInfo";
import IntroductionInfo from "../features/about/components/IntroductionInfo";
import FirstLooksInfo from "../features/about/components/FirstLooksInfo";
import AimsAndObjectivesInfo from "../features/about/components/AimsAndObjectivesInfo";
import DepartmentInfo from "../features/about/components/DepartmentInfo";
import CharacteristicsInfo from "../features/about/components/CharacteristicsInfo";
import FutureEducationPlan from "../features/about/components/FutureEducationPlan";
import FutureDevelopmentPlan from "../features/about/components/FutureDevelopmentPlan";
import TheWordInfo from "../features/about/components/TheWordInfo";

const About = () => {
  return (
    <>
      <PageTitle key={"aboutPage"} title={"মাদ্রাসা সম্পর্কে"} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="relative">
              মাদ্রাসার সম্পর্কে বিস্তারিত
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 dark:bg-blue-400 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জের ইতিহাস, লক্ষ্য ও ভবিষ্যৎ পরিকল্পনা
            সম্পর্কে জানুন
          </p>
        </div>

        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            <FounderInfo />
            <IntroductionInfo />
          </div>

          <FirstLooksInfo />

          <div className="grid md:grid-cols-2 gap-8">
            <AimsAndObjectivesInfo />
            <CharacteristicsInfo />
          </div>

          <DepartmentInfo />

          <div className="grid md:grid-cols-2 gap-8">
            <FutureEducationPlan />
            <FutureDevelopmentPlan />
          </div>

          <TheWordInfo />
        </div>
      </div>
    </>
  );
};

export default About;
