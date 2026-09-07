import { HandHeart, Mail, MapPin, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";
import Authorities from "../features/home/components/Authorities";
import HomeIntro from "../features/home/components/HomeIntro";
import ImageSlider from "../features/home/components/ImageSlider";
import Marquee from "../features/home/components/Marquee";
import RecentNotices from "../features/home/components/RecentNotices";
import PageTitle from "../utils/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle key={"homePage"} title={"জামিয়া হুসাইনিয়া"} />
      <main className="min-h-screen bg-watt-bg pb-20">
        {/* Fullscreen Hero */}
        <ImageSlider />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Marquee */}
          <div className="my-8">
            <Marquee />
          </div>

          {/* Main layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* Left — Main content */}
            <div className="lg:flex-1 space-y-8">
              <RecentNotices />
              <HomeIntro />
            </div>

            {/* Right sidebar */}
            <aside className="lg:w-72 xl:w-80 space-y-6">
              {/* Principal card */}
              <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="px-5 py-3.5 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
                  <h2 className="text-sm font-semibold tracking-wide">
                    প্রিন্সিপাল মহোদয়
                  </h2>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    নেতৃত্ব
                  </span>
                </div>
                <div className="p-3">
                  <Authorities />
                </div>
              </div>

              {/* Mission card — Verdana Health spec: Tinted header strip (#0F172A), 8px radius, white surface */}
              <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center gap-2.5">
                  <div className="h-6 w-6 flex items-center justify-center rounded bg-slate-800 text-emerald-400 text-xs font-semibold">
                    ☪
                  </div>
                  <h3 className="text-sm font-semibold">আমাদের লক্ষ্য</h3>
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-600 leading-relaxed text-bengali">
                    কুরআন ও সুন্নাহভিত্তিক খাঁটি দ্বীনি শিক্ষার মাধ্যমে আদর্শ
                    আলেম ও আল্লাহভীরু মানুষ তৈরী করা, নৈতিক ও স্পিরিচুয়াল
                    টার্মে সমাজকে আলোর পথে পরিচালিত করা।
                  </p>
                </div>
              </div>

              {/* Admission CTA Card */}
              <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-3 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  দ্রুত লিংক
                </h3>
                <NavLink
                  to="/admission"
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-slate-900 hover:bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition-all duration-150"
                >
                  ভর্তি আবেদন করুন
                </NavLink>
                <NavLink
                  to="/expatriateGrant"
                  className="flex items-center justify-center gap-2 w-full rounded-lg border border-slate-900 bg-transparent hover:bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 transition-all duration-150"
                >
                  <HandHeart size={15} className="text-emerald-600" />
                  প্রবাসী অনুদান
                </NavLink>
              </div>

              {/* Quick Contact — with Lucide Icons */}
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  যোগাযোগ করুন
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:jamiyahusainiya1@gmail.com"
                    className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition-colors group"
                  >
                    <span className="h-7 w-7 flex items-center justify-center rounded bg-slate-100 group-hover:bg-emerald-50 transition-colors flex-shrink-0">
                      <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    <span className="text-xs font-mono truncate">
                      jamiyahusainiya1@gmail.com
                    </span>
                  </a>
                  <a
                    href="tel:+8801751699909"
                    className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition-colors group"
                  >
                    <span className="h-7 w-7 flex items-center justify-center rounded bg-slate-100 group-hover:bg-emerald-50 transition-colors flex-shrink-0">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    <span className="text-xs font-mono">+8801751699909</span>
                  </a>
                  <div className="flex items-start gap-3 text-slate-600">
                    <span className="h-7 w-7 flex items-center justify-center rounded bg-slate-100 flex-shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    <span className="text-xs leading-relaxed">
                      শায়েস্তাগঞ্জ, হবিগঞ্জ, সিলেট
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
