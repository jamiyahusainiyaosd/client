import PageTitle from "../utils/PageTitle";
import ResultsDetails from "../features/results/components/ResultsDetails";

const ResultsDetailsPage = () => {
  return (
    <>
      <PageTitle title="ফলাফল বিস্তারিত" />

      <main className="min-h-screen bg-slate-50  pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-44 md:pt-40">

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 ">
                ফলাফল
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 ">
              জামাতের{" "}
              <span className="text-emerald-600 ">
                প্রকাশিত ফলাফল
              </span>
            </h1>
            <div className="mt-4 h-px w-full bg-slate-200 " />
          </div>

          <ResultsDetails />
        </div>
      </main>
    </>
  );
};

export default ResultsDetailsPage;