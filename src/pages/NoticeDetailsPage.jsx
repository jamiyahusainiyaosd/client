import { useParams } from "react-router-dom";
import NoticeDetails from "../features/notice/components/NoticeDetails";
import PageTitle from "../utils/PageTitle";

const NoticeDetailsPage = () => {
  const { id } = useParams();

  return (
    <>
      <PageTitle title="নোটিশ বিস্তারিত" />

      <main className="min-h-screen bg-slate-50 pb-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                নোটিশ
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 max-w-2xl font-display">
              নোটিশের{" "}
              <span className="text-emerald-600">
                বিস্তারিত
              </span>
            </h1>
            <p className="mt-3 text-sm text-slate-600 max-w-xl leading-relaxed">
              নোটিশ সম্পর্কিত সম্পূর্ণ তথ্য ও বিবরণ
            </p>
            <div className="mt-5 h-px w-full bg-slate-200" />
          </div>

          <NoticeDetails id={id} />
        </section>
      </main>
    </>
  );
};

export default NoticeDetailsPage;