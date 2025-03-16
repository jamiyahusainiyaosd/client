import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[47.5vh]">
      <div className="mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="#3498db" strokeWidth="5" fill="none" />
          <circle cx="50" cy="50" r="45" stroke="#2ecc71" strokeWidth="5" fill="none" strokeDasharray="283" strokeDashoffset="75" transform="rotate(-90 50 50)" className="animate-spin" />
        </svg>
      </div>
    </div>
  );
};

export default Loader;