import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  toBengaliDigits,
  formatBengaliDate,
  formatBengaliTime,
  getCategoryForClass,
  getCurriculumDetails,
} from "../utils/academicUtils";
import academicsServices from "../services/academics.services";

const AcademicDetail = ({
  id,
  className,
  classTitle,
  classSetCount,
  classStudentCount,
  classDescription,
  createdAt,
  courseCode,
  level,
  admissionStatus = "ভর্তি চলমান",
  routineBadge,
  teacherNote,
  customFeatures = [],
  customRoutines = [],
}) => {
  const [toastMessage] = useState("");

  const studentCount = Number(classStudentCount) || 0;
  const seatCount = Number(classSetCount) || 0;
  const remainingSeats = Math.max(0, seatCount - studentCount);
  const seatPercentage = seatCount > 0 ? Math.min(100, Math.round((studentCount / seatCount) * 100)) : 0;

  const derivedLevel = level || getCategoryForClass(className || "");
  const code = courseCode || `ACAD-${String(id || "01").slice(-4).toUpperCase()}`;

  const curriculum = useMemo(() => {
    const base = getCurriculumDetails(className, derivedLevel);
    const finalFeatures =
      customFeatures && customFeatures.length > 0
        ? customFeatures.map((f, i) => ({
            ...f,
            icon: base.features[i]?.icon || "verified",
          }))
        : base.features;
    const finalRoutine =
      customRoutines && customRoutines.length > 0
        ? customRoutines
        : base.routine;

    return {
      ...base,
      features: finalFeatures,
      routine: finalRoutine,
      routineBadge: routineBadge || base.routineBadge,
      teacherNote: teacherNote || base.teacherNote,
    };
  }, [className, derivedLevel, customFeatures, customRoutines, routineBadge, teacherNote]);


  // Dynamic fetch of related classes from backend API (all items)
  const { data: allData } = useQuery({
    queryKey: ["academicsAll"],
    queryFn: () => academicsServices.getAllAcademic(1, 100),
    staleTime: 1000 * 60 * 5,
  });

  // Related classes excluding current
  const relatedClasses = useMemo(() => {
    const rawList =
      allData?.data?.data ||
      allData?.data?.results ||
      allData?.data ||
      allData?.results ||
      (Array.isArray(allData) ? allData : []);

    if (!Array.isArray(rawList)) return [];
    return rawList
      .filter((c) => String(c.id) !== String(id))
      .slice(0, 3);
  }, [allData, id]);

  return (
    <div className="w-full flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-lg animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* SECTION 1: BREADCRUMB & HERO BANNER (Background: #f1f3ff) */}
      <section className="w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm flex-wrap mb-4"
          >
            <Link
              className="hover:text-primary transition-colors flex items-center gap-1"
              to="/"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>হোম</span>
            </Link>
            <span className="text-slate-400">/</span>
            <Link
              className="hover:text-primary transition-colors"
              to="/academic"
            >
              একাডেমিক
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {className}
            </span>
          </nav>

          {/* Department Hero Title Banner */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xs border border-slate-200/80 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    {derivedLevel}
                  </span>
                  <span className="inline-flex items-center bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-lg text-xs font-bold">
                    {admissionStatus}
                  </span>
                  <span className="inline-flex items-center bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg text-xs font-semibold">
                    {code}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1">
                  {className}
                </h1>

                <p className="text-xs sm:text-sm lg:text-base text-slate-600 max-w-3xl leading-relaxed">
                  {classTitle} — জামিয়া হুসাইনিয়া মাদ্রাসা, শায়েস্তাগঞ্জ, হবিগঞ্জ
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <Link
                  className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#f1f3ff] hover:bg-primary hover:text-white text-primary text-xs sm:text-sm font-semibold border border-slate-200/80 transition-colors shadow-xs active:scale-98"
                  to="/academic"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>সকল বিভাগ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MAIN CONTENT & DETAILS (Background: White) */}
      <section className="w-full bg-white py-10 sm:py-14 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left 8 Columns: Department Overview, Objectives, Syllabus */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Overview & Description Card */}
              <div className="bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 border border-slate-200/70 shadow-xs">
                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      বিভাগের মূল বিবরণ ও পাঠ্য উদ্দেশ্য
                    </h2>
                    <p className="text-xs text-slate-500">
                      {derivedLevel} বিভাগীয় বিশেষ কারিকুলাম
                    </p>
                  </div>
                </div>

                {/* Dynamic Quote Box */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/70 shadow-xs">
                  <div className="flex items-start gap-2 text-slate-700 text-xs sm:text-sm leading-relaxed">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      format_quote
                    </span>
                    <p className="font-medium">
                      {classDescription ||
                        "এই জামাতে দ্বীনি শিক্ষার ঐতিহ্যবাহী কারিকুলাম অনুযায়ী শিক্ষার্থীদের সঠিক ইলম ও আমলের বুনিয়াদ গড়ে তোলা হয়।"}
                    </p>
                  </div>
                </div>

                {/* Dynamic Curricular Features */}
                <div className="flex flex-col gap-3 pt-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    প্রধান বৈশিষ্ট্য ও বিষয়সূচি:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {curriculum.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-3.5 sm:p-4 flex items-start gap-3 border border-slate-200/70 shadow-xs"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <span className="material-symbols-outlined text-[16px]">
                            {feat.icon}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                            {feat.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Daily Routine / Syllabus Structure Card */}
              <div className="bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 border border-slate-200/70 shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">schedule</span>
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900">
                        দৈনিক সময়সূচি ও পাঠ পরিক্রমা
                      </h2>
                      <p className="text-xs text-slate-500">
                        {className}র সুশৃঙ্খল রুটিন
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white text-primary text-[11px] font-bold border border-slate-200/80 shadow-xs">
                    {routineBadge || curriculum.routineBadge}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {curriculum.routine.map((rout, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5 bg-white rounded-xl border border-slate-200/70 shadow-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#f1f3ff] text-primary text-xs font-bold shrink-0">
                          {rout.label}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
                          {rout.title}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium sm:text-right shrink-0">
                        {rout.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teachers / Supervision Card */}
              <div className="bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col gap-4">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  বিভাগীয় জিম্মাদার ও শিক্ষকবৃন্দ
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200/70 shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 border border-slate-200/70 shadow-xs">
                    <span className="material-symbols-outlined text-[28px]">school</span>
                  </div>
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      মুহতামিম ও যোগ্য শিক্ষকমণ্ডলীর তত্ত্বাবধানে পরিচালিত
                    </span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {teacherNote || curriculum.teacherNote}
                    </p>
                    <div className="mt-2.5">
                      <Link
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                        to="/teachers"
                      >
                        <span>শিক্ষক তালিকা দেখুন</span>
                        <span className="material-symbols-outlined text-[14px]">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Dynamic Statistics & Actions Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              {/* Stat 1: নির্ধারিত আসন সংখ্যা */}
              <div className="bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    নির্ধারিত আসন সংখ্যা
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/70 text-primary flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">
                      event_seat
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 shadow-xs">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {seatCount > 0 ? toBengaliDigits(seatCount) : "উন্মুক্ত"}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">টি আসন</span>
                  </div>

                  {seatCount > 0 && (
                    <>
                      {/* Seat Progress Bar */}
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-3">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-500"
                          style={{ width: `${seatPercentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
                        <span>{toBengaliDigits(studentCount)} জন ভর্তি</span>
                        <span className="text-primary font-bold">
                          {toBengaliDigits(remainingSeats)}টি আসন খালি
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Stat 2: অধ্যয়নরত ছাত্র সংখ্যা */}
              <div className="bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    অধ্যয়নরত ছাত্র সংখ্যা
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/70 text-primary flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">groups</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 shadow-xs">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-bold text-primary">
                      {toBengaliDigits(studentCount)}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">জন শিক্ষার্থী</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {derivedLevel} বিভাগ (চলতি শিক্ষাবর্ষ)
                  </p>
                </div>
              </div>

              {/* Stat 3: তৈরির তারিখ ও সময় */}
              {createdAt && (
                <div className="bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      তথ্য হালনাগাদ
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/70 text-slate-500 flex items-center justify-center shadow-xs">
                      <span className="material-symbols-outlined text-[18px]">history</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 shadow-xs">
                    <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                      {formatBengaliDate(createdAt)}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      <span>{formatBengaliTime(createdAt)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Admission CTA Box */}
              <div className="bg-emerald-50 rounded-2xl border border-emerald-200/80 p-5 shadow-xs flex flex-col gap-3">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  ভর্তি সংক্রান্ত
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {className} জামাতে ভর্তি হতে সরাসরি যোগাযোগ করুন অথবা অনলাইন ভর্তি ফরম পূরণ করুন।
                </p>
                <Link
                  to="/admission"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors active:scale-98"
                >
                  <span>ভর্তি আবেদন</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Academic Classes Section */}
          {relatedClasses.length > 0 && (
            <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-slate-200/70">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    অন্যান্য একাডেমিক ক্লাসসমূহ
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    জামিয়া হুসাইনিয়া মাদ্রাসার অন্যান্য চলমান জামাত ও কোর্সসমূহ
                  </p>
                </div>
                <Link
                  className="hidden sm:inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-primary hover:underline"
                  to="/academic"
                >
                  <span>সকল বিভাগ দেখুন</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {relatedClasses.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-[#f1f3ff] rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-lg bg-white text-emerald-800 border border-emerald-200/80 text-xs font-semibold shadow-xs">
                          {item.level || getCategoryForClass(item.class_name)}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {toBengaliDigits(item.student_count || 0)} জন ছাত্র
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                        {item.class_name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {item.class_title}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/70">
                      <Link
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-primary hover:text-white text-primary text-xs font-semibold border border-slate-200/80 shadow-xs transition-colors active:scale-98"
                        to={`/academic/${item.id}`}
                      >
                        <span>বিস্তারিত দেখুন</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

AcademicDetail.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  classTitle: PropTypes.string,
  classSetCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classStudentCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classDescription: PropTypes.string,
  createdAt: PropTypes.string,
  courseCode: PropTypes.string,
  level: PropTypes.string,
};

export default AcademicDetail;