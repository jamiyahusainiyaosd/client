import React from "react";
import formateDate from "../../../utils/formateData";
import avatarImage from "/avater.png";

const Teacher = ({ 
  avatar, 
  name, 
  designation, 
  phone_number, 
  created_at, 
  updated_at 
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg flex flex-col items-center">
      <img 
        src={avatar || avatarImage} 
        alt={name} 
        className="w-24 h-24 rounded-full object-cover mb-4" 
      />
      
      <h3 className="text-xl font-semibold text-center mb-2">{name}</h3>
      <p className="mb-2">🎓 {designation}</p>
      <p className="text-sm mb-2">📞 যোগাযোগ: {phone_number}</p>
      
      <p className="text-sm mb-2">
        🗓️ প্রকাশের তারিখ : {formateDate(created_at)}
      </p>
      <p className="text-sm whitespace-nowrap">
        🗓️ আপডেটের তারিখ : {formateDate(updated_at)}
      </p>
    </div>
  );
};

export default Teacher;