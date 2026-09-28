import React from "react";
import { Sparkles, Trophy, BookOpen, Users } from "lucide-react";

const toBengaliNumber = (num) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[Number(d)]);
};

const CoCurricularHero = ({ totalActivities = 10 }) => {
  return (
    <section className="w-full bg-[#f1f3ff] border-b border-slate-200/60 pt-6 sm:pt-10 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badge */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-primary text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            মেধা বিকাশ ও সুন্নতি তারবিয়াত
          </div>
        </div>

        {/* Heading & Intro */}
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-main tracking-tight leading-snug">
            সহ-পাঠ্যক্রমিক কার্যক্রম
          </h1>
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-normal">
            শিক্ষাদানের ক্ষেত্রে নির্ধারিত পাঠ্যক্রমের পাশাপাশি ছাত্রদের বহুমুখী মেধা,
            সৃজনশীলতা ও আত্মিক বিকাশের জন্য জামিয়া হুসাইনিয়া মাদ্রাসায় রয়েছে ঐতিহ্যবাহী
            ও সুবিন্যস্ত সহ-পাঠ্যক্রমের চমৎকার সমাহার।
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 text-slate-700 font-semibold">
              <Trophy className="w-4 h-4 text-emerald-600 shrink-0" />
              সক্রিয় ফোরাম ও ক্লাব: <strong className="text-main font-bold">{toBengaliNumber(totalActivities)}টি</strong>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-700 font-semibold">
              <Users className="w-4 h-4 text-emerald-600 shrink-0" />
              তত্ত্বাবধানে: সম্মানিত মুহাদ্দিস ও অভিজ্ঞ উস্তাদবৃন্দ
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoCurricularHero;
