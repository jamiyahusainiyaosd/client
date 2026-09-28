import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import admissionService from "../../admission/services/admission.services";

const quickServices = [
  {
    title: "ভর্তি আবেদন",
    subtitle: "নিয়মাবলী ও ফরম",
    icon: "how_to_reg",
    path: "/admission",
    badge: "চলমান",
    badgeColor: "bg-primary-light text-primary border border-primary-border/60",
  },
  {
    title: "একাডেমিক বিভাগ",
    subtitle: "নূরানী, হিফজ ও কিতাব",
    icon: "menu_book",
    path: "/academic",
  },
  {
    title: "নোটিশ বোর্ড",
    subtitle: "জরুরি নোটিশ ও বিজ্ঞপ্তি",
    icon: "campaign",
    path: "/notice",
    badge: "নতুন",
    badgeColor: "bg-amber-100 text-amber-800 border border-amber-200/60",
  },
  {
    title: "পরীক্ষার ফলাফল",
    subtitle: "সকল জামাতের রেজাল্ট",
    icon: "assignment_turned_in",
    path: "/results",
  },
  {
    title: "সাবেক ছাত্রগণ",
    subtitle: "প্রাক্তনীদের বিস্তারিত তালিকা",
    icon: "groups",
    path: "/former-students",
  },
  {
    title: "অনলাইন অনুদান",
    subtitle: "ছাত্রকল্যাণ ও লিল্লা ফান্ড",
    icon: "volunteer_activism",
    path: "/expatriateGrant",
    badge: "দান",
    badgeColor: "bg-primary-light text-primary border border-primary-border/60",
  },
];

const HomeQuickServices = () => {
  const { data: admissionStatus } = useQuery({
    queryKey: ["admissionStatus"],
    queryFn: admissionService.getStatus,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="w-full mb-8 sm:mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <h2 className="text-base sm:text-lg font-bold text-main tracking-tight">
            প্রয়োজনীয় সেবা ও দ্রুত নেভিগেশন
          </h2>
        </div>
        <span className="text-xs text-muted hidden sm:inline-block">
          সরাসরি সেবা নির্বাচন করুন
        </span>
      </div>

      {/* Services Grid: 2 cols on mobile, 3 on tablet, 6 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {quickServices.map((item, idx) => {
          let badgeText = item.badge;
          let badgeColor = item.badgeColor;

          if (item.path === "/admission" && admissionStatus) {
            if (admissionStatus.is_open === false) {
              badgeText = admissionStatus.badge_text_closed || "ভর্তি সমাপ্ত";
              badgeColor = "bg-amber-100 text-amber-800 border border-amber-200/60";
            } else {
              badgeText = admissionStatus.badge_text_open || "চলমান";
              badgeColor = "bg-primary-light text-primary border border-primary-border/60";
            }
          }

          return (
            <Link
              key={idx}
              to={item.path}
              className="group relative bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 active:scale-98 transition-all duration-200 flex flex-col justify-between"
            >
              {badgeText && (
                <span
                  className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold font-sans ${
                    badgeColor || "bg-slate-100 text-slate-700"
                  }`}
                >
                  {badgeText}
                </span>
              )}

            <div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center mb-2.5 sm:mb-3 group-hover:bg-slate-100 group-hover:text-slate-900 transition-colors duration-200 shadow-xs">
                <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
                  {item.icon}
                </span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-main group-hover:text-primary transition-colors leading-snug">
                {item.title}
              </h3>
            </div>

            <p className="text-[11px] text-muted mt-1 line-clamp-1">
              {item.subtitle}
            </p>
          </Link>
        );
      })}
      </div>
    </section>
  );
};

export default HomeQuickServices;
