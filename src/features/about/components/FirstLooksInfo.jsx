import React from "react";
import { aboutData } from "../../../constants/aboutData";
import { FaEye } from "react-icons/fa";

const FirstLooksInfo = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg mr-4">
          <FaEye className="text-blue-500 dark:text-blue-400 text-xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          এক নজরে জামিয়া হুসাইনিয়া
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {aboutData.overview.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
              <span className="text-blue-500 dark:text-blue-400 mr-2">
                {item.icon}
              </span>
              {item.label}
            </h4>
            <div className="mt-2 text-gray-700 dark:text-gray-300">
              {Array.isArray(item.value) ? (
                <ul className="space-y-2">
                  {item.value.map((fund, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block w-1 h-1 mt-2 mr-2 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                      {fund}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-justify">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstLooksInfo;
