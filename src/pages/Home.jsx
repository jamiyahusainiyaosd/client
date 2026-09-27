import HomeIntro from "../features/home/components/HomeIntro";
import ImageSlider from "../features/home/components/ImageSlider";
import Marquee from "../features/home/components/Marquee";
import RecentNotices from "../features/home/components/RecentNotices";
import HomeQuickServices from "../features/home/components/HomeQuickServices";
import MuhtamimCard from "../features/home/components/MuhtamimCard";
import PageTitle from "../utils/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle key={"homePage"} title={"জামিয়া হুসাইনিয়া"} />
      <main className="w-full bg-[#f1f3ff] min-h-screen">
        {/* Fullscreen Hero — Untouched */}
        <ImageSlider />

        {/* SECTION 1: QUICK SERVICES, MARQUEE, RECENT NOTICES & SIDEBAR (Background: #f1f3ff) */}
        <section className="w-full bg-[#f1f3ff] py-8 sm:py-12 lg:py-14 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Quick Services Navigation Grid */}
            <HomeQuickServices />

            {/* Marquee Live Announcement */}
            <div className="mb-8 sm:mb-10">
              <Marquee />
            </div>

            {/* Main layout */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
              {/* Left — Main Notices content */}
              <div className="lg:flex-1 w-full">
                <RecentNotices />
              </div>

              {/* Right sidebar */}
              <aside className="lg:w-80 xl:w-88 w-full space-y-6">
                {/* Respected Muhtamim Card */}
                <MuhtamimCard />

                {/* Mission card */}
                <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all">
                  <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2.5">
                    <div className="h-6 w-6 flex items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                      ☪
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">আমাদের লক্ষ্য ও দর্শন</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-bengali">
                      কুরআন ও সুন্নাহভিত্তিক খাঁটি দ্বীনি শিক্ষার মাধ্যমে আদর্শ
                      আলেম ও আল্লাহভীরু মানুষ তৈরি করা, এবং সমাজে ইসলামী মূল্যবোধ ও আমলের দ্যুতি ছড়িয়ে দেওয়া।
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTRO & WHY CHOOSE US (Background: white) */}
        <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HomeIntro />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
