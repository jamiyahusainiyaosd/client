// src/features/about/components/FutureEducationPlan.jsx
import { FaCalendarAlt } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const FutureEducationPlan = () => {
  return (
    <article className="h-full rounded-3xl border border-emerald-100/80 bg-white/90 dark:bg-slate-900/90 dark:border-emerald-500/30 shadow-md shadow-emerald-900/10 hover:shadow-2xl transition-all duration-300 p-6 sm:p-7">
      <div className="flex items-center gap-4 mb-5">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-700/50">
          <FaCalendarAlt className="text-lg" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            ভবিষ্যৎ শিক্ষা পরিকল্পনা
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            শিক্ষাব্যবস্থাকে আধুনিক ও ফলপ্রসূ করার উদ্যোগ
          </p>
        </div>
      </div>

      <ul className="space-y-3 text-sm">
        {aboutData.futurePlans.education.map((plan, index) => (
          <li key={index} className="flex items-start gap-2 text-justify">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-slate-700 dark:text-slate-200">{plan}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default FutureEducationPlan;
