import { useQuery } from "@tanstack/react-query";
import React from "react";
import teacherService from "../services/teacher.services";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import Teacher from "./Teacher";

const Teachers = () => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["teachers"],
    queryFn: teacherService.getAllTeacher,
  });

  const refineData = data?.data?.data;

  return (
    <div className="space-y-8">
      {isPending && (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      )}

      {isError && (
        <Error />
      )}

      {refineData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {refineData.map((teacher) => (
            <Teacher key={teacher.id} {...teacher} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Teachers;
