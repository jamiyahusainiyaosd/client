import Authorities from "../features/home/components/Authorities";
import HomeIntro from "../features/home/components/HomeIntro";
import ImageSlider from "../features/home/components/ImageSlider";
import Marquee from "../features/home/components/Marquee";
import RecentNotices from "../features/home/components/RecentNotices";
import PageTitle from "../utils/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle key={"homePage"} title={"জামিয়া হুসাইনিয়া"} />
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-16 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero slider */}
          <ImageSlider />

          {/* Marquee */}
          <div className="mt-6 mb-10">
            <Marquee />
          </div>

          {/* Main two-column layout */}
          <section className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {/* Left column */}
            <div className="lg:w-2/3 space-y-10">
              <RecentNotices />
              <HomeIntro />
            </div>

            {/* Right column – principal & info */}
            <aside className="lg:w-1/3 space-y-6">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-emerald-400/70 via-emerald-300/40 to-transparent rounded-3xl blur opacity-60" />
                <div className="relative bg-white/90 dark:bg-slate-900/90 rounded-3xl border border-emerald-100/80 dark:border-emerald-500/40 shadow-xl shadow-emerald-900/10 px-6 py-7">
                  <h2 className="text-xl font-bold text-center mb-6 text-slate-900 dark:text-slate-50 tracking-tight">
                    প্রিন্সিপাল মহোদয়
                  </h2>
                  <Authorities />
                </div>
              </div>

              <div className="bg-emerald-600/95 text-emerald-50 rounded-3xl px-6 py-5 shadow-xl shadow-emerald-900/40">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xl">
                    ☪
                  </span>
                  আমাদের লক্ষ্য
                </h3>
                <p className="text-sm leading-relaxed opacity-95">
                  কুরআন ও সুন্নাহভিত্তিক খাঁটি দ্বীনি শিক্ষার মাধ্যমে আদর্শ
                  আলেম ও আল্লাহভীরু মানুষ তৈরী করা, নৈতিক ও স্পিরিচুয়াল
                  টার্মে সমাজকে আলোর পথে পরিচালিত করা।
                </p>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
