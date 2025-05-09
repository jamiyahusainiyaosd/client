import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { ClockLoader } from "react-spinners";
import homeService from "../services/home.services";
import RecentNotice from "./RecentNotice";

const RecentNotices = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recentNotices"],
    queryFn: homeService.getLatestNotice,
  });
  const refinedData = useMemo(() => data?.data, [data]);
  
  return (
    <section className="max-w-4xl mx-auto">
      <div className="relative group mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white inline-block relative">
          <span className="absolute -bottom-1 left-0 w-0 h-1 bg-blue-500 dark:bg-blue-400 transition-all duration-500 group-hover:w-full"></span>
          সাম্প্রতিক নোটিশ
        </h1>
        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
      </div>

      {isError && (
        <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 p-4 mb-6 rounded-r-lg">
          <p>{error.message}</p>
        </div>
      )}

      <div className="space-y-4">
        {isPending && (
          <div className="flex justify-center py-10">
            <ClockLoader color="#3B82F6" size={50} />
          </div>
        )}

        {!isPending &&
          refinedData?.map(({ id, title, created_at }) => (
            <RecentNotice
              key={id}
              created_at={created_at}
              id={id}
              title={title}
            />
          ))}
      </div>
    </section>
  );
};

export default RecentNotices;