import PropTypes from "prop-types";

const toBn = (n) => String(n).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

const getDynamicAcademicSession = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextYearShort = String(currentYear + 1).slice(-2);
  return `${toBn(currentYear)}-${toBn(nextYearShort)}`;
};

const PhotoGalleryHero = ({
  totalCount = 0,
  categoryCount = 5,
  academicSession,
}) => {
  const session = academicSession || getDynamicAcademicSession();

  return (
    <section className="relative w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start max-w-3xl">
          {/* Breadcrumb & Eyebrow */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              ফটো গ্যালারি ও চিত্রশালা
            </span>
            <span className="text-secondary text-body-sm">•</span>
            <span className="text-secondary text-body-sm font-medium">ঐতিহ্য, প্রাঙ্গণ ও দ্বীনি শিক্ষা</span>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.3] text-on-surface font-bold tracking-tight mb-3">
            জামিয়া হুসাইনিয়ার <span className="text-primary">ফটো গ্যালারি</span>
          </h1>
          <p className="font-body-lg text-sm sm:text-base lg:text-lg text-secondary leading-relaxed max-w-3xl">
            সুদীর্ঘ ইতিহাস, সুশোভিত সবুজ প্রাঙ্গণ, কুরআন-সুন্নাহর তা’লীম ও ঐতিহ্যবাহী শিক্ষা-দীক্ষার স্মরণীয় মুহূর্তসমূহের এক জীবন্ত চিত্রশালা।
          </p>
        </div>

        {/* Dynamic Quick Metrics Bar */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Stat 1: Total Photos */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px] sm:text-[26px]">collections</span>
            </div>
            <div>
              <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">{toBn(totalCount)}+</span>
              <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">সংরক্ষিত দুর্লভ ছবি</span>
            </div>
          </div>

          {/* Stat 2: Categories Count */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px] sm:text-[26px]">category</span>
            </div>
            <div>
              <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">{toBn(categoryCount)}টি</span>
              <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">আলাদা বিভাগ</span>
            </div>
          </div>

          {/* Stat 3: Real Authenticity */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px] sm:text-[26px]">verified</span>
            </div>
            <div>
              <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">১০০%</span>
              <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">প্রামাণ্য বাস্তব পরিবেশ</span>
            </div>
          </div>

          {/* Stat 4: Dynamic Academic Year */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px] sm:text-[26px]">history_edu</span>
            </div>
            <div>
              <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">{session}</span>
              <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">চলতি শিক্ষাবর্ষ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PhotoGalleryHero.propTypes = {
  totalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  categoryCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  academicSession: PropTypes.string,
};

export default PhotoGalleryHero;
