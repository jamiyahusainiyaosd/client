import PageTitle from "../utils/PageTitle";
import ExpatriateGrants from "./../features/expatriateGrant/components/ExpatriateGrants";

const ExpatriateGrantsPage = () => {
  return (
    <>
      <PageTitle title="প্রবাসী অনুদান" />

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20 pt-44 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 rounded-full bg-emerald-100
              px-3 py-1 text-xs font-semibold text-emerald-700
              dark:bg-emerald-900/40 dark:text-emerald-300"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              প্রবাসী অনুদান
            </div>

            <h1
              className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight
              text-slate-900 dark:text-slate-50"
            >
              আমাদের সম্মানিত{" "}
              <span
                className="bg-gradient-to-r from-emerald-600 to-emerald-400
              text-transparent bg-clip-text"
              >
                প্রবাসী অনুদান দাতাগণ
              </span>
            </h1>

            <p
              className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300
              max-w-2xl mx-auto"
            >
              প্রবাসী অনুদান দাতারা আমাদের প্রতিষ্ঠানের অগ্রগতিতে গুরুত্বপূর্ণ
              ভূমিকা পালন করছেন, যারা তাদের উদারতা ও সহানুভূতির মাধ্যমে আমাদের
              মিশনকে সমর্থন করে চলেছেন।
            </p>

            <div
              className="mt-5 w-24 h-1 mx-auto rounded-full bg-gradient-to-r
              from-emerald-500 via-emerald-400 to-emerald-300"
            ></div>
          </div>

          <ExpatriateGrants />
        </div>
      </main>
    </>
  );
};

export default ExpatriateGrantsPage;
