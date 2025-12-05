// src/features/about/components/IntroductionInfo.jsx
import { FaBookOpen } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const IntroductionInfo = () => {
  return (
    <article className="relative max-h-fit overflow-hidden rounded-3xl border border-emerald-100/80 bg-white/90 dark:bg-slate-900/90 dark:border-emerald-500/30 shadow-md shadow-emerald-900/10 hover:shadow-2xl transition-all duration-300">
      {/* height-auto বা min-h-fit ব্যবহার করা হয়েছে */}
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-emerald-100/80 dark:bg-emerald-900/50 blur-2xl opacity-70 pointer-events-none" />
      <div className="relative p-6 sm:p-7">
        <div className="flex items-center gap-4 mb-5">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-700/50">
            <FaBookOpen className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
              ভূমিকা
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              প্রতিষ্ঠার প্রেক্ষাপট ও উদ্দেশ্য
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 text-justify">
          {aboutData.introduction}
        </p>
      </div>
    </article>
  );
};

export default IntroductionInfo;