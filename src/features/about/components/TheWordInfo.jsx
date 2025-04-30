import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const TheWordInfo = () => {
  return (
    <section>
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-blue-300 transition-all duration-300">
        <h3 className="text-2xl font-semibold flex items-center mb-6">
          <FaQuoteRight className="mr-3" /> <span className="text-blue-300">বাণী</span>
        </h3>
        <div className="text-gray-300 leading-relaxed space-y-4">
          <p className="italic text-justify">"{aboutData.quote.text}"</p>
          <p className="italic text-justify">"{aboutData.quote.texts}"</p>
          <p className="text-right text-md text-gray-100 font-bold">
            — {aboutData.quote.author}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheWordInfo;