import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorDisplay from "../components/Error";
import Loader from "../components/Loader";
import NoDataFound from "../components/NoDataFound";
import AcademicDetail from "../features/academics/components/AcademicDetail";
import academicsServices from "../features/academics/services/academics.services";
import PageTitle from "../utils/PageTitle";

const AcademicDetailPage = () => {
  const { id } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: [`academicDetail${id}`],
    queryFn: () => academicsServices.getOneAcademic(id),
    enabled: !!id,
  });

  const info = data?.data;

  return (
    <>
      <PageTitle title="একাডেমিক বিস্তারিত" />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-44 md:pt-40">

          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-500">
                একাডেমিক
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              একাডেমিক ক্লাসের{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                বিস্তারিত তথ্য
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              ক্লাস সম্পর্কিত সম্পূর্ণ তথ্য ও বিবরণ
            </p>
            <div className="mt-4 h-px w-full bg-slate-200 dark:bg-slate-800" />
          </div>

          {isPending && <Loader />}

          {isError && <ErrorDisplay errorMessage="তথ্য লোড করতে সমস্যা হয়েছে।" />}

          {!isPending && !info && <NoDataFound />}

          {info && (
            <AcademicDetail
              className={info.class_name}
              classTitle={info.class_title}
              classStudentCount={info.student_count}
              classSetCount={info.number_seat}
              createdAt={info.class_created}
              classDescription={info.class_description}
            />
          )}

        </div>
      </main>
    </>
  );
};

export default AcademicDetailPage;