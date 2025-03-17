import React from "react";
import { useNavigate } from "react-router-dom";
import Time from '../../../utils/formateData';

const Notice = ({ title, created_at, id }) => {
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate(`/notice/${id}`);
  };
  return (
    <div className="p-4 border rounded-lg space-y-3 shadow-2xl">
      <h3 className="text-2xl font-semibold" style={{color:'wheat'}}>{title}</h3>
      <p className="text-base font-medium">
        🗓️ {Time(created_at)}
      </p>
      <button onClick={handleDetails} className="button1 mt-5">
        📄 বিস্তারিত দেখুন
      </button>
    </div>
  );
};

export default Notice;