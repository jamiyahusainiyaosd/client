import PageTitle from "../utils/PageTitle";
import AllAcademics from "../features/academics/components/AllAcademics";

const Academics = () => {
  return (
    <>
      <PageTitle title="একাডেমিক তথ্য" />

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20 pt-44 md:pt-40">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">

            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 
              text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              একাডেমিক তথ্য
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50">
              আমাদের{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 
              bg-clip-text text-transparent">
                একাডেমিক ক্লাসসমূহ
              </span>
            </h1>

            <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base text-slate-600 dark:text-slate-300">
              মাদ্রাসার সকল একাডেমিক ক্লাসের বিস্তারিত ও সর্বশেষ তথ্য।
            </p>

            <div className="mt-5 w-24 h-1 mx-auto rounded-full bg-gradient-to-r 
              from-emerald-500 to-emerald-300"></div>
          </div>

          <AllAcademics />

        </div>
      </main>
    </>
  );
};

export default Academics;
