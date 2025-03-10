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
      <PageTitle key={"aboutPage"} title={"About"} />
      <section className="max-w-[1144px] w-[95%] mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-6 whitespace-nowrap">
          মাদ্রাসার সম্পর্কে বিস্তারিত
        </h2>

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
      </section>
    </>
  );
};

export default About;
