import { aboutData } from "../../../constants/aboutData";

const TheWordInfo = () => {
  return (
    <section className="rounded-2xl overflow-hidden border border-emerald-800/30 bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 dark:from-emerald-900 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-white/10 flex items-center gap-3">
        <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-white/10 text-emerald-200">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-white">বাণী</h3>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        <blockquote className="relative pl-4 border-l-2 border-emerald-400/50">
          <p className="text-sm leading-relaxed text-emerald-50/90 text-justify">
            {aboutData.quote.text}
          </p>
        </blockquote>

        <blockquote className="relative pl-4 border-l-2 border-emerald-400/50">
          <p className="text-sm leading-relaxed text-emerald-50/90 text-justify">
            {aboutData.quote.texts}
          </p>
        </blockquote>

        <div className="pt-2 border-t border-white/10 text-right">
          <p className="text-xs font-semibold text-emerald-300">
            — {aboutData.quote.author}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheWordInfo;