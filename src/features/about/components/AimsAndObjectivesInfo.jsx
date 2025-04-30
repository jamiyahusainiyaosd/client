import React from "react";
import { FaBullseye } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const AimsAndObjectivesInfo = () => {
  return (
    <section>
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-blue-300 transition-all duration-300">
        <h3 className="text-2xl font-semibold flex items-center mb-6">
          <FaBullseye className="mr-3" /> <span className="text-blue-300">লক্ষ্য ও উদ্দেশ্য</span>
        </h3>
        <ul className="space-y-3">
          {aboutData.goals.map((goal, index) => (
            <li key={index}>
              {goal}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AimsAndObjectivesInfo;