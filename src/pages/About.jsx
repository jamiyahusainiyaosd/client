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
      <section className="max-w-[1144px] w-[95%] mt-28 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-300">
          মাদ্রাসার সম্পর্কে বিস্তারিত
        </h2>

        <div className="space-y-8">
          {/* প্রতিষ্ঠাতা */}
          <FounderInfo />

          {/* ভূমিকা */}
          <IntroductionInfo />

          {/* এক নজরে জামিয়া হুসাইনিয়া */}
          <FirstLooksInfo />

          {/* লক্ষ্য ও উদ্দেশ্য */}
          <AimsAndObjectivesInfo />

          {/* তারবিয়ত বা ছাত্রগঠন বিভাগ */}
          <DepartmentInfo />

          {/* বৈশিষ্ট্যসমূহ */}
          <CharacteristicsInfo />

          {/* ভবিষ্যৎ শিক্ষা পরিকল্পনা */}
          <FutureEducationPlan />

          {/* ভবিষ্যৎ উন্নয়ন পরিকল্পনা */}
          <FutureDevelopmentPlan />

          {/* বাণী */}
          <TheWordInfo />
        </div>
      </section>
    </>
  );
};

export default About;