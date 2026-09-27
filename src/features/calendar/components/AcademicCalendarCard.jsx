import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Moon,
} from "lucide-react";
import {
  HIJRI_MONTHS,
  WEEK_DAYS,
  getHijriDate,
  generateHijriMonthDays,
  getPrevHijriMonth,
  getNextHijriMonth,
  toBengaliNumber,
  toArabicNumber,
} from "../utils/hijriCalendarUtils";

const AcademicCalendarCard = () => {
  // Current real-time today Hijri
  const [todayHijri, setTodayHijri] = useState(() => getHijriDate(new Date(), 0));

  // Moon sighting adjustment: -1, 0, +1 day
  const [adjustment, setAdjustment] = useState(() => {
    const saved = localStorage.getItem("jamia_hijri_adjustment");
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  // Current viewed month and year
  const [viewState, setViewState] = useState(() => {
    const today = getHijriDate(new Date(), 0);
    return { hYear: today.hYear, hMonth: today.hMonth };
  });

  // Selected day for detail view
  const [selectedDay, setSelectedDay] = useState(null);

  // Update today state on mount / timer
  useEffect(() => {
    const updateToday = () => {
      const nowH = getHijriDate(new Date(), adjustment);
      setTodayHijri(nowH);
    };
    updateToday();
    const interval = setInterval(updateToday, 60000);
    return () => clearInterval(interval);
  }, [adjustment]);

  const handleAdjustmentChange = (newAdj) => {
    setAdjustment(newAdj);
    localStorage.setItem("jamia_hijri_adjustment", newAdj.toString());
  };

  const handlePrevMonth = () => {
    setViewState((prev) => getPrevHijriMonth(prev.hYear, prev.hMonth));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setViewState((prev) => getNextHijriMonth(prev.hYear, prev.hMonth));
    setSelectedDay(null);
  };

  const handleJumpToToday = () => {
    const today = getHijriDate(new Date(), adjustment);
    setViewState({ hYear: today.hYear, hMonth: today.hMonth });
    setSelectedDay(null);
  };

  const handleSelectMonth = (e) => {
    const monthId = parseInt(e.target.value, 10);
    setViewState((prev) => ({ ...prev, hMonth: monthId }));
    setSelectedDay(null);
  };

  const monthData = useMemo(() => {
    return generateHijriMonthDays(viewState.hYear, viewState.hMonth, adjustment);
  }, [viewState.hYear, viewState.hMonth, adjustment]);

  const currentMonthObj = useMemo(() => {
    return (
      HIJRI_MONTHS.find((m) => m.id === viewState.hMonth) || HIJRI_MONTHS[0]
    );
  }, [viewState.hMonth]);

  const isCurrentViewingMonthToday =
    viewState.hYear === todayHijri.hYear &&
    viewState.hMonth === todayHijri.hMonth;

  const activeDay = useMemo(() => {
    if (selectedDay) return selectedDay;
    if (isCurrentViewingMonthToday) {
      return monthData.days.find((d) => d.isToday) || monthData.days[0];
    }
    return monthData.days[0];
  }, [selectedDay, isCurrentViewingMonthToday, monthData.days]);

  return (
    <div
      className="site-card"
      data-purpose="academic-hijri-calendar"
    >
      {/* Header — 100% matched with PrayerTimesCard */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 border border-primary-border/60">
            <span className="material-symbols-outlined text-[20px]">
              calendar_month
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-main leading-snug">
              একাডেমিক ক্যালেন্ডার (হিজরি সন)
            </h3>
            <p className="text-[11px] text-muted font-medium line-clamp-1">
              কওমি মাদরাসা শিক্ষা বর্ষপঞ্জি • التقويم الأكاديمي
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 bg-primary-light text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-primary-border/60">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>{todayHijri.hYearBn} হিজরি ({todayHijri.hYearAr} هـ)</span>
        </span>
      </div>

      {/* Month Control & Title Box */}
      <div className="bg-[#f1f3ff] border border-slate-200/70 rounded-xl p-3 mb-3">
        <div className="flex items-center justify-between gap-1.5">
          {/* Prev Button */}
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            title="পূর্ববর্তী মাস (الشهر السابق)"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>

          {/* Month & Year Title */}
          <div className="text-center min-w-0 px-2">
            <h4 className="font-bold text-sm sm:text-base text-main tracking-wide truncate">
              {currentMonthObj.name} {toBengaliNumber(viewState.hYear)}
            </h4>
            <p className="text-xs text-primary font-arabic font-semibold truncate mt-0.5">
              {currentMonthObj.arabic} {toArabicNumber(viewState.hYear)} هـ
            </p>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            title="পরবর্তী মাস (الشهر القادم)"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Quick Month Switcher & Today Button */}
        <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2 text-xs">
          <select
            value={viewState.hMonth}
            onChange={handleSelectMonth}
            className="bg-white hover:bg-slate-50 text-slate-800 text-[11px] rounded-lg px-2.5 py-1 border border-slate-200 shadow-xs outline-none cursor-pointer font-medium"
            title="আরবি ১২ মাসের তালিকা"
          >
            {HIJRI_MONTHS.map((m) => (
              <option key={m.id} value={m.id} className="text-slate-900 bg-white">
                {toBengaliNumber(m.id)}. {m.name} ({m.arabic})
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5">
            {!isCurrentViewingMonthToday && (
              <button
                type="button"
                onClick={handleJumpToToday}
                className="px-2.5 py-1 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-[10px] flex items-center gap-1 transition shadow-xs cursor-pointer"
                title="আজকের তারিখে ফিরে যান"
              >
                <RotateCcw className="w-3 h-3" />
                <span>আজ</span>
              </button>
            )}

            {/* Moon Adjustment */}
            <div className="flex items-center rounded-lg bg-white border border-slate-200 p-0.5 text-[10px] font-mono shadow-xs">
              <button
                type="button"
                onClick={() => handleAdjustmentChange(adjustment === -1 ? 0 : -1)}
                className={`px-1.5 py-0.5 rounded cursor-pointer transition ${
                  adjustment === -1 ? "bg-primary text-white font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
                title="চাঁদ ১ দিন পূর্বে দেখা গেলে"
              >
                -১
              </button>
              <button
                type="button"
                onClick={() => handleAdjustmentChange(0)}
                className={`px-1.5 py-0.5 rounded cursor-pointer transition ${
                  adjustment === 0 ? "bg-primary text-white font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
                title="সাধারণ গণনানুযায়ী"
              >
                ০
              </button>
              <button
                type="button"
                onClick={() => handleAdjustmentChange(adjustment === 1 ? 0 : 1)}
                className={`px-1.5 py-0.5 rounded cursor-pointer transition ${
                  adjustment === 1 ? "bg-primary text-white font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
                title="চাঁদ ১ দিন পরে দেখা গেলে"
              >
                +১
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Weekday Columns (Arabic Names in Bengali & Arabic script) */}
      <div className="grid grid-cols-7 text-center py-1.5 border-b border-slate-100 text-xs">
        {WEEK_DAYS.map((wd) => (
          <div
            key={wd.key}
            className={`flex flex-col items-center justify-center py-0.5 ${
              wd.isJummah
                ? "text-primary font-extrabold bg-primary-light rounded-lg"
                : "text-slate-600"
            }`}
            title={`${wd.full} (${wd.arabic})`}
          >
            <span className="text-[11px] sm:text-xs font-bold leading-tight">
              {wd.name}
            </span>
            <span className="text-[9px] font-arabic opacity-70 leading-tight">
              {wd.arabic}
            </span>
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="mt-2">
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
          {/* Blank padding cells before 1st day */}
          {Array.from({ length: monthData.startColIndex }).map((_, idx) => (
            <div
              key={`blank-${idx}`}
              className="h-11 sm:h-12 rounded-xl bg-transparent"
            />
          ))}

          {/* Actual Month Days */}
          {monthData.days.map((day) => {
            const isSelected = selectedDay && selectedDay.hDay === day.hDay;

            return (
              <button
                key={`day-${day.hDay}`}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`h-11 sm:h-12 rounded-xl flex flex-col items-center justify-between p-1 transition-all duration-150 relative cursor-pointer group ${
                  day.isToday
                    ? "bg-primary text-white shadow-sm ring-2 ring-primary/50"
                    : isSelected
                    ? "bg-primary-light text-main border-2 border-primary shadow-xs"
                    : day.isJummah
                    ? "bg-primary-light/70 hover:bg-primary-light text-primary border border-primary-border/60"
                    : "bg-[#f1f3ff] hover:bg-slate-200/70 hover:border-primary/40 text-slate-800 border border-slate-200/60"
                }`}
                title={`${day.hDayBn} ${currentMonthObj.name} (${day.dayName})`}
              >
                {/* Top: Event dot or Moon */}
                <div className="w-full flex items-center justify-between px-0.5 leading-none">
                  {day.event ? (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"
                      title={day.event}
                    />
                  ) : day.isAyyamAlBid ? (
                    <Moon
                      className={`w-2.5 h-2.5 shrink-0 ${
                        day.isToday ? "text-emerald-200" : "text-primary"
                      }`}
                    />
                  ) : (
                    <span className="w-1.5 h-1.5" />
                  )}

                  {day.isToday && (
                    <span className="text-[8px] font-bold uppercase tracking-tighter text-emerald-200">
                      আজ
                    </span>
                  )}
                </div>

                {/* Center: Arabic numeral (Primary Large) then Bengali numeral (smaller below) */}
                <div className="flex flex-col items-center justify-center leading-none my-auto">
                  <span
                    className={`font-arabic text-base sm:text-lg font-bold leading-tight ${
                      day.isToday ? "text-white" : "text-main"
                    }`}
                  >
                    {day.hDayAr}
                  </span>
                  <span
                    className={`text-[10px] font-mono leading-none mt-0.5 ${
                      day.isToday ? "text-emerald-200" : "text-muted"
                    }`}
                  >
                    {day.hDayBn}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Day Detail Card — Matching Sehri/Iftar banner style */}
      {activeDay && (
        <div className="mt-3 p-3 rounded-xl bg-[#f1f3ff] border border-slate-200/70 flex items-center justify-between text-xs">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-primary text-white text-[10px] font-bold">
                {activeDay.isToday ? "আজকের দিন (اليوم)" : "নির্বাচিত দিন"}
              </span>
              {activeDay.isJummah && (
                <span className="px-1.5 py-0.5 rounded-md bg-primary-light text-primary text-[10px] font-bold border border-primary-border/60">
                  সাইয়্যিদুল আইয়াম ({activeDay.dayArabic})
                </span>
              )}
              {activeDay.isAyyamAlBid && (
                <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-semibold border border-amber-200/60">
                  আইয়ামে বীজ রোজা
                </span>
              )}
            </div>

            {/* Day in Arabic & Date */}
            <div className="mt-1 text-xs sm:text-sm font-bold text-main">
              {activeDay.dayName} ({activeDay.dayArabic}), {activeDay.hDayAr} ({activeDay.hDayBn}) {currentMonthObj.name} ({currentMonthObj.arabic}) {toBengaliNumber(activeDay.hYear)} হিজরি
            </div>

            {activeDay.event && (
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-950 font-bold text-[10px] border border-amber-200/80">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>{activeDay.event}</span>
              </div>
            )}
          </div>

          <div className="text-right shrink-0 ml-2">
            <span className="text-[10px] text-muted block">
              মাসের দিন
            </span>
            <span className="text-xs font-bold text-primary font-mono">
              {monthData.totalDaysBn} দিন ({monthData.totalDaysAr} يوم)
            </span>
          </div>
        </div>
      )}

      {/* Special Note / Footer note matching PrayerTimesCard */}
      <div className="mt-3 flex items-start gap-1.5 text-[11px] text-muted leading-tight">
        <span className="material-symbols-outlined text-[14px] text-primary shrink-0 mt-0.5">
          info
        </span>
        <span>কওমি মাদরাসা শিক্ষা বর্ষপঞ্জি অনুযায়ী হিজরি তারিখ প্রদর্শিত হচ্ছে।</span>
      </div>
    </div>
  );
};

export default AcademicCalendarCard;
