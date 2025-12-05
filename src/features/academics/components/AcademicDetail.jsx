// src/features/academics/components/AcademicDetail.jsx
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChair,
  FaUserGraduate,
} from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Time from "../../../utils/formateData";

const AcademicDetail = ({
  className,
  classTitle,
  classSetCount,
  classStudentCount,
  classDescription,
  createdAt,
}) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 
      border border-emerald-100/70 dark:border-emerald-700/40 
      shadow-xl shadow-emerald-900/10 overflow-hidden">

      {/* Header */}
      <div className="flex items-start gap-4 p-6 border-b 
        border-emerald-100 dark:border-emerald-700">

        <div className="bg-gradient-to-br from-emerald-600 to-emerald-400 
          text-white p-3 rounded-xl shadow-lg">
          <HiOutlineAcademicCap className="text-2xl" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {className}
          </h1>
          <p className="text-slate-600 dark:text-slate-300">{classTitle}</p>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 space-y-7">

        <div className="bg-emerald-50 dark:bg-slate-800/80 border border-emerald-200 
          dark:border-emerald-700 p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
            বিবরণ
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-justify leading-relaxed">
            {classDescription}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Seats */}
          <div className="flex gap-4 items-center bg-white/50 dark:bg-slate-800/70 
            border border-emerald-100 dark:border-emerald-700 rounded-xl p-5">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-400 
              text-white p-3 rounded-lg shadow">
              <FaChair className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">আসন সংখ্যা</p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {classSetCount || "প্রযোজ্য নয়"}
              </p>
            </div>
          </div>

          {/* Students */}
          <div className="flex gap-4 items-center bg-white/50 dark:bg-slate-800/70 
            border border-emerald-100 dark:border-emerald-700 rounded-xl p-5">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-400 
              text-white p-3 rounded-lg shadow">
              <FaUserGraduate className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">ছাত্র সংখ্যা</p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {classStudentCount || "প্রযোজ্য নয়"}
              </p>
            </div>
          </div>
        </div>

        {/* Created At */}
        <div className="flex gap-4 items-center bg-white/50 dark:bg-slate-800/70 
          border border-emerald-100 dark:border-emerald-700 rounded-xl p-5">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-400 
            text-white p-3 rounded-lg shadow">
            <FaCalendarAlt className="text-xl" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">তৈরির তারিখ</p>
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {Time(createdAt)}
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="p-4 border-t border-emerald-100 dark:border-emerald-700 
        flex justify-end">

        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r 
          from-emerald-600 to-emerald-500 text-white shadow-md 
          hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <FaArrowLeft />
          ফিরে যান
        </button>

      </div>
    </div>
  );
};

export default AcademicDetail;
