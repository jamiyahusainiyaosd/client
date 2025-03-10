import React from "react";
import { FaUsers } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const DepartmentInfo = () => {
  return (
    <section>
      <div className="p-6 rounded-lg shadow-2xl mb-8">
        <h3 className="text-2xl font-semibold flex items-center mb-4">
          <FaUsers className="mr-2" /> তারবিয়ত বা ছাত্রগঠন বিভাগ
        </h3>
        <ul className="list-disc list-inside">
          {aboutData.tarbiyat.map((item, index) => (
            <ol key={index} className="mt-2">
              {item}
            </ol>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DepartmentInfo;
