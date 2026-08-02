import { aboutData } from "../../../constants/aboutData";
 
const FounderInfo = () => {
  return (
    <article className="h-full rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 font-display">মাদ্রাসার প্রতিষ্ঠাতা</h3>
          <p className="text-xs text-slate-500">আল্লাহভীরু, দূরদর্শী ও আমানতদার নেতৃত্ব</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm font-semibold text-emerald-700 mb-2.5">
          {aboutData.founder.name}
        </p>
        <p className="text-sm leading-relaxed text-slate-600 text-bengali">
          {aboutData.founder.description}
        </p>
      </div>
    </article>
  );
};
 
export default FounderInfo;