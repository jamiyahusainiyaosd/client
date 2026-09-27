import { Quote } from "lucide-react";
import { aboutData } from "../../../constants/aboutData";

const TheWordInfo = () => (
  <section className="bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
    <div className="mx-auto max-w-7xl rounded-2xl bg-slate-950 px-5 py-7 text-center text-white shadow-sm sm:px-10 sm:py-8">
      <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-emerald-700"><Quote size={20} /></span>
      <span className="mt-3 block text-[10px] font-bold text-amber-300">অনুপ্রেরণাদায়ী বাণী — দ্বীনি শিক্ষার মর্যাদা ও মাহাত্ম্য</span>
      <blockquote className="mx-auto mt-3 max-w-4xl text-base font-bold leading-7 text-white sm:text-lg sm:leading-8">“{aboutData.quote.text}”</blockquote>
      <p className="mx-auto mt-2 max-w-2xl text-xs leading-6 text-slate-300">“{aboutData.quote.texts}”</p>
      <strong className="mt-3 block text-sm text-amber-300">— হযরত মাওলানা সাইয়্যেদ আবুল হাসান আলী নদভী রহ.</strong>
      <em className="mt-1 block text-[10px] not-italic text-slate-400">বিশ্বখ্যাত ইসলামী চিন্তাবিদ ও লেখক</em>
    </div>
  </section>
);

export default TheWordInfo;
