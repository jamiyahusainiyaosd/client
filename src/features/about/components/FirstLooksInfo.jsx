import React from "react";
import { aboutData } from "../../../constants/aboutData";
import { FaEye } from "react-icons/fa";

const FirstLooksInfo = () => {
  return (
    <section>
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-blue-300 transition-all duration-300">
        <h3 className="text-2xl font-semibold flex items-center mb-6">
          <FaEye className="mr-3" /> <span className="text-blue-300">এক নজরে জামিয়া হুসাইনিয়া</span>
        </h3>
        <ul className="space-y-4">
          {aboutData.overview.map((item, index) => (
            <li key={index} className="text-gray-300">
              <strong>
                {item.icon} {item.label}:{" "}
              </strong>
              {Array.isArray(item.value) ? (
                <ul className="mt-2 space-y-2 ml-6">
                  {item.value.map((fund, idx) => (
                    <li key={idx} className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-amber-400 before:rounded-full text-justify">
                      {fund}
                    </li>
                  ))}
                </ul>
              ) : (
                <span>{item.value}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FirstLooksInfo;