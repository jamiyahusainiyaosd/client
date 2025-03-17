import React from "react";
import avaterImage from '/avater.png';

const Authority = ({ name, title, educational_qualification }) => {
  return (
    <div className="p-4 rounded-lg shadow-2xl transition-all duration-300 text-center space-y-2">
      <img src={avaterImage} alt={`${name}'s avatar`} className="w-48 h-48 rounded-full mx-auto mb-4" />
      <h3 className="text-xl font-semibold">{name}</h3>
      <h5 className="text-md">{title}</h5>
      <h6 className="text-sm">{educational_qualification}</h6>
    </div>
  );
};

export default Authority;