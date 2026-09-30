import { CalendarDays, GraduationCap, Landmark, Users } from "lucide-react";

const metrics = [
  [CalendarDays, "১৯৯৩ ইং", "প্রতিষ্ঠাকাল (১৪১৩ হি.)"],
  [Users, "৬০০+ ছাত্র", "দ্বীনি শিক্ষার্থী"],
  [GraduationCap, "২৬ জন", "উস্তাদ ও কর্মচারী"],
  [Landmark, "৬টি বিভাগ", "নূরানী থেকে কিতাব"],
];

const AboutHero = () => (
  <section className="w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 border-b border-slate-200/60">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          মাদ্রাসা সম্পর্কে
        </span>
        <span className="text-secondary text-xs">•</span>
        <span className="text-secondary text-xs font-medium">ঐতিহ্য, আদর্শ ও অগ্রযাত্রা</span>
      </div>
      <h1 className="max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.3] font-bold text-slate-900 tracking-tight leading-snug">
        জামিয়া হুসাইনিয়া — <span className="text-primary">ইতিহাস, বৈশিষ্ট্য</span> ও পরিকল্পনা
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">জামিয়া হুসাইনিয়ার প্রতিষ্ঠা, লক্ষ্য, তারবিয়ত ব্যবস্থা এবং ভবিষ্যৎ পরিকল্পনা সম্পর্কে একটি সমন্বিত ও প্রামাণ্য রূপরেখা।</p>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map(([Icon, value, label]) => (
          <div className="flex min-h-[60px] items-center gap-2 rounded-lg border border-white/80 bg-white px-3 py-2 shadow-sm" key={label}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700"><Icon size={18} /></span>
            <span><strong className="block text-sm font-bold text-emerald-800">{value}</strong><small className="block text-[10px] leading-4 text-slate-500">{label}</small></span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutHero;
