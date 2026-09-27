import { CalendarDays, GraduationCap, Landmark, Users } from "lucide-react";

const metrics = [
  [CalendarDays, "১৯৯৩ ইং", "প্রতিষ্ঠাকাল (১৪১৩ হি.)"],
  [Users, "৬০০+ ছাত্র", "দ্বীনি শিক্ষার্থী"],
  [GraduationCap, "২৬ জন", "উস্তাদ ও কর্মচারী"],
  [Landmark, "৬টি বিভাগ", "নূরানী থেকে কিতাব"],
];

const AboutHero = () => (
  <section className="bg-gradient-to-b from-indigo-50 to-indigo-50/60 pb-8 pt-28 sm:pt-32 lg:pb-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm font-semibold tracking-wide shadow-xs">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          মাদ্রাসা সম্পর্কে
        </span>
        <span className="text-secondary text-body-sm">•</span>
        <span className="text-secondary text-body-sm font-medium">ঐতিহ্য, আদর্শ ও অগ্রযাত্রা</span>
      </div>
      <h1 className="max-w-4xl text-3xl font-bold leading-[1.35] text-slate-900 sm:text-4xl lg:text-[44px] lg:leading-[1.36]">
        জামিয়া হুসাইনিয়া — <span className="text-emerald-700">ইতিহাস, বৈশিষ্ট্য</span> ও পরিকল্পনা
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
