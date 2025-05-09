import React from "react";
import { useNavigate } from "react-router-dom";
import Time from "../../../utils/formateData";
import { FaChair, FaUserGraduate, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";

const AcademicDetail = ({
  className,
  classTitle,
  classSetCount,
  classStudentCount,
  classDescription,
  createdAt,
  updatedAt,
}) => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-start gap-4">
        <div className="bg-black text-white dark:bg-white dark:text-black p-3 rounded-lg shadow-md">
          <HiOutlineAcademicCap className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{className}</h1>
          <p className="text-gray-600 dark:text-gray-300">{classTitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div className="bg-gray-200 dark:bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">বিবরণ</h2>
          <p className="text-gray-700 dark:text-gray-300 text-justify">{classDescription}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Seats */}
          <div className="bg-gray-200 dark:bg-gray-900 p-4 rounded-lg flex items-center gap-4">
            <div className="bg-black text-white dark:bg-white dark:text-black p-3 rounded-lg">
              <FaChair className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">আসন সংখ্যা</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {classSetCount || 'প্রযোজ্য নয়'}
              </p>
            </div>
          </div>

          {/* Students */}
          <div className="bg-gray-200 dark:bg-gray-900 p-4 rounded-lg flex items-center gap-4">
            <div className="bg-black text-white dark:bg-white dark:text-black p-3 rounded-lg">
              <FaUserGraduate className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">ছাত্র সংখ্যা</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {classStudentCount || 'প্রযোজ্য নয়'}
              </p>
            </div>
          </div>
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Created At */}
          <div className="bg-gray-200 dark:bg-gray-900 p-4 rounded-lg flex items-center gap-4">
            <div className="bg-black text-white dark:bg-white dark:text-black p-3 rounded-lg">
              <FaCalendarAlt className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">তৈরির তারিখ</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {Time(createdAt)}
              </p>
            </div>
          </div>

          {/* Updated At */}
          <div className="bg-gray-200 dark:bg-gray-900 p-4 rounded-lg flex items-center gap-4">
            <div className="bg-black text-white dark:bg-white dark:text-black p-3 rounded-lg">
              <FaCalendarAlt className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">আপডেট তারিখ</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {Time(updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
        >
          <FaArrowLeft />
          ফিরে যান
        </button>
      </div>
    </div>
  );
};

export default AcademicDetail;