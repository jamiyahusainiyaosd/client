// src/pages/NoticeDetailsPage.jsx
import PageTitle from "../utils/PageTitle";
import NoticeDetails from "../features/notice/components/NoticeDetails";
import { useParams } from "react-router-dom";

const NoticeDetailsPage = () => {
  const { id } = useParams();

  return (
    <>
      <PageTitle title="নোটিশ বিস্তারিত" />

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20">

        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-36">
          <NoticeDetails id={id} />
        </section>

      </main>
    </>
  );
};

export default NoticeDetailsPage;
