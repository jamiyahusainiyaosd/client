import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import { baseUrl } from "../../../constants/env.constants";

const fetchRecentNotices = async () => {
  const response = await fetch(`${baseUrl}/notices/latest`);
  if (!response.ok) {
    throw new Error("Failed to fetch recent notices");
  }
  return response.json();
};

const RecentNotice = ({ id, title, created_at }) => {
  const navigate = useNavigate();

  return (
    <li className="w-full p-6 shadow-2xl rounded-lg transition duration-300 cursor-pointer hover:border-b-2 hover:border-white">
      <h2 onClick={() => navigate(`/notices/${id}`)} className="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
      <p className="text-base text-gray-600">
        {format(new Date(created_at), "dd MMM yyyy, hh:mm a")}
      </p>
    </li>
  );
};

const RecentNotices = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recentNotices"],
    queryFn: fetchRecentNotices,
  });

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">সাম্প্রতিক নোটিশগুলো</h1>

      {isError && <p className="text-red-500">{error.message}</p>}

      <ul className="list-disc pl-5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
        {isPending && (
          <li className="col-span-full flex justify-center py-10">
            <ClockLoader color="#4A90E2" size={50} />
          </li>
        )}

        {!isPending &&
          data?.map((notice) => (
            <RecentNotice key={notice.id} created_at={notice.created_at} id={notice.id} title={notice.title} />
          ))}
      </ul>
    </section>
  );
};

export default RecentNotices;