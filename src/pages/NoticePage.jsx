import Notices from "../features/notice/components/Notices";
import PageTitle from "../utils/PageTitle";

const NoticePage = () => {
  return (
    <>
      <PageTitle title="নোটিশ সমূহ" />

      <main className="min-h-screen bg-slate-50  pb-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">

          {/* Page header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                অফিসিয়াল নোটিশ
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 max-w-2xl font-display">
              জামিয়ার{" "}
              <span className="text-emerald-600">
                নোটিশ সমূহ
              </span>
            </h1>
            <p className="mt-3 text-sm text-slate-600 max-w-xl leading-relaxed">
              সকল প্রকার অফিসিয়াল নোটিশ ও বিজ্ঞপ্তি এখানে পাওয়া যাবে।
            </p>
            <div className="mt-5 h-px w-full bg-slate-200" />
          </div>

          <Notices />
        </section>
      </main>
    </>
  );
};

export default NoticePage;