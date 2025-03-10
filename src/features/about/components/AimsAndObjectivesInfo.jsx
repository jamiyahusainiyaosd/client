import React from "react";
import { FaBullseye } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const AimsAndObjectivesInfo = () => {
  return (
    <section>
      <div className="p-6 rounded-lg shadow-2xl mb-8">
        <h3 className="text-2xl font-semibold flex items-center mb-4">
          <FaBullseye className="mr-2" /> লক্ষ্য ও উদ্দেশ্য
        </h3>
        <ul className="list-disc list-inside">
          {aboutData.goals.map((goal, index) => (
            <ol key={index} className="mt-2">
              {goal}
            </ol>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AimsAndObjectivesInfo;
