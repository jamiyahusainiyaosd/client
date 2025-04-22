import React from "react";
import { useNavigate } from "react-router-dom";
import Time from "../../../utils/formateData";
import { FaChair, FaUserGraduate, FaCalendarAlt } from "react-icons/fa";
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
  const handleBack = () => {
    navigate("/academic");
  };

  return (
    <div className="bg-gray-700 mt-22 p-6 rounded-xl shadow-lg border border-gray-600 w-full max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <HiOutlineAcademicCap className="text-cyan-400 text-3xl" />
        <h1 className="text-2xl font-bold text-cyan-400">{className}</h1>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">{classTitle}</h2>
          <p className="text-gray-300">{classDescription}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg">
            <FaChair className="text-amber-400 text-xl" />
            <div>
              <p className="text-gray-400 text-sm">আসন সংখ্যা</p>
              <p className="text-gray-100 font-medium">{classSetCount || 'N/A'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg">
            <FaUserGraduate className="text-amber-400 text-xl" />
            <div>
              <p className="text-gray-400 text-sm">ছাত্র সংখ্যা</p>
              <p className="text-gray-100 font-medium">{classStudentCount || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg">
            <FaCalendarAlt className="text-amber-400 text-xl" />
            <div>
              <p className="text-gray-400 text-sm">এড করার তারিখ</p>
              <p className="text-gray-100 font-medium">{Time(createdAt)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg">
            <FaCalendarAlt className="text-amber-400 text-xl" />
            <div>
              <p className="text-gray-400 text-sm">আপডেট করার তারিখ</p>
              <p className="text-gray-100 font-medium">{Time(updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <button onClick={handleBack} className="mt-4 button1">
        🔙 ফিরে যান
      </button>
    </div>
  );
};

export default AcademicDetail;