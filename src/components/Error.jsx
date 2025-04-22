import React from "react";
import { boxStyles } from "../constants/styles";

const Error = ({ errorMessage }) => {
  return (
    <div className="h-[47.5vh] flex items-center justify-center px-4">
      <div className={boxStyles + " border-red-500 shadow-red-500/50"}>
        <MediaError className="text-red-500 text-xl sm:text-2xl" />
        <p className="text-red-500 text-sm sm:text-base">{errorMessage}</p>
      </div>
    </div>
  );
};

export default Error;
