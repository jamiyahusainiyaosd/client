import React from "react";

const ContactHero = () => {
  return (
    <section
      className="w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 border-b border-slate-200/70"
      data-purpose="contact-hero-intro"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-4">
          {/* Badge Indicator */}
          <div className="flex flex-wrap items-center gap-2 mb-3.5 sm:mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>আমাদের সাথে যোগাযোগ</span>
            </span>
            <span className="text-secondary text-xs">•</span>
            <span className="text-secondary text-xs font-medium">সরাসরি সহায়তা ডেস্ক</span>
          </div>

          {/* Section Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            আপনার জিজ্ঞাসা ও মতামত{" "}
            <span className="text-[#0d6e48]">আমাদের কাছে অত্যন্ত মূল্যবান</span>
          </h1>

          {/* Subheading Description */}
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
            দ্বীনি শিক্ষা, ভর্তি কার্যক্রম, দান-সাদাকাহ বা জামিয়া হুসাইনিয়া মাদ্রাসার যেকোনো বিষয়ে জানতে সরাসরি আমাদের ক্যাম্পাসে আসুন, ফোন করুন অথবা নিচের ফরমের মাধ্যমে বার্তা পাঠান।
          </p>

          {/* 3 Quick Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full mt-2">
            <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f1f3ff] text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  location_on
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-500 font-medium">
                  ক্যাম্পাস অবস্থান
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  শায়েস্তাগঞ্জ, হবিগঞ্জ
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f1f3ff] text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  call
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-500 font-medium">
                  জরুরি হেল্পলাইন
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate font-mono">
                  +880 1751-699909
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f1f3ff] text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  mail
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-500 font-medium">
                  অফিসিয়াল ই-মেইল
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  jamiyahusainiya1@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
