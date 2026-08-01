import FinancialReport from "../features/financialReport/components/financialReport";
import PageTitle from "../utils/PageTitle";

const FinancialReportPage = () => {
  return (
    <>
      <PageTitle title="আর্থিক প্রতিবেদন" />

      <main className="min-h-screen bg-slate-50  pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">

          {/* Page header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 ">
                আর্থিক প্রতিবেদন
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 ">
              আমাদের মাদ্রাসার{" "}
              <span className="text-emerald-600 ">
                স্বচ্ছ আর্থিক ব্যবস্থাপনা
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-500  max-w-xl leading-relaxed">
              প্রতিষ্ঠানের উন্নয়ন, খরচ ও সামগ্রিক আর্থিক চিত্র — সম্পূর্ণ স্বচ্ছতার সাথে উপস্থাপন।
            </p>
            <div className="mt-4 h-px w-full bg-slate-200 " />
          </div>

          <FinancialReport />
        </div>
      </main>
    </>
  );
};

export default FinancialReportPage;