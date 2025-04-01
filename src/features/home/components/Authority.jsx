import React from "react";
import avaterImage from '/avater.png';

const Authority = ({ name, title }) => {
  return (
    <div className="p-4 rounded-lg shadow-2xl transition-all duration-300 space-y-2 block mx-auto">
      <img src={avaterImage} alt={`${name}'s avatar`} className="w-48 h-48 rounded-full block mx-auto mb-4" />
      <h3 className="text-lg font-bold">{name}</h3>
      <h5 className="text-md">{title}</h5>
    </div>
  );
};

export default Authority;