import { aboutData } from "../../../constants/aboutData";
 
const FutureDevelopmentPlan = () => {
  return (
    <article className="h-full rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
        <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">ভবিষ্যৎ উন্নয়ন পরিকল্পনা</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">অবকাঠামো, সুযোগ–সুবিধা ও সার্বিক উন্নয়নের রূপরেখা</p>
        </div>
      </div>
      <ul className="p-5 space-y-3">
        {aboutData.futurePlans.development.map((plan, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify">{plan}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};
 
export default FutureDevelopmentPlan;