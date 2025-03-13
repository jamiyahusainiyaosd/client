import React from "react";
import { useQuery } from "@tanstack/react-query";
import noticeService from "../services/notice.services";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import { useNavigate } from "react-router-dom";
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
        <div className="p-14 border rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold">{refinedData.title}</h2>
          <br />
          <p className="text-sm text-gray-500 mt-2">
            🗓️ প্রকাশের তারিখ:{" "}
            {new Date(refinedData.created_at).toLocaleDateString("bn-BD")}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            🗓️ আপডেটের তারিখ:{" "}
            {new Date(refinedData.updated_at).toLocaleDateString("bn-BD")}
          </p>
          <p className="mt-4">
            {refinedData.description || "এই নোটিশের বিস্তারিত তথ্য নেই।"}
          </p>
          <br />
          <button onClick={handleReturn} className="mt-4">
            🔙 ফিরে যান
          </button>
        </div>
      )}
    </>
  );
};

export default NoticeDetails;
