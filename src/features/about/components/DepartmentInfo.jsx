import { BookOpen, Building2, Library, MessageCircle, Mic, Newspaper } from "lucide-react";
import AboutSectionHeading from "./AboutSectionHeading";

const activities = [
  [MessageCircle, "ক্বিরাআত ও তাজবিদ", "সহিহ উচ্চারণ ও সুরচর্চা"],
  [Library, "কুতুবখানা বা গ্রন্থাগার", "অমূল্য কিতাবের সুবিশাল ভাণ্ডার"],
  [BookOpen, "ছাত্র পাঠাগার", "সাহিত্য ও সাধারণ জ্ঞান চর্চা"],
  [Mic, "বক্তৃতা প্রশিক্ষণ কর্মশালা", "সাপ্তাহিক বক্তৃতা ও বিতর্ক ফোরাম"],
  [Newspaper, "দেয়ালিকা প্রকাশ", "নিয়মিত সাহিত্য ও মননশীল সৃজন"],
  [Building2, "আবাসিক ছাত্রাবাস", "সুশৃঙ্খল ও নিরিবিলি আবাসিক পরিবেশ"],
];

const DepartmentInfo = () => (
  <section className="bg-white py-8 sm:py-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-[#f1f3ff] border border-slate-200/80 p-4 sm:p-6 shadow-xs">
        <AboutSectionHeading eyebrow="তারবিয়াত ব্যবস্থা" title="তারবিয়াত বা ছাত্রগঠন বিভাগ" description="শিক্ষার্থীদের সত্যিকার অর্থে ওয়ারিসান আম্বিয়া ও যুগোপযোগী দা-ঈ হিসেবে গড়ে তুলতে মাদ্রাসায় রয়েছে বহুমুখী ও সুশৃঙ্খল গঠনমূলক বিভিন্ন সক্রিয় শাখা—" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map(([Icon, title, copy]) => <article className="flex items-center gap-2 rounded-lg bg-white p-2.5 shadow-sm" key={title}><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700"><Icon size={16} /></span><div><h3 className="text-xs font-bold text-slate-900">{title}</h3><p className="text-[10px] leading-4 text-slate-500">{copy}</p></div></article>)}
        </div>
      </div>
    </div>
  </section>
);

export default DepartmentInfo;
