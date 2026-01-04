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

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">
          {/* Page header */}
          <section className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              মাদ্রাসা সম্পর্কে
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ –{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                ইতিহাস, বৈশিষ্ট্য ও পরিকল্পনা
              </span>
            </h1>

            <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              জামিয়া হুসাইনিয়ার প্রতিষ্ঠা, লক্ষ্য, তারবিয়ত ব্যবস্থা এবং ভবিষ্যৎ
              পরিকল্পনা সম্পর্কে একটি সমন্বিত ধারণা।
            </p>

            <div className="mt-5 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300" />
          </section>

          {/* Content sections */}
          <section className="space-y-10 md:space-y-12">
            {/* Founder + Intro */}
            <div className="grid md:grid-cols-2 gap-8">
              <FounderInfo />
              <IntroductionInfo />
            </div>

            {/* One-glance section */}
            <FirstLooksInfo />

            {/* Aims + Characteristics */}
            <div className="grid md:grid-cols-2 gap-8">
              <AimsAndObjectivesInfo />
              <CharacteristicsInfo />
            </div>

            {/* Tarbiyat / Department */}
            <DepartmentInfo />

            {/* Future plans */}
            <div className="grid md:grid-cols-2 gap-8">
              <FutureEducationPlan />
              <FutureDevelopmentPlan />
            </div>

            {/* Quote / Message */}
            <TheWordInfo />
          </section>
        </div>
      </main>
    </>
  );
};

export default About;
