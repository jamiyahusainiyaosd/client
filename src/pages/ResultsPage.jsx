import PageTitle from "../utils/PageTitle";
import AllResults from "../features/results/components/AllResults";

const ResultsPage = () => {
  return (
    <>
      <PageTitle title="ফলাফল প্রকাশ" />

      <main className="min-h-screen bg-slate-50  pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 ">
                ফলাফল প্রকাশ
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 ">
              মাদ্রাসার{" "}
              <span className="text-emerald-600 ">
                প্রকাশিত ফলাফল
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-500  max-w-xl leading-relaxed">
              বিভিন্ন ক্লাসের সর্বশেষ ফলাফল এখানে দেখতে পাবেন।
            </p>
            <div className="mt-4 h-px w-full bg-slate-200 " />
          </div>

          <AllResults />
        </div>
      </main>
    </>
  );
};

export default ResultsPage;