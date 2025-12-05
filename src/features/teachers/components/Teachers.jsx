// src/features/teachers/components/Teachers.jsx
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
        <div className="py-20 flex justify-center">
          <Loader />
        </div>
      )}

      {isError && <Error />}

      {refineData && (
        <>
          {/* Count Info */}
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            মোট শিক্ষক :
            <span className="text-emerald-600 dark:text-emerald-300 font-bold ml-2">
              {refineData.length}
            </span>{" "}
            জন
          </h2>

          {/* Teacher Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
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
