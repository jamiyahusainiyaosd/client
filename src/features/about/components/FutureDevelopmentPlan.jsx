import { Building2, CheckCircle2, HeartHandshake } from "lucide-react";
import { aboutData } from "../../../constants/aboutData";

const FutureDevelopmentPlan = () => (
  <article className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
    <header className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-950 text-white"><Building2 size={20} /></span><div><span className="text-[10px] font-bold text-emerald-700">অবকাঠামো রূপরেখা</span><h3 className="text-lg font-bold text-slate-900">ভবিষ্যৎ উন্নয়ন পরিকল্পনা</h3></div></header>
    <p className="mt-2 text-xs leading-6 text-slate-600">অবকাঠামো, উন্নত আবাসন ব্যবস্থা, আধুনিক সুযোগ-সুবিধা ও সার্বিক পরিবেশ নিশ্চিতকরণের মহাপরিকল্পনা:</p>
    <ul className="mt-2 grid gap-1.5">{aboutData.futurePlans.development.map((plan) => <li className="flex items-start gap-2 rounded-md bg-indigo-50/70 p-1.5 text-xs leading-5 text-slate-700" key={plan}><CheckCircle2 className="mt-1 shrink-0 text-emerald-700" size={14} />{plan.replace(/^🏗\s*/, "")}</li>)}</ul>
    <strong className="mt-3 flex items-center gap-1 text-[10px] text-amber-700"><HeartHandshake size={15} /> সকল শুভানুধ্যায়ী ও প্রবাসীদের দোয়া ও সহযোগিতা কাম্য</strong>
  </article>
);

export default FutureDevelopmentPlan;
