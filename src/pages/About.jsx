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

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">

          {/* Page header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-500">
                মাদ্রাসা সম্পর্কে
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 max-w-2xl">
              জামিয়া হুসাইনিয়া —{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                ইতিহাস, বৈশিষ্ট্য ও পরিকল্পনা
              </span>
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              জামিয়া হুসাইনিয়ার প্রতিষ্ঠা, লক্ষ্য, তারবিয়ত ব্যবস্থা এবং ভবিষ্যৎ পরিকল্পনা সম্পর্কে একটি সমন্বিত ধারণা।
            </p>
            <div className="mt-4 h-px w-full bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Sections */}
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <FounderInfo />
              <IntroductionInfo />
            </div>

            <FirstLooksInfo />

            <div className="grid md:grid-cols-2 gap-5">
              <AimsAndObjectivesInfo />
              <CharacteristicsInfo />
            </div>

            <DepartmentInfo />

            <div className="grid md:grid-cols-2 gap-5">
              <FutureEducationPlan />
              <FutureDevelopmentPlan />
            </div>

            <TheWordInfo />
          </div>

        </div>
      </main>
    </>
  );
};

export default About;
