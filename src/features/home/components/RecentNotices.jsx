import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          লাইভ আপডেট
        </div>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              সাম্প্রতিক নোটিশ
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              মাদ্রাসার সর্বশেষ নোটিশ ও গুরুত্বপূর্ণ ঘোষণা দেখুন।
            </p>
          </div>
        </div>
        <div className="mt-3 w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
      </div>

      {isError && (
        <div className="mb-6 rounded-2xl border-l-4 border-red-500 bg-red-50/90 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200">
          নোটিশ লোড করতে সমস্যা হয়েছে: {error.message}
        </div>
      )}

      <div className="space-y-3">
        {isPending && (
          <div className="flex justify-center py-10">
            <ClockLoader color="#10B981" size={46} />
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

        {!isPending && !refinedData?.length && !isError && (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">
            এই মুহূর্তে কোনো নোটিশ পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
};

export default RecentNotices;
