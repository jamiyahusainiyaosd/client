import PageTitle from "../utils/PageTitle";
import FinancialReport from "../features/financialReport/components/financialReport";

const FinancialReportPage = () => {
  return (
    <>
      <PageTitle title="আর্থিক প্রতিবেদন" />

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20 pt-44 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1
              text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              আর্থিক প্রতিবেদন
            </div>

            <h1
              className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight 
              text-slate-900 dark:text-slate-50"
            >
              আমাদের মাদ্রাসার{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                স্বচ্ছ আর্থিক ব্যবস্থাপনা
              </span>
            </h1>

            <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              প্রতিষ্ঠানের উন্নয়ন, খরচ ও সামগ্রিক আর্থিক চিত্র—সম্পূর্ণ
              স্বচ্ছতার সাথে উপস্থাপন।
            </p>

            <div
              className="mt-5 mx-auto h-1 w-24 rounded-full 
              bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300"
            ></div>
          </div>

          <FinancialReport />
        </div>
      </main>
    </>
  );
};

export default FinancialReportPage;
