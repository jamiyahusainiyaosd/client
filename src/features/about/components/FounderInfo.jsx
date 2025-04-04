import React from "react";
import { FaUserTie } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const FounderInfo = () => {
  return (
    <section>
      <div className="p-3 rounded-lg shadow-2xl mb-8 leading-relaxed text-justify">
        <h3 className="text-2xl font-semibold flex items-center mb-4" style={{color:'wheat'}}>
          <FaUserTie className="mr-2 text-blue-400" /> মাদ্রাসার প্রতিষ্ঠাতা
        </h3>
        <div className="p-4 rounded-lg">
          <h4 className="text-xl font-semibold">{aboutData.founder.name}</h4>
          <p className="mt-2 leading-relaxed">
            {aboutData.founder.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderInfo;