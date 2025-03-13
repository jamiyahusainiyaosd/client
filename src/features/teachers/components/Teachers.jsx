import { useQuery } from "@tanstack/react-query";
import React from "react";
import teacherService from "../services/teacher.services";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import Teacher from "./Teacher";

const Teachers = () => {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["teachers"],
    queryFn: teacherService.getAllTeacher,
  });
  const refineData = data?.data?.data;
  return (
    <>
      {isPending && <Loader key={"loader"} />}
      {!isPending && isError && (
        <Error key={"error"} errorMessage={error.message} />
      )}
      {refineData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 leading-10">
          {refineData?.map(
            ({
              id,
              avatar,
              name,
              designation,
              phone_number,
              created_at,
              updated_at,
            }) => (
              <Teacher
                key={id}
                avatar={avatar}
                created_at={created_at}
                designation={designation}
                name={name}
                phone_number={phone_number}
                updated_at={updated_at}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Teachers;
