import React from "react";
import { FaStar } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const CharacteristicsInfo = () => {
  return (
    <section>
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-cyan-400 transition-all duration-300">
        <h3 className="text-2xl font-semibold flex items-center mb-6 text-cyan-400">
          <FaStar className="mr-3" /> বৈশিষ্ট্যসমূহ
        </h3>
        <ul className="space-y-3 ml-5">
          {aboutData.features.map((feature, index) => (
            <li key={index} className="relative pl-5 text-gray-300 before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:bg-cyan-400 before:rounded-full">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CharacteristicsInfo;