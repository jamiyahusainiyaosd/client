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
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        সাম্প্রতিক নোটিশগুলো
      </h1>

      {isError && <p className="text-red-500">{error.message}</p>}

      <ul className="list-disc pl-5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
        {isPending && (
          <li className="col-span-full flex justify-center py-10">
            <ClockLoader color="#4A90E2" size={50} />
          </li>
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
      </ul>
    </section>
  );
};

export default RecentNotices;
