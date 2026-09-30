import { Eye, Landmark, Languages, MapPin } from "lucide-react";
import { aboutData } from "../../../constants/aboutData";
import AboutSectionHeading from "./AboutSectionHeading";

const icons = [MapPin, Eye, Languages, Landmark];
const titles = ["মনোরম ভৌগোলিক অবস্থান", "সার্বক্ষণিক নিবিড় তত্ত্বাবধান", "বহুভাষিক ও যুগোপযোগী জ্ঞানচর্চা", "আমল ও আদর্শের বাস্তব অনুশীলন"];

const CharacteristicsInfo = () => (
  <section className="bg-[#f1f3ff] py-8 sm:py-10 border-y border-slate-200/80">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <AboutSectionHeading eyebrow="আমাদের স্বাতন্ত্র্য" title="আমাদের বৈশিষ্ট্যসমূহ" description="অন্যান্য দ্বীনি প্রতিষ্ঠানের তুলনায় জামিয়ার অনন্য বৈশিষ্ট্য ও অবস্থান" />
      <div className="grid gap-3 md:grid-cols-2">
        {aboutData.features.map((feature, index) => { const Icon = icons[index]; return <article className="flex gap-3 rounded-xl bg-white p-4 shadow-sm" key={feature}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><Icon size={20} /></span><div><h3 className="text-base font-bold text-slate-900">{titles[index]}</h3><p className="mt-1 text-xs leading-6 text-slate-600">{feature.replace(/^[^:]+:\s*/, "")}</p></div></article>; })}
      </div>
    </div>
  </section>
);

export default CharacteristicsInfo;
