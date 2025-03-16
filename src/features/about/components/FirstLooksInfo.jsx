import React from "react";
import { aboutData } from "../../../constants/aboutData";
import { FaStar } from "react-icons/fa";

const FirstLooksInfo = () => {
  return (
    <section className="p-4">
      <div className="p-4 rounded-lg shadow-2xl">
        <h3 className="text-2xl font-semibold flex items-center mb-4">
          <FaStar className="mr-2" /> এক নজরে জামিয়া হুসাইনিয়া
        </h3>
        <ul className="space-y-3">
          {aboutData.overview.map((item, index) => (
            <li key={index} className="mt-2">
              <strong>
                {item.icon} {item.label}:{" "}
              </strong>
              {Array.isArray(item.value) ? (
                <ul className="list-disc list-inside ml-6">
                  {item.value.map((fund, idx) => (
                    <li key={idx}>{fund}</li>
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