import { Building2 } from "lucide-react";
import { aboutData } from "../../../constants/aboutData";
 
const IntroductionInfo = () => {
  return (
    <article className="h-full rounded-xl bg-indigo-50/60 p-5">
      <span className="mb-2 grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700"><Building2 size={20} /></span>
      <span className="text-[11px] font-bold text-emerald-700">ভূমিকা ও প্রেক্ষাপট</span>
      <h3 className="mt-1 text-lg font-bold text-slate-900">প্রতিষ্ঠার ঐতিহাসিক পটভূমি ও উদ্দেশ্য</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{aboutData.introduction}</p>
      <div className="mt-4 rounded-xl bg-slate-950 p-4 text-white"><span className="text-[11px] font-bold text-amber-300">✦ নামকরণের ইতিহাস</span><h4 className="mt-1 text-base font-bold">শায়খুল ইসলাম আল্লামা মাদানী রহ.-এর বরকতময় স্মৃতি</h4><p className="mt-2 text-xs leading-6 text-slate-300">আওলাদে রাসুল (সা.) শায়খুল ইসলাম আল্লামা সাইয়্যেদ হুসাইন আহমদ মাদানী রহ.-এর পুণ্যময় নামানুসারে এ বিদ্যাপীঠের নামকরণ করা হয় <strong className="text-emerald-300">“জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ”</strong>।</p></div>
    </article>
  );
};
 
export default IntroductionInfo;