// src/features/about/components/FirstLooksInfo.jsx
import { aboutData } from "../../../constants/aboutData";
import { FaEye } from "react-icons/fa";

const FirstLooksInfo = () => {
  return (
    <section className="overflow-hidden rounded-3xl border border-emerald-100/80 bg-white/95 dark:bg-slate-900/95 dark:border-emerald-500/30 shadow-xl shadow-emerald-900/10 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-700/50">
            <FaEye className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50">
              এক নজরে জামিয়া হুসাইনিয়া
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              প্রতিষ্ঠানের মূল তথ্য, কাঠামো ও আর্থিক ব্যবস্থাপনা
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {aboutData.overview.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-emerald-100/80 dark:border-emerald-700/60 bg-emerald-50/70 dark:bg-emerald-900/20 p-4 sm:p-5"
          >
            <h4 className="font-semibold text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <span className="text-lg text-emerald-600 dark:text-emerald-300">
                {item.icon}
              </span>
              {item.label}
            </h4>
            <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              {Array.isArray(item.value) ? (
                <ul className="mt-1 space-y-1.5">
                  {item.value.map((fund, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{fund}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-justify">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FirstLooksInfo;
