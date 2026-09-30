import React from "react";
import { Link } from "react-router-dom";
import { Trophy, Sparkles, ChevronRight, GraduationCap } from "lucide-react";

const TopAchieversHero = ({ totalCount = 0 }) => {
  return (
    <section className="relative overflow-hidden bg-[#f1f3ff] border-b border-slate-200/70 pt-8 pb-10 sm:pt-10 sm:pb-12">
      <div className="relative site-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-4">
          <Link to="/" className="hover:text-primary transition-colors">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/results" className="hover:text-primary transition-colors">
            ফলাফল
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-primary font-semibold">এ বছরের সেরা</span>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3.5 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                এ বছরের সেরা
              </span>
              <span className="text-secondary text-xs">•</span>
              <span className="text-secondary text-xs font-medium">ইলম ও মেধার শীর্ষ গৌরব</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.3] font-bold text-slate-900 tracking-tight leading-snug">
              এ বছরের <span className="text-primary">সেরা কৃতি শিক্ষার্থী</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
              কেন্দ্রীয় কওমি মাদ্রাসা শিক্ষাবোর্ড (বেফাকুল মাদারিসিল আরাবিয়া ও আল-হাইয়াতুল উলইয়া) এবং জামিয়ার বার্ষিক ইমতিহানে দেশ, বিভাগ, জেলা ও অভ্যন্তরীণ জামাতভিত্তিক মেধা তালিকায় শীর্ষস্থান অর্জনকারী শিক্ষার্থীদের গৌরবোজ্জ্বল তালিকা।
            </p>
          </div>

          {/* Quick Metrics Bar (White Cards on #f1f3ff background for optimal contrast) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted">মোট সেরা শিক্ষার্থী</p>
                <p className="text-base sm:text-lg font-bold text-main font-mono">
                  {totalCount > 0 ? totalCount : "—"} জন
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center border border-primary-border/60 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-muted">বোর্ড ও জামাত</p>
                <p className="text-base sm:text-lg font-bold text-main">
                  কেন্দ্রীয় ও অভ্যন্তরীণ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopAchieversHero;
