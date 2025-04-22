import React from "react";

const Marquee = () => {
  return (
    <div className="mx-auto bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 rounded-lg shadow-lg">
     <marquee className="text-white font-medium text-lg md:text-xl py-1"  behavior="scroll"
        direction="left">
        <span className="flex items-center gap-2">
          <span className="text-amber-300">✦</span>
          জামিয়া হুসাইনিয়া মাদ্রাসায় আপনাকে স্বাগতম
          <span className="text-amber-300">✦</span>
        </span>
      </marquee>
    </div>
  );
};

export default Marquee;