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
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

          {/* Hero */}
          <ImageSlider />

          {/* Marquee */}
          <div className="mt-5 mb-8">
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
            <aside className="lg:w-72 xl:w-80 space-y-4">

              {/* Principal card */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm overflow-hidden">
                <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-slate-700/60">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    প্রিন্সিপাল মহোদয়
                  </h2>
                </div>
                <div className="p-3">
                  <Authorities />
                </div>
              </div>

              {/* Mission card */}
              <div className="rounded-2xl overflow-hidden border border-emerald-200/60 dark:border-emerald-800/40 bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-800 dark:to-emerald-900 p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="h-7 w-7 flex items-center justify-center rounded-lg bg-white/15 text-white text-sm font-semibold">
                    ☪
                  </div>
                  <h3 className="text-sm font-bold text-white">আমাদের লক্ষ্য</h3>
                </div>
                <p className="text-xs text-emerald-50/90 leading-relaxed text-bengali">
                  কুরআন ও সুন্নাহভিত্তিক খাঁটি দ্বীনি শিক্ষার মাধ্যমে আদর্শ আলেম ও আল্লাহভীরু মানুষ তৈরী করা,
                  নৈতিক ও স্পিরিচুয়াল টার্মে সমাজকে আলোর পথে পরিচালিত করা।
                </p>
              </div>

              {/* Admission CTA Card — replaces duplicate contact */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm p-4 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-1">
                  দ্রুত লিংক
                </h3>
                <NavLink
                  to="/admission"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-600/30 hover:shadow-md hover:shadow-emerald-600/30 transition-all duration-200"
                >
                  ভর্তি আবেদন করুন
                </NavLink>
                <NavLink
                  to="/expatriateGrant"
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400 transition-all duration-200"
                >
                  <HandHeart size={14} />
                  প্রবাসী অনুদান
                </NavLink>
              </div>

              {/* Quick Contact — with Lucide Icons */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm p-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-3">
                  যোগাযোগ করুন
                </h3>
                <div className="space-y-2.5">
                  <a
                    href="mailto:jamiyahusainiya1@gmail.com"
                    className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
                  >
                    <span className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors flex-shrink-0">
                      <Mail className="w-3.5 h-3.5 text-emerald-500" />
                    </span>
                    <span className="text-xs truncate">jamiyahusainiya1@gmail.com</span>
                  </a>
                  <a
                    href="tel:+8801751699909"
                    className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
                  >
                    <span className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors flex-shrink-0">
                      <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    </span>
                    <span className="text-xs">+8801751699909</span>
                  </a>
                  <div className="flex items-start gap-2.5 text-slate-600 dark:text-slate-400">
                    <span className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    </span>
                    <span className="text-xs leading-relaxed">শায়েস্তাগঞ্জ, হবিগঞ্জ, সিলেট</span>
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