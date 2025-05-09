import React from "react";
import avaterImage from "/avater.png";

const Authority = ({ name, title }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
      <div className="relative mb-4">
        <img
          src={avaterImage}
          alt={`${name}'s avatar`}
          className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
        />
        <div className="absolute -bottom-2 -right-2 bg-blue-500 dark:bg-blue-400 p-2 rounded-full">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">{title}</p>
    </div>
  );
};

export default Authority;