import { BookOpen, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { aboutData } from "../../../constants/aboutData";
import AboutSectionHeading from "./AboutSectionHeading";

const icons = [BookOpen, Sparkles, MessageCircle];

const AimsAndObjectivesInfo = () => (
  <div>
    <AboutSectionHeading centered eyebrow="নীতিমালা ও রূপকল্প" title="আমাদের লক্ষ্য ও উদ্দেশ্য" description="দ্বীনি শিক্ষা ও চারিত্রিক গঠনের মূল স্তম্ভসমূহ" />
    <div className="grid gap-4 md:grid-cols-3">
      {aboutData.goals.map((goal, index) => {
        const Icon = icons[index];
        return <article className="flex min-h-48 flex-col rounded-2xl bg-[#f1f3ff] border border-slate-200/80 p-5 shadow-xs" key={goal}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-700 shadow-sm"><Icon size={20} /></span>
          <span className="mt-3 text-[10px] font-bold text-emerald-700">স্তম্ভ {index + 1}</span>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{goal.replace(/^✅\s*/, "").split("।")[0]}</h3>
          <p className="mt-1 text-xs leading-6 text-slate-600">{goal.replace(/^✅\s*/, "")}</p>
          <strong className="mt-auto flex items-center gap-1 pt-3 text-[10px] text-emerald-700"><CheckCircle2 size={15} /> কুরআন-সুন্নাহর সহিহ অনুসৃতি</strong>
        </article>;
      })}
    </div>
  </div>
);

export default AimsAndObjectivesInfo;
