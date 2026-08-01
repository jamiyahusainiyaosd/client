import { aboutData } from "../../../constants/aboutData";
 
const FounderInfo = () => {
  return (
    <article className="h-full rounded-2xl border border-slate-200/80  bg-white/70  backdrop-blur-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-slate-100  flex items-center gap-3">
        <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-emerald-50  text-emerald-600 ">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 ">মাদ্রাসার প্রতিষ্ঠাতা</h3>
          <p className="text-xs text-slate-400 ">আল্লাহভীরু, দূরদর্শী ও আমানতদার নেতৃত্ব</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm font-semibold text-emerald-700  mb-3">
          {aboutData.founder.name}
        </p>
        <p className="text-sm leading-relaxed text-slate-600  text-justify">
          {aboutData.founder.description}
        </p>
      </div>
    </article>
  );
};
 
export default FounderInfo;