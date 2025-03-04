import React from "react";
import AuthorityAvatar from "../../../../public/screencapture-localhost-5173-2025-02-07-12_28_22_lffcqt_gakal8.png";

const Authority = ({
  name,
  title,
  educational_qualification,
  brief_description,
}) => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      <img
        src={AuthorityAvatar}
        alt={`${name}'s avatar`}
        className="w-24 h-24 rounded-full mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <h5 className="text-md text-gray-600">{title}</h5>
      <h6 className="text-sm text-gray-500">{educational_qualification}</h6>
      <p className="text-sm text-gray-700 mt-2">{brief_description}</p>
    </div>
  );
};

export default Authority;
