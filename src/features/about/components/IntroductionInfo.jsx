import React from "react";
import { aboutData } from "../../../constants/aboutData";
import { FaBookOpen } from "react-icons/fa";

const IntroductionInfo = () => {
  return (
    <section>
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-cyan-400 transition-all duration-300">
        <h3 className="text-2xl font-semibold flex items-center mb-6 text-cyan-400">
          <FaBookOpen className="mr-3" /> ভূমিকা
        </h3>
        <p className="text-gray-300 leading-relaxed text-justify">
          {aboutData.introduction}
        </p>
      </div>
    </section>
  );
};

export default IntroductionInfo;