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
            {/* Left */}
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
                    প্রিন্সিপাল মহোদয়
                  </h2>
                </div>
                <div className="p-3">
                  <Authorities />
                </div>
              </div>

              {/* Mission card */}
              <div className="rounded-2xl overflow-hidden border border-emerald-200/60 dark:border-emerald-800/40 bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-800 dark:to-emerald-900 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-7 w-7 flex items-center justify-center rounded-lg bg-white/15 text-base">
                    ☪
                  </span>
                  <h3 className="text-sm font-bold text-white">আমাদের লক্ষ্য</h3>
                </div>
                <p className="text-xs text-emerald-50/90 leading-relaxed">
                  কুরআন ও সুন্নাহভিত্তিক খাঁটি দ্বীনি শিক্ষার মাধ্যমে আদর্শ আলেম ও আল্লাহভীরু মানুষ তৈরী করা,
                  নৈতিক ও স্পিরিচুয়াল টার্মে সমাজকে আলোর পথে পরিচালিত করা।
                </p>
              </div>

              {/* Quick info */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm p-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-3">
                  দ্রুত যোগাযোগ
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="text-emerald-500">📧</span>
                    <span className="text-xs">jamiyahusainiya1@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="text-emerald-500">📞</span>
                    <span className="text-xs">+8801751699909</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="text-emerald-500">📍</span>
                    <span className="text-xs">শায়েস্তাগঞ্জ, হবিগঞ্জ</span>
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