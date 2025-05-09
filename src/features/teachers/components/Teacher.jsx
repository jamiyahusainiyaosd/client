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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 group">
      <div className="relative mb-5">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300"></div>
        <img
          src={avatar || avatarImage}
          alt={name}
          className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md mx-auto relative z-10"
          onError={(e) => {
            e.target.src = avatarImage;
          }}
        />
      </div>

      <div className="text-center space-y-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>

        <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
          <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-lg">
            <FaChalkboardTeacher className="text-blue-500 dark:text-blue-400" />
          </div>
          <p>{designation}</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
          <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-lg">
            <FaPhone className="text-blue-500 dark:text-blue-400" />
          </div>
          <p>{phone_number || "প্রদান করা হয়নি"}</p>
        </div>

        <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FaCalendarAlt className="text-blue-500 dark:text-blue-400" />
            <span>যোগদান: {formateDate(created_at)}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FaCalendarAlt className="text-blue-500 dark:text-blue-400" />
            <span>সর্বশেষ আপডেট: {formateDate(updated_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;