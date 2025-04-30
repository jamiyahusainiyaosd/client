import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const FutureEducationPlan = () => {
  return (
    <section>
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-blue-300 transition-all duration-300">
        <h3 className="text-2xl font-semibold flex items-center mb-6">
          <FaCalendarAlt className="mr-3" /> <span className="text-blue-300">ভবিষ্যৎ শিক্ষা পরিকল্পনা</span>
        </h3>
        <ul className="space-y-3">
          {aboutData.futurePlans.education.map((plan, index) => (
            <li key={index}>
              {plan}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FutureEducationPlan;