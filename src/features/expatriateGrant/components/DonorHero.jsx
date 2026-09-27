import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/donorUtils";

const DonorHero = ({ totalCount = 1 }) => {
  return (
    <section className="w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5 sm:mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>সম্মানিত দ্বীনি পৃষ্ঠপোষক ও প্রবাসী দাতাবৃন্দ</span>
          </span>
          <span className="text-secondary text-xs">•</span>
          <span className="text-secondary text-xs font-medium">সদকায়ে জারিয়া</span>
        </div>

        {/* Header Title */}
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            আমাদের সম্মানিত{" "}
            <span className="text-primary">প্রবাসী অনুদান দাতাগণ</span>
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            সুদূর প্রবাসে থেকেও দ্বীনি ইলমের প্রচার-প্রসার ও জামিয়ার সার্বিক
            উন্নয়নে যাঁদের অকৃত্রিম ত্যাগ, আন্তরিক দোয়া ও নিয়মিত অনুদান সদকায়ে
            জারিয়া হিসেবে অনন্তকাল সওয়াবের উৎস হয়ে থাকবে।
          </p>
        </div>

        {/* Quick Summary Stat Badges (Clean White Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mt-6 sm:mt-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                groups
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">
                নিবন্ধিত প্রবাসী দাতা
              </p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                {toBengaliDigits(totalCount)} জন দাতা
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                public
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">
                প্রবাস ও সেবা অঞ্চল
              </p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                সৌদি, ইউএই ও বৈশ্বিক
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                volunteer_activism
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">
                অনন্ত কল্যাণ ও বরকত
              </p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                সদকায়ে জারিয়া
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

DonorHero.propTypes = {
  totalCount: PropTypes.number,
};

export default DonorHero;
