import PageTitle from "../utils/PageTitle";
import FormerStudents from "./../features/formerStudent/components/FormerStudents";

const FormerStudentsPage = () => {
  return (
    <>
      <PageTitle title="সাবেক ছাত্র" />

      <main className="min-h-screen bg-slate-50  pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">

          {/* Page header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                সাবেক ছাত্র
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 max-w-2xl font-display">
              আমাদের{" "}
              <span className="text-emerald-600">
                সাবেক ছাত্রগণ
              </span>
            </h1>
            <p className="mt-3 text-sm text-slate-600 max-w-xl leading-relaxed">
              যারা আমাদের প্রতিষ্ঠানের গর্ব এবং বিভিন্ন ক্ষেত্রে নিজেদের দক্ষতা ও প্রতিভা প্রদর্শন করে চলেছেন।
            </p>
            <div className="mt-5 h-px w-full bg-slate-200" />
          </div>

          <FormerStudents />
        </div>
      </main>
    </>
  );
};

export default FormerStudentsPage;