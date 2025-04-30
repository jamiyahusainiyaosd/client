import React from "react";
import { FaUsers } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const DepartmentInfo = () => {
  return (
    <section>
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-blue-300 transition-all duration-300">
        <h3 className="text-2xl font-semibold flex items-center mb-6">
          <FaUsers className="mr-3" /> <span className="text-blue-300">তারবিয়ত বা ছাত্রগঠন বিভাগ</span>
        </h3>
        <ul className="space-y-3">
          {aboutData.tarbiyat.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DepartmentInfo;