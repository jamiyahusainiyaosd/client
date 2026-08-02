import { aboutData } from "../../../constants/aboutData";

const TheWordInfo = () => {
  return (
    <section className="rounded-lg overflow-hidden border border-slate-800 bg-slate-900 shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 text-emerald-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-white font-display">বাণী</h3>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <blockquote className="relative pl-4 border-l-2 border-emerald-500">
          <p className="text-sm leading-relaxed text-slate-200 text-bengali">
            {aboutData.quote.text}
          </p>
        </blockquote>

        <blockquote className="relative pl-4 border-l-2 border-emerald-500">
          <p className="text-sm leading-relaxed text-slate-200 text-bengali">
            {aboutData.quote.texts}
          </p>
        </blockquote>

        <div className="pt-2 border-t border-slate-800 text-right">
          <p className="text-xs font-medium text-emerald-400 font-mono">
            — {aboutData.quote.author}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheWordInfo;