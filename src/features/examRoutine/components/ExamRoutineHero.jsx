import React, { useMemo, useEffect } from "react";
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
    const raw = Array.isArray(apiSessions)
      ? apiSessions
      : apiSessions?.results || apiSessions?.sessions || [];
    return raw.map((s) => ({
      id: s.session_id || s.id || s.slug,
      name: s.name || s.title || s.session_name,
      badge: s.badge || s.badge_text || "",
    }));
  }, [apiSessions]);

  // When sessions are fetched, if activeSession is unset or not found, select first available session
  useEffect(() => {
    if (sessions.length > 0) {
      const match = sessions.find((s) => String(s.id) === String(activeSession));
      if (!match && onSelectSession) {
        onSelectSession(sessions[0].id);
      }
    }
  }, [sessions, activeSession, onSelectSession]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="w-full bg-[#f1f3ff] border-b border-slate-200/60 pt-6 sm:pt-10 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with Session pill & Print button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              পরীক্ষার সময়সূচি
            </span>
            <span className="text-secondary text-xs">•</span>
            <span className="text-secondary text-xs font-medium">পরীক্ষা নিয়ন্ত্রণ দফতর • জামিয়া হুসাইনিয়া</span>
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.3] font-bold text-slate-900 tracking-tight leading-snug">
            পরীক্ষার রুটিন ও <span className="text-primary">সময়সূচি</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
            হিফজুল কুরআন, নূরানী-মক্তব এবং কিতাব বিভাগের ১ম সাময়িক, ২য় সাময়িক ও বার্ষিক
            শালানা ইমতিহানের অনুমোদিত কেন্দ্রীয় রুটিন। জামাত ও বিষয়ভিত্তিক পরীক্ষার তারিখ এবং হল বরাদ্দ।
          </p>
        </div>

        {/* Dynamic Session Switcher Pills from API */}
        {sessions.length > 0 && (
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {sessions.map((session) => {
              const isActive = String(activeSession) === String(session.id);
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => onSelectSession && onSelectSession(session.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50"
                  }`}
                >
                  <span>{session.name}</span>
                  {session.badge ? (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      {session.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExamRoutineHero;
