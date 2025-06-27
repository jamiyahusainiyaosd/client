import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ClockLoader } from "react-spinners";
import homeService from "../services/home.services";
import RecentNotice from "./RecentNotice";

const RecentNotices = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recentNotices"],
    queryFn: homeService.getLatestNotice,
    retry: false,
  });

  const refinedData = useMemo(() => {
    try {
      if (!data) return [];
      if (Array.isArray(data)) return data;

      if (data.data && Array.isArray(data.data)) return data.data;
      if (data.notices && Array.isArray(data.notices)) return data.notices;
      if (data.items && Array.isArray(data.items)) return data.items;
      if (data.results && Array.isArray(data.results)) return data.results;
      if (typeof data === "object" && data !== null) return [data];

      return [];
    } catch (err) {
      console.error("Data processing error:", err);
      return [];
    }
  }, [data]);
  return (
    <section className="max-w-4xl mx-auto">
      <div className="relative group mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          সাম্প্রতিক নোটিশ
        </h1>
      </div>

      {isPending && (
        <div className="flex justify-center py-10">
          <ClockLoader color="#3B82F6" size={50} />
        </div>
      )}

      {isError && (
        <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-6">
          <p className="font-medium">ত্রুটি:</p>
          <p>{error?.message || "ডাটা লোড করতে সমস্যা হয়েছে"}</p>
        </div>
      )}

      {!isPending && !isError && (
        <div className="space-y-4">
          {refinedData.length > 0 ? (
            refinedData.map((item) => (
              <RecentNotice
                key={item.id}
                title={item.title}
                created_at={item.created_at}
                id={item.id}
              />
            ))
          ) : (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p>কোন নোটিশ পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default RecentNotices;
