// src/pages/TeachersPage.jsx
import PageTitle from "../utils/PageTitle";
import Teachers from "../features/teachers/components/Teachers";

const TeachersPage = () => {
  return (
    <>
      <PageTitle title="শিক্ষকবৃন্দ" />

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-36">
          {/* Page Header */}
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 rounded-full bg-emerald-100
              px-3 py-1 text-xs font-semibold text-emerald-700
              dark:bg-emerald-900/40 dark:text-emerald-300"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              শিক্ষকবৃন্দ
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
                শিক্ষকবৃন্দ
              </span>
            </h1>

            <p
              className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300
              max-w-2xl mx-auto"
            >
              যাঁরা দ্বীনি ইলম, নৈতিকতা ও আদর্শ চরিত্র গঠনে নিরলস পরিশ্রম করে
              যাচ্ছেন
            </p>

            <div
              className="mt-5 w-24 h-1 mx-auto rounded-full bg-gradient-to-r
              from-emerald-500 via-emerald-400 to-emerald-300"
            ></div>
          </div>

          <Teachers />
        </div>
      </main>
    </>
  );
};

export default TeachersPage;
