import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { boxStyles } from "../constants/styles";

const NoDataFound = () => {
  return (
    <div className="h-[47.5vh] flex items-center justify-center px-4">
      <div className={boxStyles + " border-cyan-400 shadow-cyan-500/50"}>
        <FaInfoCircle className="text-cyan-400 text-xl sm:text-2xl" />
        <p className="text-sm sm:text-base">❌ কোনো তথ্য পাওয়া যায়নি।</p>
      </div>
    </div>
  );
};

export default NoDataFound;
