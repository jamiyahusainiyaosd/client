import React from "react";
import { useNavigate } from "react-router-dom";
import Time from "../../../utils/formateData";

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
    <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 border rounded-lg shadow-xl max-w-[700px] w-full bg-transparent">
      <h1 className="text-2xl sm:text-3xl font-semibold" style={{color:'wheat'}}>
        {className}
      </h1>
      <hr className="my-4 border-gray-300" />

      <div className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          {classTitle}
        </h2>
        <p className="text-sm sm:text-base">{classDescription}</p>
        <p className="text-sm sm:text-base mt-2">
          <span className="font-medium">🪑 আসন সংখ্যা:</span> {classSetCount} |
          <span className="font-medium"> 👨‍🎓 ছাত্র সংখ্যা:</span>{" "}
          {classStudentCount}
        </p>
        <p className="text-sm sm:text-base mt-2">
          🗓️ <span className="font-medium">এড করার তারিখ:</span>{" "}
          {Time (createdAt)}
        </p>
        <p className="text-sm sm:text-base">
          🗓️ <span className="font-medium">আপডেট করার তারিখ:</span>{" "}
          {Time (updatedAt)}
        </p>
      </div>

      <button onClick={handleBack} className="mt-4 button1">
        🔙 ফিরে যান
      </button>
    </div>
  );
};

export default AcademicDetail;