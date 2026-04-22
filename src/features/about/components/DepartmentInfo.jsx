import { aboutData } from "../../../constants/aboutData";
 
const DepartmentInfo = () => {
  return (
    <section className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
        <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">তারবিয়ত বা ছাত্রগঠন বিভাগ</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">শিক্ষার্থীদের আখলাক, আমল ও সামগ্রিক চরিত্র গঠনের ব্যবস্থাপনা</p>
        </div>
      </div>
      <div className="p-5">
        <ul className="grid md:grid-cols-2 gap-3">
          {aboutData.tarbiyat.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/30 p-4 text-sm"
            >
              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
 
export default DepartmentInfo;