import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const FutureEducationPlan = () => {
  return (
    <section>
      <div className="p-6 rounded-lg shadow-2xl mb-8">
        <h3 className="text-2xl font-semibold flex items-center mb-4">
          <FaCalendarAlt className="mr-2 " /> ভবিষ্যৎ শিক্ষা পরিকল্পনা
        </h3>
        <ul className="list-disc list-inside">
          {aboutData.futurePlans.education.map((plan, index) => (
            <ol key={index} className="mt-2">
              {plan}
            </ol>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FutureEducationPlan;
