import React from "react";
import { UtensilsCrossed, Clock, Sparkles, Printer, CheckCircle2 } from "lucide-react";

const MealMenuHero = ({ onPrint }) => {
  return (
    <section className="w-full bg-[#f1f3ff] border-b border-slate-200/60 pt-6 sm:pt-10 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Text */}
          <div className="max-w-3xl">
            {/* Top Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-primary text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                আবাসিক ডাইনিং ও পুষ্টি ব্যবস্থাপনা
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-main tracking-tight leading-snug">
              আবাসিক শিক্ষার্থীদের দৈনিক খাবার তালিকা
            </h1>
            <p className="mt-3 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-normal">
              জামিয়া হুসাইনিয়া মাদ্রাসার আবাসিক শিক্ষার্থীদের শারীরিক সুস্থতা, পরিচ্ছন্নতা
              ও সার্বক্ষণিক সুষম পুষ্টি নিশ্চিতকল্পে প্রতি সপ্তাহের ৭ দিনের জন্য নির্ধারিত সুষম ও সুস্বাদু খাদ্য তালিকা।
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5 text-slate-700 font-semibold">
                <UtensilsCrossed className="w-4 h-4 text-emerald-600 shrink-0" />
                মেনু চক্র: <strong className="text-main font-bold">সাপ্তাহিক (৭ দিন)</strong>
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 text-slate-700 font-semibold">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                পরিবেশন: <strong className="text-main font-bold">৩ বেলা (সকাল, দুপুর ও রাত)</strong>
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ১০০% হালাল ও স্বাস্থ্যসম্মত
              </span>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-3 self-start lg:self-center">
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-700 font-medium text-xs sm:text-sm shadow-sm hover:bg-slate-50 hover:text-primary transition-all active:scale-95"
            >
              <Printer className="w-4 h-4 text-primary" />
              তালিকা প্রিন্ট / সেভ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealMenuHero;
