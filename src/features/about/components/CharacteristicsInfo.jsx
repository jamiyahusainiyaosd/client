import React from "react";
import { FaStar } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const CharacteristicsInfo = () => {
  return (
    <section>
      <div className="p-6 rounded-lg shadow-2xl mb-8">
        <h3 className="text-2xl font-semibold flex items-center mb-4">
          <FaStar className="mr-2" /> বৈশিষ্ট্যসমূহ
        </h3>
        <ul className="list-disc list-inside">
          {aboutData.features.map((feature, index) => (
            <ol key={index} className="mt-2">
              {feature}
            </ol>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CharacteristicsInfo;
