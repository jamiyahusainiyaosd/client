import AllAcademics from "../features/academics/components/AllAcademics";
import PageTitle from "../utils/PageTitle";

const Academics = () => {
  return (
    <>
      <PageTitle title="একাডেমিক তথ্য" />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">

          {/* Page header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-500">
                একাডেমিক তথ্য
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              আমাদের{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                একাডেমিক ক্লাসসমূহ
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              মাদ্রাসার সকল একাডেমিক ক্লাসের বিস্তারিত ও সর্বশেষ তথ্য।
            </p>
            <div className="mt-4 h-px w-full bg-slate-200 dark:bg-slate-800" />
          </div>

          <AllAcademics />
        </div>
      </main>
    </>
  );
};

export default Academics;