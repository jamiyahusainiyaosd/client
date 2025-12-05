// src/features/about/components/FounderInfo.jsx
import { FaUserTie } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const FounderInfo = () => {
  return (
    <article className="relative h-full overflow-hidden rounded-3xl border border-emerald-100/80 bg-white/90 dark:bg-slate-900/90 dark:border-emerald-500/30 shadow-md shadow-emerald-900/10 hover:shadow-2xl transition-all duration-300">
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-100/70 dark:bg-emerald-900/40 blur-2xl opacity-70 pointer-events-none" />
      <div className="relative p-6 sm:p-7">
        <div className="flex items-center gap-4 mb-5">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-700/50">
            <FaUserTie className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
              মাদ্রাসার প্রতিষ্ঠাতা
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              আল্লাহভীরু, দূরদর্শী ও আমানতদার নেতৃত্ব
            </p>
          </div>
        </div>

        <h4 className="text-base md:text-lg font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
          {aboutData.founder.name}
        </h4>

        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 text-justify">
          {aboutData.founder.description}
        </p>
      </div>
    </article>
  );
};

export default FounderInfo;
