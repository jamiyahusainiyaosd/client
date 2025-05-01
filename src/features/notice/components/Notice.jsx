import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Time from "../../../utils/formateData";

const Notice = ({ title, created_at, id }) => {
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate(`/notice/${id}`);
  };
  return (
    <div className="p-6 border border-gray-600 rounded-lg shadow-lg bg-gray-700 transition duration-200 space-y-4">
      <h3 className="text-xl font-semibold text-blue-300">{title}</h3>
      <p className="text-sm font-medium text-gray-300">
        <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
          <FaCalendarAlt className="text-blue-300" />
          <span>{Time(created_at)}</span>
        </div>
      </p>
      <button
        onClick={handleDetails}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200 text-white"
      >
        📄 বিস্তারিত দেখুন
      </button>
    </div>
  );
};

export default Notice;
