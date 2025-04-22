import React from "react";
import { useNavigate } from "react-router-dom";
import Time from "../../../utils/formateData";

const RecentNotice = ({ id, title, created_at }) => {
  const navigate = useNavigate();
  return (
    <li
      className="w-full p-6 rounded-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border border-gray-600 hover:border-cyan-400 shadow-lg"
      onClick={() => navigate(`/notice/${id}`)}
    >
      <h2 className="text-xl font-semibold mb-3 text-gray-100">{title}</h2>
      <p className="text-gray-300 flex items-center gap-2">
        <span className="text-amber-400">🗓️</span>
        {Time(created_at)}
      </p>
    </li>
  );
};

export default RecentNotice;