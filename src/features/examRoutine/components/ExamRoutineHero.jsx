import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Printer } from "lucide-react";
import examRoutineService from "../services/examRoutine.services";

const ExamRoutineHero = ({ activeSession, onSelectSession }) => {
  const { data: apiSessions } = useQuery({
    queryKey: ["examSessions"],
    queryFn: () => examRoutineService.getAllSessions(),
    staleTime: 1000 * 60 * 5,
  });

  const sessions = useMemo(() => {
    const raw = Array.isArray(apiSessions) ? apiSessions : apiSessions?.results || [];
    if (raw.length > 0) {
      return raw.map((s) => ({
        id: s.session_id,
        name: s.name,
        badge: s.badge,
      }));
    }
    return [
      { id: "annual", name: "বার্ষিক শালানা ইমতিহান", badge: "আসন্ন প্রধান পরীক্ষা" },
      { id: "befaq", name: "বেফাকুল মাদারিস কেন্দ্রীয় পরীক্ষা", badge: "বোর্ড পরীক্ষা" },
      { id: "term1", name: "১ম সাময়িক পরীক্ষা", badge: "সম্পন্ন" },
      { id: "term2", name: "২য় সাময়িক পরীক্ষা", badge: "সম্পন্ন" },
    ];
  }, [apiSessions]);
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="w-full bg-[#f1f3ff] border-b border-slate-200/60 pt-6 sm:pt-10 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with Session pill & Print button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-primary text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            পরীক্ষা নিয়ন্ত্রণ দফতর • জামিয়া হুসাইনিয়া
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-primary hover:border-primary/40 hover:bg-slate-50 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Printer className="w-3.5 h-3.5 text-primary" />
            <span>রুটিন প্রিন্ট / PDF</span>
          </button>
        </div>

        {/* Heading & Intro */}
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-main tracking-tight leading-snug">
            পরীক্ষার রুটিন ও সময়সূচি
          </h1>
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
            হিফজুল কুরআন, নূরানী-মক্তব এবং কিতাব বিভাগের ১ম সাময়িক, ২য় সাময়িক ও বার্ষিক
            শালানা ইমতিহানের অনুমোদিত কেন্দ্রীয় রুটিন। জামাত ও বিষয়ভিত্তিক পরীক্ষার তারিখ এবং হল বরাদ্দ।
          </p>
        </div>

        {/* Session Switcher Pills */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {sessions.map((session) => {
            const isActive = activeSession === session.id;
            return (
              <button
                key={session.id}
                type="button"
                onClick={() => onSelectSession(session.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                <span>{session.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-emerald-50 text-emerald-800"
                  }`}
                >
                  {session.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExamRoutineHero;
