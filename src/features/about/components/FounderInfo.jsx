import { Users } from "lucide-react";
import { aboutData } from "../../../constants/aboutData";
 
const FounderInfo = () => {
  return (
    <article className="h-full rounded-2xl bg-[#f1f3ff] border border-slate-200/80 p-5 sm:p-6 shadow-xs">
      <div className="flex items-start gap-3 border-b border-slate-200/80 pb-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-700 text-white"><Users size={20} /></span>
        <div><span className="text-[11px] font-bold text-emerald-700">মাদ্রাসার প্রতিষ্ঠাতা — আধ্যাত্মিক মুরব্বী ও অনুপ্রেরণার কেন্দ্র</span><h3 className="text-lg font-bold text-slate-900">{aboutData.founder.name.replace("নাম : ", "")}</h3><p className="text-[10px] text-slate-500">ওফাত: ১৮ রবীউল আউয়াল ১৪৩০ হি. / ১৫ ফেব্রুয়ারি ২০০৯ খ্রি.</p></div>
      </div>
      <div className="mt-4 border-l-4 border-emerald-600 pl-3"><p className="text-sm leading-6 text-slate-600">{aboutData.founder.description}</p></div>
    </article>
  );
};
 
export default FounderInfo;