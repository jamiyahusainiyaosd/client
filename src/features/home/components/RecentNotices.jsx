import { useQuery } from "@tanstack/react-query";
import React from "react";
import recentNoticeService from "../services/recentNotice.service";
import RecentNotice from "./RecentNotice";
import { ClockLoader } from "react-spinners";

const RecentNotices = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recentNotices"],
    queryFn: recentNoticeService.getRecentNoticesService,
  });

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Recent Notices</h1>

      {isError && <p className="text-red-500">{error.message}</p>}

      <ul className="list-disc pl-5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
        {isPending && (
          <li className="col-span-full flex justify-center py-10">
            <ClockLoader color="#4A90E2" size={50} />
          </li>
        )}

        {!isPending &&
          data?.data.map((notice) => (
            <RecentNotice
              key={notice.id}
              created_at={notice.created_at}
              id={notice.id}
              title={notice.title}
            />
          ))}
      </ul>
    </section>
  );
};

export default RecentNotices;
