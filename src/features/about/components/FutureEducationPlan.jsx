import { CheckCircle2, School, TrendingUp } from "lucide-react";
import { aboutData } from "../../../constants/aboutData";

const FutureEducationPlan = () => (
  <article className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
    <header className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-700 text-white"><School size={20} /></span><div><span className="text-[10px] font-bold text-emerald-700">একাডেমিক রূপরেখা</span><h3 className="text-lg font-bold text-slate-900">ভবিষ্যৎ শিক্ষা পরিকল্পনা</h3></div></header>
    <p className="mt-2 text-xs leading-6 text-slate-600">শিক্ষাব্যবস্থাকে আরও আধুনিক, গবেষণাভিত্তিক ও যুগোপযোগী করে ফলপ্রসূ রূপ দেওয়ার লক্ষ্যে গৃহীত পদক্ষেপসমূহ:</p>
    <ul className="mt-2 grid gap-1.5">{aboutData.futurePlans.education.map((plan) => <li className="flex items-start gap-2 rounded-md bg-indigo-50/70 p-1.5 text-xs leading-5 text-slate-700" key={plan}><CheckCircle2 className="mt-1 shrink-0 text-emerald-700" size={14} />{plan.replace(/^🔹\s*/, "")}</li>)}</ul>
    <strong className="mt-3 flex items-center gap-1 text-[10px] text-emerald-700"><TrendingUp size={15} /> ক্রমান্বয়ে বাস্তবায়নের কাজ প্রক্রিয়াধীন</strong>
  </article>
);

export default FutureEducationPlan;
