import { aboutData } from "../../../constants/aboutData";
 
const FirstLooksInfo = () => {
  return (
    <section className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
        <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">এক নজরে জামিয়া হুসাইনিয়া</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">প্রতিষ্ঠানের মূল তথ্য, কাঠামো ও আর্থিক ব্যবস্থাপনা</p>
        </div>
      </div>
      <div className="p-5">
        <div className="grid md:grid-cols-2 gap-4">
          {aboutData.overview.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/30 p-4"
            >
              <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                <span className="text-base">{item.icon}</span>
                {item.label}
              </h4>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {Array.isArray(item.value) ? (
                  <ul className="space-y-1.5">
                    {item.value.map((fund, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="leading-relaxed">{fund}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="leading-relaxed text-justify">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default FirstLooksInfo;
