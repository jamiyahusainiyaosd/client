import React from "react";
import avatarImage from "/avater.png";
import formateDate from "../../../utils/formateData";

const Teacher = ({
  avatar,
  name,
  designation,
  phone_number,
  created_at,
  updated_at,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg flex flex-col items-center">
      <img
        src={avatar || avatarImage}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mb-3"
      />
      <h3 className="text-xl font-semibold text-center">{name}</h3>
      <p className="text-gray-600">{designation}</p>
      <p className="text-sm text-gray-500">যোগাযোগ: {phone_number}</p>
      <p className="text-sm text-gray-500">
        🗓️ এড করার তারিখ : {formateDate(created_at)}
      </p>
      <p className="text-sm text-gray-500">
        🗓️ আপডেট করার তারিখ : {formateDate(updated_at)}
      </p>
    </div>
  );
};

export default Teacher;
