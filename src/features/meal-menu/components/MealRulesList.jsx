import React from "react";
import { ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";

const MealRulesList = ({ rules = [] }) => {
  if (!rules || rules.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-primary">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-main">
            ডাইনিং ও আহার সংক্রান্ত সুন্নতি নীতিমালা
          </h2>
          <p className="text-xs text-slate-500">
            খাবার গ্রহণকালে আবাসিক শিক্ষার্থীদের অবশ্য পালনীয় আদব ও নির্দেশনা
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {rules.map((rule, idx) => (
          <div
            key={rule.id || idx}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100/90 hover:bg-emerald-50/40 hover:border-emerald-200/60 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {rule.rule_text || rule}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealRulesList;
