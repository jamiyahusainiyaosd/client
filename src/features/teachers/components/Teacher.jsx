import React from "react";
import formateDate from "../../../utils/formateData";
import avatarImage from "/avater.png";
import { FaChalkboardTeacher, FaPhone, FaCalendarAlt } from "react-icons/fa";

const Teacher = ({
  avatar,
  name,
  designation,
  phone_number,
  created_at,
  updated_at,
}) => {
  return (
    <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-blue-300 transition-all duration-300 flex flex-col items-center text-center">
      <div className="relative mb-4">
        <img
          src={avatar || avatarImage}
          alt={name}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
          onError={(e) => {
            e.target.src = avatarImage;
          }}
        />
      </div>

      <h3 className="text-xl font-bold text-gray-100 mb-2">{name}</h3>

      <div className="flex items-center gap-2 mb-3">
        <FaChalkboardTeacher />
        <p>{designation}</p>
      </div>

      <div className="flex items-center gap-2 text-gray-300 mb-3">
        <FaPhone className="text-blue-300" />
        <p>{phone_number || "প্রদান করা হয়নি"}</p>
      </div>

      <div className="text-sm text-gray-400 space-y-1 w-full">
        <div className="flex items-center justify-center gap-2">
          <FaCalendarAlt className="text-blue-300" />
          <span>যোগদান: {formateDate(created_at)}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <FaCalendarAlt className="text-blue-300" />
          <span>সর্বশেষ আপডেট: {formateDate(updated_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
