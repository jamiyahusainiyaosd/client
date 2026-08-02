import { aboutData } from "../../../constants/aboutData";
 
const DepartmentInfo = () => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900 font-display">তারবিয়ত বা ছাত্রগঠন বিভাগ</h3>
          <p className="text-xs text-slate-500">শিক্ষার্থীদের আখলাক, আমল ও সামগ্রিক চরিত্র গঠনের ব্যবস্থাপনা</p>
        </div>
      </div>
      <div className="p-5">
        <ul className="grid md:grid-cols-2 gap-3">
          {aboutData.tarbiyat.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-lg border border-slate-200/70 bg-slate-50/50 p-4 text-sm"
            >
              <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
              <p className="text-slate-600 leading-relaxed text-bengali">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
 
export default DepartmentInfo;