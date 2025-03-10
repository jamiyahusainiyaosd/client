import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const TheWordInfo = () => {
  return (
    <section>
      <div className="p-6 rounded-lg shadow-2xl">
        <h3 className="text-2xl font-semibold flex items-center mb-4">
          <FaQuoteRight className="mr-2" /> বাণী
        </h3>
        <div className="leading-relaxed">
          <p>{aboutData.quote.text}</p>
          <br />
          <p>{aboutData.quote.texts}</p>
          <br />
          <b>— {aboutData.quote.author}</b>
        </div>
      </div>
    </section>
  );
};

export default TheWordInfo;
