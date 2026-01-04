import PageTitle from "../utils/PageTitle";
import AllResults from "../features/results/components/AllResults";

const ResultsPage = () => {
  return (
    <>
      <PageTitle title="ফলাফল প্রকাশ" />

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20 pt-44 md:pt-40">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 
              dark:bg-emerald-900/40 dark:text-emerald-300 px-3 py-1 rounded-full text-xs">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              ফলাফল প্রকাশ
            </div>

            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50">
              মাদ্রাসার{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 
                bg-clip-text text-transparent">প্রকাশিত ফলাফল</span>
            </h1>

            <p className="max-w-2xl mx-auto mt-3 text-slate-600 dark:text-slate-300">
              বিভিন্ন ক্লাসের সর্বশেষ ফলাফল এখানে দেখতে পাবেন।
            </p>

            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-emerald-500 to-emerald-300 mx-auto rounded-full"></div>
          </div>

          <AllResults />

        </div>
      </main>
    </>
  );
};

export default ResultsPage;
