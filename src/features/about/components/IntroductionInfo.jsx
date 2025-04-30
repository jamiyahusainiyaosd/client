import React from "react";
import { aboutData } from "../../../constants/aboutData";
import { FaBookOpen } from "react-icons/fa";

const IntroductionInfo = () => {
  return (
    <section>
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-blue-300 transition-all duration-300">
        <h3 className="text-2xl font-semibold flex items-center mb-6">
          <FaBookOpen className="mr-3" /> <span className="text-blue-300">ভূমিকা</span>
        </h3>
        <p className="text-gray-300 leading-relaxed text-justify">
          {aboutData.introduction}
        </p>
      </div>
    </section>
  );
};

export default IntroductionInfo;