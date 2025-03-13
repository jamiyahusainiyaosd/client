import React from "react";
import mapImage from "/map.png";

const ContactUsLeftDiv = () => {
  return (
    <>
      <div className="w-full md:w-1/2 h-auto mb-6 md:mb-0">
        <img
          src={mapImage}
          alt="Google Map"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </>
  );
};

export default ContactUsLeftDiv;
