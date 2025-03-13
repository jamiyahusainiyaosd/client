import { format } from 'date-fns';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const RecentNotice = ({id,title,created_at}) => {
    const navigate = useNavigate();
  return (
    <li className="w-full p-6 shadow-2xl rounded-lg transition duration-300 cursor-pointer hover:border-b-2 hover:border-white">
      <h2
        onClick={() => navigate(`/notice/${id}`)}
        className="text-2xl font-semibold text-gray-800 mb-3"
      >
        {title}
      </h2>
      <p className="text-base text-gray-600">
        {format(new Date(created_at), "dd MMM yyyy, hh:mm a")}
      </p>
    </li>
  )
}

export default RecentNotice