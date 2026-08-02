import { aboutData } from "../../../constants/aboutData";
 
const FutureEducationPlan = () => {
  return (
    <article className="h-full rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 font-display">ভবিষ্যৎ শিক্ষা পরিকল্পনা</h3>
          <p className="text-xs text-slate-500">শিক্ষাব্যবস্থাকে আধুনিক ও ফলপ্রসূ করার উদ্যোগ</p>
        </div>
      </div>
      <ul className="p-5 space-y-3">
        {aboutData.futurePlans.education.map((plan, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
            <span className="text-slate-600 leading-relaxed text-bengali">{plan}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};
 
export default FutureEducationPlan;