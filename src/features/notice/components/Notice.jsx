import React from "react";
import { useNavigate } from "react-router-dom";
import { longFormatDate } from "../../../utils/formateData";

const Notice = ({ title, created_at, id }) => {
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate(`/notice/${id}`);
  };
  return (
    <div className="p-4 border rounded-lg shadow-2xl">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-sm mt-5 text-gray-500">
        🗓️ প্রকাশের তারিখ : {longFormatDate(created_at)}
      </p>
      <button onClick={handleDetails} className="button1 mt-5">
        বিস্তারিত দেখুন
      </button>
    </div>
  );
};

export default Notice;
