import Notices from "../features/notice/components/Notices";
import PageTitle from "../utils/PageTitle";

const NoticePage = () => {
  return (
    <>
      <PageTitle title="নোটিশ সমূহ" />

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20 pt-44 md:pt-40">

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">

            <div className="inline-flex items-center gap-2 bg-emerald-100 
              dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 
              text-xs px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              অফিসিয়াল নোটিশ
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 
              dark:text-slate-50 mt-4">
              জামিয়ার{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 
              bg-clip-text text-transparent">
                নোটিশ সমূহ
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-2 text-slate-600 dark:text-slate-300">
              সকল প্রকার অফিসিয়াল নোটিশ ও বিজ্ঞপ্তি এখানে পাওয়া যাবে
            </p>

            <div className="mt-4 mx-auto w-24 h-1 rounded-full 
              bg-gradient-to-r from-emerald-500 to-emerald-300" />
          </div>

          <Notices />
        </section>
      </main>
    </>
  );
};

export default NoticePage;
