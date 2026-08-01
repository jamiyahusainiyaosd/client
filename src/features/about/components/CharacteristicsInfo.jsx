import { aboutData } from "../../../constants/aboutData";
 
const CharacteristicsInfo = () => {
  return (
    <article className="h-full rounded-2xl border border-slate-200/80  bg-white/70  backdrop-blur-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-slate-100  flex items-center gap-3">
        <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-emerald-50  text-emerald-600 ">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 ">বৈশিষ্ট্যসমূহ</h3>
          <p className="text-xs text-slate-400 ">অন্যান্য প্রতিষ্ঠানের তুলনায় স্বাতন্ত্র্যসূচক দিক</p>
        </div>
      </div>
      <ul className="p-5 space-y-3">
        {aboutData.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="text-slate-600  leading-relaxed text-justify">{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};
 
export default CharacteristicsInfo;