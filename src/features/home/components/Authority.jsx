import React from "react";
import avaterImage from '/avater.png';

const Authority = ({ name, title, educational_qualification }) => {
  return (
    <div className="flex flex-col items-center p-4 rounded-lg shadow-2xl transition-all duration-300">
      <img src={avaterImage} alt={`${name}'s avatar`} className="w-48 h-48 rounded-full mb-4" />
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <h5 className="text-md text-gray-600">{title}</h5>
      <h6 className="text-sm text-gray-500">{educational_qualification}</h6>
    </div>
  );
};

export default Authority;