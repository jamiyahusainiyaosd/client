import React from "react";
import { useQuery } from "@tanstack/react-query";
import academicsServices from "../services/academics.services";
import Error from "../../../components/Error";
import NoDataFound from "../../../components/NoDataFound";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";

const AllAcademics = () => {
  const navigate = useNavigate();
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["academics"],
    queryFn: academicsServices.getAllAcademic,
  });

  const handleViewDetails = (id) => {
    navigate(`/academic/${id}`);
  };

  const sortedData = data?.data?.data?.sort(
    (a, b) => new Date(a.class_created) - new Date(b.class_created)
  );

  return (
    <>
      {isPending && <Loader />}
      {isError && <Error errorMessage={error.message} />}
      {sortedData?.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedData?.map((item) => (
            <div key={item.id} className="p-5 border rounded-lg shadow-2xl space-y-3">
              <h3 className="text-2xl font-semibold" style={{color:'wheat'}}>{item.class_name}</h3>
              <h3 className="text-md font-semibold">{item.class_title}</h3>
              <button onClick={() => handleViewDetails(item.id)} className="mt-4">📄 বিস্তারিত দেখুন
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AllAcademics;