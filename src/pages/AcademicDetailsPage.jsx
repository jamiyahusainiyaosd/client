import PageTitle from "../utils/PageTitle";
import { useQuery } from "@tanstack/react-query";
import academicsServices from "../features/academics/services/academics.services";
import Loader from "../components/Loader";
import Error from "../components/Error";
import AcademicDetail from "../features/academics/components/AcademicDetail";
import { useParams } from "react-router-dom";
import NoDataFound from "../components/NoDataFound";

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

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20 pt-44 md:pt-40">

        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50">
              একাডেমিক ক্লাস{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 
              bg-clip-text text-transparent">
                বিস্তারিত
              </span>
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              ক্লাস সম্পর্কিত সম্পূর্ণ তথ্য ও বিবরণ
            </p>
          </div>

          {isPending && (
            <div className="flex justify-center py-16">
              <Loader size="lg" />
            </div>
          )}

          {isError && <Error fullWidth />}

          {!isPending && !info && (
            <div className="bg-white/90 dark:bg-slate-900/90 border border-emerald-200 
              dark:border-emerald-700 p-6 rounded-2xl shadow-xl">
              <NoDataFound message="কোনো একাডেমিক তথ্য পাওয়া যায়নি" />
            </div>
          )}

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
