import { useParams } from "react-router-dom";
import NoticeDetails from "../features/notice/components/NoticeDetails";
import PageTitle from "../utils/PageTitle";

const NoticeDetailsPage = () => {
  const { id } = useParams();

  return (
    <>
      <PageTitle title="নোটিশ বিস্তারিত" />

      <main className=" bg-slate-50  pb-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-44 md:pt-40">

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 ">
                নোটিশ
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 ">
              নোটিশের{" "}
              <span className="text-emerald-600 ">
                বিস্তারিত
              </span>
            </h1>
            <div className="mt-4 h-px w-full bg-slate-200 " />
          </div>

          <NoticeDetails id={id} />
        </section>
      </main>
    </>
  );
};

export default NoticeDetailsPage;