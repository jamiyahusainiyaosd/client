import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import homeService from "../services/home.services";

const DEFAULT_ANNOUNCEMENTS = [
  "জামিয়া হুসাইনিয়া মাদ্রাসায় আপনাকে স্বাগতম – কুরআন, সুন্নাহ ও সলফে সালেহীনের পথে দ্বীনি তালীমের সুবাস ছড়িয়ে দিতে আমরা প্রতিশ্রুতিবদ্ধ।",
  "হিফয, নুরানী ও কিতাব বিভাগ সমূহে ভর্তি চলছে।",
  "যেকোনো জরুরি প্রয়োজনে অফিস হটলাইনে যোগাযোগ করুন: +880 1751 699909",
];

const Marquee = () => {
  const { data } = useQuery({
    queryKey: ["marqueeAnnouncements"],
    queryFn: homeService.getAnnouncements,
  });

  const announcements = useMemo(() => {
    const rawList = data?.data || data?.results || data;
    if (Array.isArray(rawList) && rawList.length > 0) {
      return rawList
        .map((item) => (typeof item === "string" ? item : item?.text))
        .filter(Boolean);
    }
    return DEFAULT_ANNOUNCEMENTS;
  }, [data]);

  const animationDuration = Math.max(10, announcements.length * 3);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs group">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Left label */}
      <div className="absolute left-0 inset-y-0 flex items-center z-20">
        <div className="px-3 sm:px-4 py-0 h-full flex items-center gap-1.5 border-r border-slate-200/80 bg-primary text-white shadow-xs">
          <span className="material-symbols-outlined text-[16px]">campaign</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
            ঘোষণা
          </span>
        </div>
      </div>

      <div className="pl-24 sm:pl-28 py-3 overflow-hidden cursor-default" title="মাউস বা টাচ করে রাখলে থামবে">
        <div
          className="marquee-track whitespace-nowrap flex items-center group-hover:[animation-play-state:paused] active:[animation-play-state:paused]"
          style={{
            "--marquee-duration": `${animationDuration}s`,
            animationDuration: `${animationDuration}s`,
          }}
        >
          {announcements.map((text, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-3 mx-6 sm:mx-8 text-xs sm:text-sm text-slate-700 font-medium"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              {text}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {announcements.map((text, idx) => (
            <span
              key={`dup-${idx}`}
              className="inline-flex items-center gap-3 mx-6 sm:mx-8 text-xs sm:text-sm text-slate-700 font-medium"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-slide var(--marquee-duration, 10s) linear infinite;
        }
        @media (max-width: 640px) {
          .marquee-track {
            animation-duration: calc(var(--marquee-duration, 10s) * 0.48) !important;
          }
        }
        @keyframes marquee-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
