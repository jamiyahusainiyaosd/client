import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/noticeUtils";
import AcademicYear from "../../../components/AcademicYear";

const NoticeHero = ({ totalCount = 21 }) => {
  return (
    <section className="w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5 sm:mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>অফিসিয়াল বিজ্ঞপ্তি বোর্ড</span>
          </span>
          <span className="text-secondary text-xs">•</span>
          <span className="text-secondary text-xs font-medium">প্রশাসনিক ও তালিমি এলান</span>
        </div>

        {/* Header Title */}
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            জামিয়ার <span className="text-primary">নোটিশ সমূহ</span>
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            জামিয়া হুসাইনিয়া মাদ্রাসার সকল প্রকার অফিসিয়াল নোটিশ, প্রশাসনিক
            বিজ্ঞপ্তি, শিক্ষা কার্যক্রম, পরীক্ষার সময়সূচি ও ছুটির এলান। নিয়মিত
            হালনাগাদ পেতে এই পেজে চোখ রাখুন।
          </p>
        </div>

        {/* Quick Summary Stat Badges (Clean White Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mt-6 sm:mt-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                campaign
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">প্রকাশিত সর্বমোট</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                {toBengaliDigits(totalCount)} টি নোটিশ
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                verified
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">সত্যায়িত অনুলিপি</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                জামিয়া কেন্দ্রীয় রেকর্ড
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                calendar_month
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">বর্তমান শিক্ষাবর্ষ</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                <AcademicYear />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

NoticeHero.propTypes = {
  totalCount: PropTypes.number,
};

export default NoticeHero;
