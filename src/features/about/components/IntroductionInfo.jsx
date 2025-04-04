import React from "react";
import { aboutData } from "../../../constants/aboutData";
import { FaBook } from "react-icons/fa";

const IntroductionInfo = () => {
  return (
    <>
      <div className="p-3 rounded-lg shadow-2xl mb-8 leading-relaxed text-justify">
        <h3 className="text-2xl font-semibold flex items-center mb-4" style={{color:'wheat'}}>
          <FaBook className="mr-2 text-blue-400" /> ভূমিকা
        </h3>
        <p className="leading-relaxed">{aboutData.introduction}</p>
      </div>
    </>
  );
};

export default IntroductionInfo;