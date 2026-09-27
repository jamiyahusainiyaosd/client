import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import admissionService from "../services/admission.services";
import { ADMISSION_RULES } from "./admissionData";
import { toBengaliDigits } from "../../notice/utils/noticeUtils";

const AdmissionRules = ({ dynamicRequiredDocs }) => {
  // Fetch dynamic admission rules from API
  const { data: apiRules } = useQuery({
    queryKey: ["admissionRulesList"],
    queryFn: async () => {
      try {
        const res = await admissionService.getRules();
        return res;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  // Dynamic rules with fallback to ADMISSION_RULES
  const rules = useMemo(() => {
    let list = [];
    if (Array.isArray(apiRules) && apiRules.length > 0) {
      list = apiRules.map((r, idx) => ({
        id: r.id || idx + 1,
        title: r.title,
        description: r.description,
        icon: r.icon || "check_circle",
      }));
    } else {
      list = ADMISSION_RULES;
    }

    return list.map((rule) => {
      if ((rule.id === 8 || rule.title?.includes("নথিপত্র")) && dynamicRequiredDocs) {
        return { ...rule, description: dynamicRequiredDocs };
      }
      return rule;
    });
  }, [apiRules, dynamicRequiredDocs]);

  return (
    <div
      className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-5 sm:p-7 lg:p-8 shadow-xs w-full mb-8"
      id="rules-section"
      data-purpose="admission-rules-card"
    >
      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-200/70">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white border border-slate-200/80 text-primary flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[24px]">
              menu_book
            </span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              ভর্তি হওয়ার যোগ্যতা ও আবশ্যকীয় নিয়মাবলী
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              ভর্তি প্রক্রিয়ায় স্বচ্ছতা ও শৃঙ্খলা বজায় রাখতে নিম্নলিখিত শর্ত ও নিয়মগুলো সতর্কতার সাথে পড়ুন
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 text-slate-700 font-semibold text-xs shadow-xs shrink-0 self-start sm:self-auto">
          <span className="material-symbols-outlined text-[16px] text-primary">
            verified
          </span>
          <span>সর্বমোট {toBengaliDigits(rules.length)}টি আবশ্যকীয় শর্ত</span>
        </div>
      </div>

      {/* Dynamic Rules Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200/80 hover:border-primary/40 transition-all shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[19px]">
                {rule.icon || "check_circle"}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                {rule.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {rule.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

AdmissionRules.propTypes = {
  dynamicRequiredDocs: PropTypes.string,
};

export default AdmissionRules;
