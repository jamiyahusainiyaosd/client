import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/academicUtils";

const AcademicHero = ({ totalCount = 17, displayedCount = 9 }) => {
  return (
    <section className="w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start max-w-3xl">
          {/* Breadcrumb & Eyebrow Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              একাডেমিক তথ্য ও পাঠ্যক্রম
            </span>
            <span className="text-slate-400 text-xs sm:text-sm">•</span>
            <span className="text-slate-600 text-xs sm:text-sm font-medium">শ্রেণি ও বিভাগসমূহ</span>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.3] text-slate-900 font-bold tracking-tight mb-3">
            আমাদের <span className="text-primary">একাডেমিক কার্যক্রম</span> ও শ্রেণিসমূহ
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            মাদ্রাসার সকল একাডেমিক ক্লাসের বিস্তারিত পাঠ্যক্রম, ছাত্র পরিসংখ্যান ও সর্বশেষ তথ্য। যুগোপযোগী ইসলামী জ্ঞান, সুন্নাতি ইলম ও আদর্শ নাগরিক গঠনের পরিকল্পিত বিন্যাস।
          </p>
        </div>

        {/* Quick Stat Metric Cards */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4 hover:shadow-md transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px] sm:text-[26px]">account_tree</span>
            </div>
            <div>
              <span className="block text-[11px] sm:text-xs text-slate-500">মোট বিভাগ ও জামাত</span>
              <span className="block text-sm sm:text-base lg:text-lg text-slate-900 font-bold">
                {toBengaliDigits(totalCount)}টি ক্লাস
              </span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4 hover:shadow-md transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px] sm:text-[26px]">visibility</span>
            </div>
            <div>
              <span className="block text-[11px] sm:text-xs text-slate-500">প্রদর্শিত ক্লাস</span>
              <span className="block text-sm sm:text-base lg:text-lg text-slate-900 font-bold">
                {toBengaliDigits(displayedCount)}টি জামাত
              </span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4 hover:shadow-md transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px] sm:text-[26px]">layers</span>
            </div>
            <div>
              <span className="block text-[11px] sm:text-xs text-slate-500">স্তর বিন্যাস</span>
              <span className="block text-sm sm:text-base lg:text-lg text-slate-900 font-bold">নূরানী, হিফজ ও কিতাব</span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4 hover:shadow-md transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px] sm:text-[26px]">verified</span>
            </div>
            <div>
              <span className="block text-[11px] sm:text-xs text-slate-500">শিক্ষা মাধ্যম</span>
              <span className="block text-sm sm:text-base lg:text-lg text-slate-900 font-bold">সুন্নাতি ইলম ও আমল</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AcademicHero.propTypes = {
  totalCount: PropTypes.number,
  displayedCount: PropTypes.number,
};

export default AcademicHero;
