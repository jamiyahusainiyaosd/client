import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/bengaliUtils";

const FormerStudentHero = ({ totalCount = 6, batchSpan = "২০১০ — ২০২৪" }) => {
  return (
    <section className="relative w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 border-b border-slate-200/60 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Breadcrumb & Eyebrow */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm font-semibold tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            জামিয়া হুসাইনিয়া পরিবার
          </span>
          <span className="text-secondary text-body-sm">•</span>
          <span className="text-secondary text-body-sm font-medium">সাবেক শিক্ষার্থীদের তালিকা</span>
        </div>

        {/* Heading & Subtitle */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.3] text-on-surface font-bold tracking-tight mb-3">
            আমাদের <span className="text-primary">সাবেক ছাত্রগণ</span>
          </h1>
          <p className="font-body-lg text-sm sm:text-base lg:text-lg text-secondary leading-relaxed">
            যারা আমাদের প্রতিষ্ঠানের গৌরব এবং বিভিন্ন ক্ষেত্রে নিজেদের দক্ষতা, যোগ্যতা ও সুন্নতি আমলের দ্যুতি ছড়িয়ে চলেছেন। ইলমে নববীর আলোয় সমাজে বহুমুখী দ্বীনী খেদমত ও সততার সাথে অবদান রাখছেন।
          </p>
        </div>

        {/* Dynamic Quick Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Stat 1: Total Former Students */}
          <div className="bg-white p-3 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-2.5 sm:gap-4 hover:shadow-sm transition-shadow min-w-0">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[20px] sm:text-[26px]">groups</span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="block font-headline-sm text-xs sm:text-base lg:text-lg text-on-surface font-bold whitespace-nowrap">
                {toBengaliDigits(totalCount)} জন
              </span>
              <span className="block font-label-sm text-[10px] sm:text-xs text-secondary whitespace-nowrap">মোট সাবেক ছাত্র</span>
            </div>
          </div>

          {/* Stat 2: Professions */}
          <div className="bg-white p-3 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-2.5 sm:gap-4 hover:shadow-sm transition-shadow min-w-0">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[20px] sm:text-[26px]">work</span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="block font-headline-sm text-xs sm:text-base lg:text-lg text-on-surface font-bold whitespace-nowrap">
                শিক্ষা ও ব্যবসা
              </span>
              <span className="block font-label-sm text-[10px] sm:text-xs text-secondary whitespace-nowrap">
                খেদমত ও কর্মক্ষেত্র
              </span>
            </div>
          </div>

          {/* Stat 3: Batch Span */}
          <div className="bg-white p-3 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-2.5 sm:gap-4 hover:shadow-sm transition-shadow min-w-0">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[20px] sm:text-[26px]">history_edu</span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="block font-headline-sm text-xs sm:text-base lg:text-lg text-on-surface font-bold whitespace-nowrap">
                {batchSpan}
              </span>
              <span className="block font-label-sm text-[10px] sm:text-xs text-secondary whitespace-nowrap">
                ব্যাচ বিস্তার
              </span>
            </div>
          </div>

          {/* Stat 4: Region */}
          <div className="bg-white p-3 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-2.5 sm:gap-4 hover:shadow-sm transition-shadow min-w-0">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[20px] sm:text-[26px]">location_on</span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="block font-headline-sm text-xs sm:text-base lg:text-lg text-on-surface font-bold whitespace-nowrap">
                হবিগঞ্জ ও সিলেট
              </span>
              <span className="block font-label-sm text-[10px] sm:text-xs text-secondary whitespace-nowrap">
                প্রধান অঞ্চল
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FormerStudentHero.propTypes = {
  totalCount: PropTypes.number,
  batchSpan: PropTypes.string,
};

export default FormerStudentHero;
