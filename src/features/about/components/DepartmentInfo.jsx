// src/features/about/components/DepartmentInfo.jsx
import { FaUsers } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const DepartmentInfo = () => {
  return (
    <section className="rounded-3xl border border-emerald-100/80 bg-white/90 dark:bg-slate-900/90 dark:border-emerald-500/30 shadow-xl shadow-emerald-900/10 p-6 sm:p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-700/50">
          <FaUsers className="text-xl" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50">
            তারবিয়ত বা ছাত্রগঠন বিভাগ
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            শিক্ষার্থীদের আখলাক, আমল ও সামগ্রিক চরিত্র গঠনের জন্য বিশেষ
            ব্যবস্থাপনা
          </p>
        </div>
      </div>

      <ul className="grid md:grid-cols-2 gap-5">
        {aboutData.tarbiyat.map((item, index) => (
          <li
            key={index}
            className="rounded-2xl border border-emerald-100/70 dark:border-emerald-700/60 bg-emerald-50/70 dark:bg-emerald-900/20 p-4 text-sm"
          >
            <div className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <p className="text-slate-700 dark:text-slate-200 text-justify">
                {item}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DepartmentInfo;
