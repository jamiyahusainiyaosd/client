import { Backpack, BadgeCheck, BookOpen, Building2, Coins, GraduationCap, Users } from "lucide-react";
import AboutSectionHeading from "./AboutSectionHeading";

const overviewIcons = [
  BookOpen,
  BadgeCheck,
  Coins,
  Users,
  Backpack,
  Building2,
  GraduationCap,
  Users,
  Coins,
  GraduationCap,
];

const overviewFacts = [
  ["প্রতিষ্ঠাকাল", "১৪১৩ হিজরি / ১৯৯৩ ইং", "বাংলা ১৪০০ সনে প্রতিষ্ঠিত"],
  ["মূল মতাদর্শ", "আহলুস সুন্নাহ ওয়াল জামাআহ", "দারুল উলুম দেওবন্দের শিক্ষানীতি অনুসরণ"],
  ["মুহতামিম ও শিক্ষাসচিব", "মুহতামিম: মাওলানা সৈয়দ তানভীর ছিফাতুল্লাহ", "শিক্ষাসচিব: মাওলানা আব্দুল কুদ্দুস নোমান"],
  ["শিক্ষক ও কর্মচারী", "মোট ২৬ জন", "২৪ জন দক্ষ শিক্ষক ও ২ জন কর্মচারী"],
  ["ছাত্রসংখ্যা ও ব্যবস্থাপনা", "প্রায় ৬০০ জন", "আবাসিক ও অনাবাসিক শিক্ষার্থী"],
  ["শিক্ষাদান বিভাগ", "মোট ৬টি বিভাগ", "ইবতেদাইয়্যাহ, নূরানী, মক্তব, হিফজ ও কিতাব বিভাগ"],
];

const FirstLooksInfo = () => {
  return (
    <section className="bg-[#f1f3ff] py-8 sm:py-10 border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AboutSectionHeading eyebrow="কাঠামো ও পরিচিতি" title="এক নজরে জামিয়া হুসাইনিয়া" description="প্রতিষ্ঠানের মূল তথ্য, সাংগঠনিক কাঠামো ও আর্থিক স্বচ্ছতা" />
        <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {overviewFacts.map(([label, value, note], index) => {
            const ItemIcon = overviewIcons[index] || BookOpen;
            return <div key={index} className="flex items-start gap-2 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-100">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700"><ItemIcon size={16} /></span>
              <div><span className="text-[10px] text-slate-500">{label}</span><h4 className="text-sm font-bold text-slate-900">{value}</h4><p className="mt-1 text-[10px] leading-5 text-slate-500">{note}</p></div>
            </div>;
          })}
        </div>
        <div className="grid gap-2 lg:grid-cols-12">
          <div className="rounded-xl bg-white p-4 shadow-sm lg:col-span-7"><h3 className="flex items-center gap-2 text-base font-bold text-emerald-800"><Coins size={17} /> আয়ের উৎস ও তহবিল কাঠামো</h3><p className="mt-1 text-xs leading-5 text-slate-600">মাদ্রাসাটি ধর্মপ্রাণ জনসাধারণ ও প্রবাসী ভাই-বোনদের স্বতঃস্ফূর্ত দান-অনুদানে পরিচালিত হয়।</p><div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold"><span className="rounded bg-[#f1f3ff] border border-slate-200/80 p-2">জেনারেল ফান্ড<small className="block text-[9px] font-normal text-slate-500">দৈনন্দিন ব্যয়</small></span><span className="rounded bg-[#f1f3ff] border border-slate-200/80 p-2">গরিব ফান্ড<small className="block text-[9px] font-normal text-slate-500">সহায়তা</small></span><span className="rounded bg-[#f1f3ff] border border-slate-200/80 p-2">কিতাব ফান্ড<small className="block text-[9px] font-normal text-slate-500">গ্রন্থাগার</small></span></div></div>
          <div className="rounded-xl bg-white p-4 shadow-sm lg:col-span-5"><h3 className="flex items-center gap-2 text-base font-bold text-emerald-800"><GraduationCap size={17} /> ছাত্রদের সুযোগ-সুবিধা</h3><p className="mt-1 text-xs leading-5 text-slate-600">দরিদ্র, মেধাবী শিক্ষার্থী এবং এতিমদের খাদ্য, বস্ত্র, চিকিৎসা ও পাঠ্যপুস্তকসহ পড়াশোনার খরচ গরিব ফান্ড থেকে বিনামূল্যে বহন করা হয়।</p><strong className="mt-2 flex items-center gap-1 text-[10px] text-emerald-700"><BadgeCheck size={14} /> অসংখ্য শিক্ষার্থী নিখরচায় সুবিধাভোগী</strong></div>
        </div>
      </div>
    </section>
  );
};
 
export default FirstLooksInfo;
