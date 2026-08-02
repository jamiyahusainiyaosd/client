import { useQuery } from "@tanstack/react-query";
import ErrorDisplay from "../../../components/Error";
import Loader from "../../../components/Loader";
import teacherService from "../services/teacher.services";
import Teacher from "./Teacher";
 
const Teachers = () => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["teachers"],
    queryFn: teacherService.getAllTeacher,
  });
 
  const refineData = data?.data?.data;
 
  if (isPending) return <Loader />;
  if (isError) return <ErrorDisplay errorMessage="শিক্ষক তালিকা লোড করতে সমস্যা হয়েছে।" />;
 
  return (
    <div className="space-y-6">
      {refineData && (
        <>
          {/* Count */}
          <p className="text-xs text-slate-500 font-mono">
            মোট{" "}
            <span className="font-semibold text-slate-900 font-mono">
              {refineData.length}
            </span>{" "}
            জন শিক্ষক
          </p>
 
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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