import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const TheWordInfo = () => {
  return (
    <section>
      <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-cyan-400 transition-all duration-300">
        <h3 className="text-2xl font-semibold flex items-center mb-6 text-cyan-400">
          <FaQuoteRight className="mr-3" /> বাণী
        </h3>
        <div className="text-gray-300 leading-relaxed space-y-4">
          <p className="italic text-justify">"{aboutData.quote.text}"</p>
          <p className="italic text-justify">"{aboutData.quote.texts}"</p>
          <p className="text-right text-amber-400 font-semibold">
            — {aboutData.quote.author}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheWordInfo;