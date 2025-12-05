// src/features/about/components/TheWordInfo.jsx
import { FaQuoteRight } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const TheWordInfo = () => {
  return (
    <section className="rounded-3xl border border-emerald-100/80 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 dark:from-emerald-800 dark:via-emerald-900 dark:to-slate-950 text-emerald-50 shadow-2xl shadow-emerald-950/50 p-6 sm:p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-50">
          <FaQuoteRight className="text-xl" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">বাণী</h3>
        </div>
      </div>

      <div className="space-y-6 text-sm md:text-base">
        <div className="relative">
          <div className="absolute -left-1 -top-4 text-6xl text-emerald-200/30 font-serif select-none">
            “
          </div>
          <blockquote className="pl-6 text-justify leading-relaxed">
            {aboutData.quote.text}
          </blockquote>
        </div>

        <div className="relative">
          <div className="absolute -left-1 -top-4 text-6xl text-emerald-200/30 font-serif select-none">
            “
          </div>
          <blockquote className="pl-6 text-justify leading-relaxed">
            {aboutData.quote.texts}
          </blockquote>
        </div>

        <div className="pt-2 text-right">
          <p className="text-sm font-semibold">— {aboutData.quote.author}</p>
        </div>
      </div>
    </section>
  );
};

export default TheWordInfo;
