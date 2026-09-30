import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Bell } from "lucide-react";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import homeService from "../services/home.services";
import RecentNotice from "./RecentNotice";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";

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
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            লাইভ আপডেট
          </span>
          <span className="text-secondary text-xs">•</span>
          <span className="text-secondary text-xs font-medium">বিজ্ঞপ্তি ও এলান</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          সাম্প্রতিক <span className="text-primary">নোটিশ</span>
        </h2>
        <p className="text-sm text-muted mt-1">
          মাদ্রাসার সর্বশেষ নোটিশ ও গুরুত্বপূর্ণ ঘোষণা
        </p>
      </div>

      {/* Content card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        {isError && (
          <div className="py-4">
            <Error errorMessage={error?.message} />
          </div>
        )}

        {isPending && (
          <div className="py-6">
            <Loader />
          </div>
        )}

        {/* Improved Empty State */}
        {!isPending && !isError && !refinedData?.length && (
          <div className="py-14 text-center px-6">
            <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center rounded-2xl bg-[#f1f3ff]">
              <Bell className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              এই মুহূর্তে কোনো নোটিশ পাওয়া যায়নি।
            </p>
            <p className="text-xs text-slate-400 mt-1">
              নতুন নোটিশ প্রকাশিত হলে এখানে দেখাবে।
            </p>
          </div>
        )}

        {!isPending && refinedData?.length > 0 && (
          <div className="divide-y divide-slate-100 p-2">
            {refinedData.map(({ id, title, created_at }) => (
              <RecentNotice
                key={id}
                id={id}
                title={title}
                created_at={created_at}
              />
            ))}
          </div>
        )}

        {/* "সব নোটিশ দেখুন" CTA */}
        {!isPending && (
          <div className="px-4 py-3 border-t border-slate-100">
            <NavLink
              to="/notice"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors duration-150 py-1 group"
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
