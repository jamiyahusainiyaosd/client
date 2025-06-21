import { useQuery } from "@tanstack/react-query";
import Error from "../../../components/Error";
import Loader from "../../../components/Loader";
import teacherService from "../services/teacher.services";
import Teacher from "./Teacher";

const Teachers = () => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["teachers"],
    queryFn: teacherService.getAllTeacher,
  });

  const refineData = data?.data?.data;

  return (
    <div className="space-y-12">
      {isPending && (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      )}

      {isError && <Error />}

      {refineData && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            মোট শিক্ষক :{" "}
            <span className="text-blue-500 dark:text-blue-400">
              {refineData.length}
            </span>{" "}
            জন
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {refineData.map((teacher) => (
              <Teacher key={teacher.id} {...teacher} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Teachers;
