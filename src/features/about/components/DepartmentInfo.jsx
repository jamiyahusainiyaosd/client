import React from "react";
import { FaUsers } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const DepartmentInfo = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg mr-4">
          <FaUsers className="text-blue-500 dark:text-blue-400 text-xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          তারবিয়ত বা ছাত্রগঠন বিভাগ
        </h3>
      </div>
      <ul className="grid md:grid-cols-2 gap-6">
        {aboutData.tarbiyat.map((item, index) => (
          <li
            key={index}
            className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-start">
              <p className="ml-3 text-gray-700 dark:text-gray-300 text-justify">
                {item}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentInfo;
