import React from "react";
import { FaUserTie } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const FounderInfo = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 h-full">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg mr-4">
          <FaUserTie className="text-blue-500 dark:text-blue-400 text-xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          মাদ্রাসার প্রতিষ্ঠাতা
        </h3>
      </div>

      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
        {aboutData.founder.name}
      </h4>
      <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
        {aboutData.founder.description}
      </p>
    </div>
  );
};

export default FounderInfo;
