import PageTitle from "../utils/PageTitle";
import Teachers from "../features/teachers/components/Teachers";
 
const TeachersPage = () => {
  return (
    <>
      <PageTitle title="শিক্ষকবৃন্দ" />
 
      <main className="min-h-screen bg-slate-50  pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">
 
          {/* Page header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                শিক্ষকবৃন্দ
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 max-w-2xl font-display">
              আমাদের সম্মানিত{" "}
              <span className="text-emerald-600">
                শিক্ষকবৃন্দ
              </span>
            </h1>
            <p className="mt-3 text-sm text-slate-600 max-w-xl leading-relaxed">
              যাঁরা দ্বীনি ইলম, নৈতিকতা ও আদর্শ চরিত্র গঠনে নিরলস পরিশ্রম করে যাচ্ছেন।
            </p>
            <div className="mt-5 h-px w-full bg-slate-200" />
          </div>
 
          <Teachers />
        </div>
      </main>
    </>
  );
};
 
export default TeachersPage;