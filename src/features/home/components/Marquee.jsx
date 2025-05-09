import React from "react";

const Marquee = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 rounded-lg shadow-lg overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="text-white font-medium text-lg mx-4 inline-flex items-center">
          <span className="text-yellow-300 mr-2">✦</span>
          জামিয়া হুসাইনিয়া মাদ্রাসায় আপনাকে স্বাগতম
          <span className="text-yellow-300 ml-2">✦</span>
        </span>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;