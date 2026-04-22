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
    <section>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-500">
            লাইভ আপডেট
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          সাম্প্রতিক নোটিশ
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          মাদ্রাসার সর্বশেষ নোটিশ ও গুরুত্বপূর্ণ ঘোষণা
        </p>
      </div>

      {/* Content card */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/60 dark:bg-slate-800/30 backdrop-blur-sm overflow-hidden">
        {isError && (
          <div className="m-3 rounded-xl border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            নোটিশ লোড করতে সমস্যা হয়েছে: {error.message}
          </div>
        )}

        {isPending && (
          <div className="flex justify-center py-12">
            <ClockLoader color="#10B981" size={36} />
          </div>
        )}

        {!isPending && !isError && !refinedData?.length && (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-400 dark:text-slate-500">
              এই মুহূর্তে কোনো নোটিশ পাওয়া যায়নি।
            </p>
          </div>
        )}

        {!isPending && refinedData?.length > 0 && (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60 p-2">
            {refinedData.map(({ id, title, created_at }, idx) => (
              <div key={id} className={idx === 0 ? "" : ""}>
                <RecentNotice id={id} title={title} created_at={created_at} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentNotices;