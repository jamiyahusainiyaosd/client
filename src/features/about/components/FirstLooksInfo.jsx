import React from "react";
import { aboutData } from "../../../constants/aboutData";
import { FaStar } from "react-icons/fa";

const FirstLooksInfo = () => {
  return (
    <section>
      <div className="p-6 rounded-lg shadow-2xl mb-8">
        <h3 className="text-2xl font-semibold flex items-center mb-4">
          <FaStar className="mr-2" /> এক নজরে জামিয়া হুসাইনিয়া
        </h3>
        <ul className="list-disc list-inside">
          {aboutData.overview.map((item, index) => (
            <ol key={index} className="mt-2">
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
                item.value
              )}
            </ol>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FirstLooksInfo;
