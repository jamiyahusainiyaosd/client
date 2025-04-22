import React from "react";
import avaterImage from "/avater.png";

const Authority = ({ name, title }) => {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 space-y-3 w-full">
      <img
        src={avaterImage}
        alt={`${name}'s avatar`}
        className="w-40 h-40 rounded-full block mx-auto mb-4 border-4 border-cyan-400 object-cover"
      />
      <h3 className="text-xl font-bold text-gray-100 text-center">{name}</h3>
      <h5 className="text-md text-center text-gray-400">{title}</h5>
    </div>
  );
};

export default Authority;