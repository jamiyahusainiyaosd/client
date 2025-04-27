import React from "react";
import { FaUserTie } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const FounderInfo = () => {
  return (
    <section>
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-cyan-400 transition-all duration-300">
        <h3 className="text-2xl font-semibold flex items-center mb-6 text-cyan-400">
          <FaUserTie className="mr-3" /> মাদ্রাসার প্রতিষ্ঠাতা
        </h3>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h4 className="text-xl font-semibold text-gray-100">{aboutData.founder.name}</h4>
          <p className="mt-4 text-gray-300 leading-relaxed text-justify">
            {aboutData.founder.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderInfo;