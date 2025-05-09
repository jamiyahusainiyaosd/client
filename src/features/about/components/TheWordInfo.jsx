import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const TheWordInfo = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg mr-4">
          <FaQuoteRight className="text-blue-500 dark:text-blue-400 text-xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          বাণী
        </h3>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <div className="absolute -left-4 top-0 text-4xl text-blue-500 dark:text-blue-400 opacity-20">
            "
          </div>
          <blockquote className="pl-8 text-lg text-justify italic text-gray-700 dark:text-gray-300">
            {aboutData.quote.text}
          </blockquote>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-0 text-4xl text-blue-500 dark:text-blue-400 opacity-20">
            "
          </div>
          <blockquote className="pl-8 text-justify text-lg italic text-gray-700 dark:text-gray-300">
            {aboutData.quote.texts}
          </blockquote>
        </div>

        <div className="text-right">
          <p className="text-gray-900 dark:text-white font-semibold">
            — {aboutData.quote.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TheWordInfo;
