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
  const { isPending, data, isError } = useQuery({
    queryKey: [`academicDetail${id}`],
    queryFn: () => academicsServices.getOneAcademic(id),
    enabled: !!id,
  });
  const refineData = data?.data;

  return (
    <>
      <PageTitle title="একাডেমিক বিস্তারিত" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-36">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            একাডেমিক ক্লাস বিস্তারিত
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            ক্লাস সম্পর্কিত সম্পূর্ণ তথ্য ও বিবরণ
          </p>
        </div>

        {isPending && (
          <div className="flex justify-center py-12">
            <Loader size="lg" variant="pulse" />
          </div>
        )}

        {isError && <Error fullWidth />}

        {!isPending && !refineData && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
            <NoDataFound message="কোনো একাডেমিক তথ্য পাওয়া যায়নি" />
          </div>
        )}

        {refineData && (
          <AcademicDetail
            className={refineData?.class_name}
            classTitle={refineData?.class_title}
            classStudentCount={refineData?.student_count}
            classSetCount={refineData?.number_seat}
            createdAt={refineData?.class_created}
            classDescription={refineData?.class_description}
          />
        )}
      </div>
    </>
  );
};

export default AcademicDetailPage;
