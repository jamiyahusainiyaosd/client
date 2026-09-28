import HomeIntro from "../features/home/components/HomeIntro";
import ImageSlider from "../features/home/components/ImageSlider";
import Marquee from "../features/home/components/Marquee";
import RecentNotices from "../features/home/components/RecentNotices";
import HomeQuickServices from "../features/home/components/HomeQuickServices";
import MuhtamimCard from "../features/home/components/MuhtamimCard";
import PrayerTimesCard from "../features/home/components/PrayerTimesCard";
import { AcademicCalendarCard } from "../features/calendar";
import TopAchieversCarousel from "../features/home/components/TopAchieversCarousel";
import PageTitle from "../utils/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle key={"homePage"} title={"জামিয়া হুসাইনিয়া"} />
      <main className="w-full bg-[#f1f3ff] min-h-screen">
        {/* Fullscreen Hero — Untouched */}
        <ImageSlider />

        {/* SECTION 1: QUICK SERVICES, MARQUEE, RECENT NOTICES & SIDEBAR (Background: #f1f3ff) */}
        <section className="site-section site-section-alt border-b border-slate-200/60">
          <div className="site-container">
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

              {/* Right sidebar — Respected Muhtamim Card */}
              <aside className="lg:w-80 xl:w-88 w-full space-y-6 shrink-0">
                <MuhtamimCard />
              </aside>
            </div>

            {/* Islamic Services Row: Academic Calendar on LEFT, Prayer Times on RIGHT on large screens */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              {/* Left Column: Academic Hijri Calendar */}
              <div className="w-full">
                <AcademicCalendarCard />
              </div>

              {/* Right Column: Daily Jamat Prayer Times */}
              <div className="w-full">
                <PrayerTimesCard />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: এ বছরের সেরা কৃতি শিক্ষার্থী (Dedicated Section with White Background) */}
        <section className="site-section site-section-white border-b border-slate-200/60">
          <div className="site-container">
            <TopAchieversCarousel />
          </div>
        </section>

        {/* SECTION 3: পাঠ্য কর্মসূচি, জামিয়া পরিচিতি ও মেট্রিক্স (Background: #f1f3ff) */}
        <section className="site-section site-section-alt">
          <div className="site-container">
            <HomeIntro />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
