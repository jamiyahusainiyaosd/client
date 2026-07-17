import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Bell } from "lucide-react";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
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
      {/* Section Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-500">
            লাইভ আপডেট
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          সাম্প্রতিক নোটিশ
        </h2>
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

        {/* Improved Empty State */}
        {!isPending && !isError && !refinedData?.length && (
          <div className="py-14 text-center px-6">
            <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <Bell className="w-6 h-6 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              এই মুহূর্তে কোনো নোটিশ পাওয়া যায়নি।
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              নতুন নোটিশ প্রকাশিত হলে এখানে দেখাবে।
            </p>
          </div>
        )}

        {!isPending && refinedData?.length > 0 && (
          <div className="divide-y divide-slate-100 dark:divide-slate-700/40 p-2">
            {refinedData.map(({ id, title, created_at }) => (
              <RecentNotice key={id} id={id} title={title} created_at={created_at} />
            ))}
          </div>
        )}

        {/* "সব নোটিশ দেখুন" CTA */}
        {!isPending && (
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800/60">
            <NavLink
              to="/notice"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-150 py-1 group"
            >
              সকল নোটিশ দেখুন
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
            </NavLink>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentNotices;