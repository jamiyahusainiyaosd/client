import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error";
import Loader from "../../../components/Loader";
import Time from '../../../utils/formateData';
import noticeService from "../services/notice.services";

const NoticeDetails = ({ id }) => {
  const navigate = useNavigate();
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["noticeDetails", id],
    queryFn: () => noticeService.getOne(id),
  });
  const refinedData = data?.data;
  const handleReturn = () => {
    navigate("/notice");
  };
  return (
    <>
      {isPending && <Loader />}
      {!isPending && isError && <Error errorMessage={error.message} />}
      {!isPending && refinedData && (
        <div className="p-3 border rounded-lg shadow-2xl space-y-3 text-justify">
          <h2 className="text-2xl font-bold" style={{color:'wheat'}}>{refinedData.title}</h2>
          <p className="text-sm mt-2">
            🗓️ প্রকাশের তারিখ : {Time(refinedData.created_at)}
          </p>
          <p className="text-sm mt-2">
            🗓️ আপডেটের তারিখ : {Time(refinedData.updated_at)}
          </p>
          <p className="mt-4">
            {refinedData.description || "এই নোটিশের বিস্তারিত তথ্য নেই।"}
          </p>
          <button onClick={handleReturn} className="mt-4">
            🔙 ফিরে যান
          </button>
        </div>
      )}
    </>
  );
};

export default NoticeDetails;