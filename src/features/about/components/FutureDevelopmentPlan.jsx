import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const FutureDevelopmentPlan = () => {
  return (
    <section>
      <div className="p-3 rounded-lg shadow-2xl mb-8">
        <h3 className="text-2xl font-semibold flex items-center mb-4" style={{color:'wheat'}}>
          <FaCalendarAlt className="mr-2 text-blue-400" /> ভবিষ্যৎ উন্নয়ন পরিকল্পনা
        </h3>
        <ul className="list-disc list-inside">
          {aboutData.futurePlans.development.map((plan, index) => (
            <ol key={index} className="mt-2">
              {plan}
            </ol>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FutureDevelopmentPlan;