import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/resultsUtils";
import AcademicYear from "../../../components/AcademicYear";

const ResultsHero = ({ totalResults = 16, academicYear }) => {
  return (
    <section className="w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5 sm:mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>সালানা ও সাময়িক পরীক্ষা</span>
          </span>
          <span className="text-secondary text-xs">•</span>
          <span className="text-secondary text-xs font-medium">অফিসিয়াল ফলাফল</span>
        </div>

        {/* Header Title with link to Top Achievers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              মাদ্রাসার <span className="text-primary">প্রকাশিত ফলাফল</span>
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              বিভিন্ন জামাতের সর্বশেষ বার্ষিক ও সাময়িক পরীক্ষার ফলাফল, অফিসিয়াল
              মার্কশীট ও কেন্দ্রীয় মেধা তালিকা। ঘরে বসেই আপনার কাঙ্ক্ষিত জামাতের
              অনুমোদিত ফলাফল দেখুন ও সংগ্রহ করুন।
            </p>
          </div>

          <Link
            to="/top-achievers"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover font-semibold text-xs sm:text-sm transition-all shadow-xs shrink-0 self-start md:self-end"
          >
            <span>🏆 এ বছরের সেরা</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* Quick Summary Stat Badges (Clean White Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mt-6 sm:mt-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                verified
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">প্রকাশিত জামাত</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                {toBengaliDigits(totalResults)} টি শ্রেণি
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                workspace_premium
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">শিক্ষাবোর্ড সনদ</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                ১০০% ভেরিফাইড
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
              <p className="text-xs text-slate-600 font-medium">চলতি শিক্ষাবর্ষ</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                {academicYear || <AcademicYear />}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ResultsHero.propTypes = {
  totalResults: PropTypes.number,
};

export default ResultsHero;
