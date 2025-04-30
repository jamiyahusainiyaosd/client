import React from "react";
import { FaStar } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const CharacteristicsInfo = () => {
  return (
    <section>
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-blue-300 transition-all duration-300">
        <h3 className="text-2xl font-semibold flex items-center mb-6">
          <FaStar className="mr-3" /> <span className="text-blue-300">বৈশিষ্ট্যসমূহ</span>
        </h3>
        <ul className="space-y-3">
          {aboutData.features.map((feature, index) => (
            <li key={index}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CharacteristicsInfo;