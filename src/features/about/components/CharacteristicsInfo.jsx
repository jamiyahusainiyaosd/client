// src/features/about/components/CharacteristicsInfo.jsx
import { FaStar } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const CharacteristicsInfo = () => {
  return (
    <article className="h-full rounded-3xl border border-emerald-100/80 bg-white/90 dark:bg-slate-900/90 dark:border-emerald-500/30 shadow-md shadow-emerald-900/10 hover:shadow-2xl transition-all duration-300 p-6 sm:p-7">
      <div className="flex items-center gap-4 mb-5">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-700/50">
          <FaStar className="text-lg" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            বৈশিষ্ট্যসমূহ
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            অন্যান্য প্রতিষ্ঠানের তুলনায় স্বাতন্ত্র্যসূচক দিক
          </p>
        </div>
      </div>

      <ul className="space-y-3 text-sm">
        {aboutData.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-justify">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-slate-700 dark:text-slate-200">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default CharacteristicsInfo;
