import PageTitle from "../utils/PageTitle";
import ResultsDetails from "../features/results/components/ResultsDetails";

const ResultsDetailsPage = () => {
  return (
    <>
      <PageTitle title="ফলাফল বিস্তারিত" />

      <main className="min-h-screen bg-slate-50  pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-44 md:pt-40">

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                ফলাফল
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
              জামাতের{" "}
              <span className="text-emerald-600">
                প্রকাশিত ফলাফল
              </span>
            </h1>
            <div className="mt-5 h-px w-full bg-slate-200" />
          </div>

          <ResultsDetails />
        </div>
      </main>
    </>
  );
};

export default ResultsDetailsPage;