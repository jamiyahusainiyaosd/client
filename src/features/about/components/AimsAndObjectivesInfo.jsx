import { aboutData } from "../../../constants/aboutData";
 
const AimsAndObjectivesInfo = () => {
  return (
    <article className="h-full rounded-2xl border border-slate-200/80  bg-white/70  backdrop-blur-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-slate-100  flex items-center gap-3">
        <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-emerald-50  text-emerald-600 ">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 ">লক্ষ্য ও উদ্দেশ্য</h3>
          <p className="text-xs text-slate-400 ">দ্বীনি শিক্ষা ও চরিত্র গঠনের মূল টার্গেট</p>
        </div>
      </div>
      <ul className="p-5 space-y-3">
        {aboutData.goals.map((goal, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="text-slate-600  leading-relaxed text-justify">{goal}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};
 
export default AimsAndObjectivesInfo;