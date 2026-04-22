import { aboutData } from "../../../constants/aboutData";
 
const IntroductionInfo = () => {
  return (
    <article className="h-full rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
        <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">ভূমিকা</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">প্রতিষ্ঠার প্রেক্ষাপট ও উদ্দেশ্য</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-justify">
          {aboutData.introduction}
        </p>
      </div>
    </article>
  );
};
 
export default IntroductionInfo;