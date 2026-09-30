import React from "react";
import { Printer, ShieldCheck } from "lucide-react";

const toBengaliNumber = (num) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[Number(d)]);
};

const BoardingHero = ({ totalRules = 26 }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="w-full bg-[#f1f3ff] border-b border-slate-200/60 pt-6 sm:pt-10 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Top Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              আবাসিক নীতিমালা
            </span>
            <span className="text-secondary text-xs">•</span>
            <span className="text-secondary text-xs font-medium">দারুল ইক্বামাহ ও ছাত্রাবাস শৃঙ্খলা</span>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-primary hover:border-primary/40 hover:bg-slate-50 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Printer className="w-3.5 h-3.5 text-primary" />
            <span>প্রিন্ট করুন</span>
          </button>
        </div>

        {/* Heading & Intro */}
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.3] font-bold text-slate-900 tracking-tight leading-snug">
            আবাসিক নীতিমালা ও <span className="text-primary">আচরণবিধি</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
            সুন্নতি ইলম, আমল ও তাকওয়ার নিবিড় পরিবেশে ইলমে ওহীর শিক্ষার্থী গড়ে তুলতে
            জামিয়া হুসাইনিয়া ছাত্রাবাসের সার্বিক নিয়মাবলী, শৃঙ্খলাবিধি এবং আচরণবিধিসমূহ।
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              মোট বিধিমালা: <strong className="text-main font-bold">{toBengaliNumber(totalRules)}টি</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardingHero;
