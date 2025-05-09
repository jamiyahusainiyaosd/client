import React from "react";
import { useNavigate } from "react-router-dom";
import Time from "../../../utils/formateData";

const RecentNotice = ({ id, title, created_at }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-5 rounded-xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-400 group"
      onClick={() => navigate(`/notice/${id}`)}
    >
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
          <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {Time(created_at)}
          </p>
        </div>
        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default RecentNotice;