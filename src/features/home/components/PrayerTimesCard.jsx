import React from "react";
import { useQuery } from "@tanstack/react-query";
import { themeService } from "../../../services/theme.service";

const PrayerTimesCard = () => {
  const { data: prayerData } = useQuery({
    queryKey: ["prayerTimes"],
    queryFn: themeService.getPrayerTimes,
    staleTime: 1000 * 60 * 5,
  });

  // If disabled by Admin, don't show
  if (prayerData && prayerData.is_active === false) {
    return null;
  }

  const prayers = [
    { name: "ফজর", time: prayerData?.fajr || "৫:১৫ AM", icon: "wb_twilight" },
    { name: "যোহর", time: prayerData?.zuhr || "১:৩০ PM", icon: "light_mode" },
    { name: "আসর", time: prayerData?.asr || "৪:৪৫ PM", icon: "wb_sunny" },
    { name: "মাগরিব", time: prayerData?.maghrib || "৬:০৫ PM", icon: "nights_stay" },
    { name: "এশা", time: prayerData?.isha || "৮:০০ PM", icon: "bedtime" },
    { name: "জুমু'আ", time: prayerData?.jummah || "১:৩০ PM", icon: "mosque" },
  ];

  return (
    <div className="site-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 border border-primary-border/60">
            <span className="material-symbols-outlined text-[20px]">mosque</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-snug">
              দৈনিক জামা'আতের <span className="text-primary">সময়সূচি</span>
            </h3>
            <p className="text-[11px] text-muted font-medium line-clamp-1">
              {prayerData?.sub_title || "জামিয়া হুসাইনিয়া কেন্দ্রীয় মসজিদ"}
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>জামা'আত</span>
        </span>
      </div>

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-2 gap-2">
        {prayers.map((prayer, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#f1f3ff] border border-slate-200/60 hover:border-primary/40 transition-colors duration-150"
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-primary">
                {prayer.icon}
              </span>
              <span className="text-xs font-semibold text-slate-700">
                {prayer.name}
              </span>
            </div>
            <span className="text-xs font-bold text-main font-sans">
              {prayer.time}
            </span>
          </div>
        ))}
      </div>

      {/* Sehri & Iftar Banner (if configured) */}
      {(prayerData?.sehri_end || prayerData?.iftar) && (
        <div className="mt-3 px-3 py-1.5 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-between text-[11px] text-amber-900 font-medium">
          <div className="flex items-center gap-1">
            <span className="text-amber-600 font-bold">🌙 সাহরী শেষ:</span>
            <span className="font-sans font-bold">{prayerData.sehri_end || "৪:৪৫ AM"}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber-600 font-bold">ইফতার:</span>
            <span className="font-sans font-bold">{prayerData.iftar || "৬:১০ PM"}</span>
          </div>
        </div>
      )}

      {/* Special Note */}
      {prayerData?.special_note && (
        <div className="mt-3 flex items-start gap-1.5 text-[11px] text-muted leading-tight">
          <span className="material-symbols-outlined text-[14px] text-primary shrink-0 mt-0.5">
            info
          </span>
          <span>{prayerData.special_note}</span>
        </div>
      )}
    </div>
  );
};

export default PrayerTimesCard;
