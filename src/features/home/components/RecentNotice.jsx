import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const RecentNotice = ({ id, title, created_at }) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/notice/${id}`)}
      className="w-full p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300 cursor-pointer hover:border-b-2 hover:border-white"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
      <p className="text-base text-gray-600">
        {format(new Date(created_at), "dd MMM yyyy, hh:mm a")}
      </p>
    </li>
  );
};

export default RecentNotice;
