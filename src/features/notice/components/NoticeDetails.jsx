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
        <div className="p-6 border border-gray-600 rounded-lg shadow-lg bg-gray-800 text-gray-100 space-y-4 text-justify">
          <h2 className="text-2xl font-bold text-blue-300">{refinedData.title}</h2>
          <div className="flex flex-col space-y-2 text-sm text-gray-300">
            <p>🗓️ প্রকাশের তারিখ : {Time(refinedData.created_at)}</p>
            <p>🗓️ আপডেটের তারিখ : {Time(refinedData.updated_at)}</p>
          </div>
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-100 leading-relaxed">
              {refinedData.description || "এই নোটিশের বিস্তারিত তথ্য নেই।"}
            </p>
          </div>
          <button 
            onClick={handleReturn} 
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200 text-white"
          >
            🔙 ফিরে যান
          </button>
        </div>
      )}
    </>
  );
};

export default NoticeDetails;