import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toBengaliDigits } from "../utils/admissionUtils";
import AcademicYear from "../../../components/AcademicYear";

const AdmissionHero = ({
  totalClasses = 17,
  dateRange = "২২ শে ফেব্রুয়ারি – ৬ এপ্রিল",
}) => {
  return (
    <section
      className="w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 border-b border-slate-200/70"
      data-purpose="admission-hero-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-4">
          {/* Badge Indicator */}
          <div className="flex flex-wrap items-center gap-2 mb-3.5 sm:mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>ভর্তি তথ্য ও আবেদন নির্দেশিকা</span>
            </span>
            <span className="text-secondary text-xs">•</span>
            <span className="text-secondary text-xs font-medium">
              <AcademicYear prefix="শিক্ষাবর্ষ " separator="-" />
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 w-full">
            <div>
              {/* Section Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.3] font-bold text-slate-900 tracking-tight leading-snug">
                মাদ্রাসার{" "}
                <span className="text-primary">
                  ভর্তি সংক্রান্ত নির্দেশনা
                </span>{" "}
                ও ফি তালিকা
              </h1>

              {/* Subheading */}
              <p className="text-slate-600 text-sm sm:text-base max-w-3xl mt-2 leading-relaxed">
                নতুন ও পুরাতন শিক্ষার্থীদের জন্য সুশৃঙ্খল ভর্তি নির্দেশিকা, বিভাগভিত্তিক পূর্ণাঙ্গ ফি তালিকা এবং সরাসরি আসন প্রাপ্তির সর্বশেষ তথ্য।
              </p>
            </div>

            {/* Quick Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href="#rules-section"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200/80 shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[17px] text-primary">
                  rule
                </span>
                <span>ভর্তি নীতিমালা</span>
              </a>
              <a
                href="#fee-table-section"
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[17px]">
                  payments
                </span>
                <span>ফি চার্ট দেখুন</span>
              </a>
              <Link
                to="/contact"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-primary font-semibold text-xs sm:text-sm border border-slate-200/80 shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[17px]">
                  headset_mic
                </span>
                <span>হেল্পলাইন</span>
              </Link>
            </div>
          </div>

          {/* 3 Quick Highlight / Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full mt-2">
            <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f1f3ff] text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  menu_book
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-500 font-medium">
                  মোট শ্রেণি ও কোর্স
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {toBengaliDigits(totalClasses)} টি বিভাগ অন্তর্ভুক্ত
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f1f3ff] text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  calendar_month
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-500 font-medium">
                  ভর্তি কার্যক্রমের সময়সীমা
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {dateRange}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f1f3ff] text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  support_agent
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-500 font-medium">
                  ভর্তি সংক্রান্ত যোগাযোগ
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  ০১৭৫১-৬৯৯৯০৯
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AdmissionHero.propTypes = {
  totalClasses: PropTypes.number,
  dateRange: PropTypes.string,
};

export default AdmissionHero;
