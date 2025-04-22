import React from "react";
import mapImage from "/map.png";

const ContactUsLeftDiv = () => {
  return (
    <div className="w-full lg:w-1/2 h-full">
      <div className="bg-gray-700 p-1 rounded-xl shadow-lg border border-gray-600 h-full">
        <img 
          src={mapImage} 
          alt="Google Map" 
          className="w-full h-full min-h-[400px] object-cover rounded-xl shadow-md" 
        />
      </div>
    </div>
  );
};

export default ContactUsLeftDiv;