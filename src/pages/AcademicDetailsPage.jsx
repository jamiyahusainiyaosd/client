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
      <div className="max-w-6xl w-[95%] mx-auto mt-10">
        {isPending && (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        )}

        {isError && <Error />}

        {!isPending && !refineData && (
          <div className="bg-yellow-900/50 text-yellow-300 p-4 rounded-lg text-center text-xl">
            <NoDataFound />
          </div>
        )}

        {refineData && (
          <div className="flex justify-center">
            <AcademicDetail
              className={refineData?.class_name}
              classTitle={refineData?.class_title}
              classStudentCount={refineData?.student_count}
              classSetCount={refineData?.number_seat}
              createdAt={refineData?.class_created}
              updatedAt={refineData?.class_update}
              classDescription={refineData?.class_description}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AcademicDetailPage;
