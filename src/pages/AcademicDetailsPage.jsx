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

      <main className="min-h-screen bg-slate-50 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">

          {/* Page header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                একাডেমিক
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 max-w-2xl font-display">
              একাডেমিক ক্লাসের{" "}
              <span className="text-emerald-600">
                বিস্তারিত তথ্য
              </span>
            </h1>
            <p className="mt-3 text-sm text-slate-600 max-w-xl leading-relaxed">
              ক্লাস সম্পর্কিত সম্পূর্ণ তথ্য ও বিবরণ
            </p>
            <div className="mt-5 h-px w-full bg-slate-200" />
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