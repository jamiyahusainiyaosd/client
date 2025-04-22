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
      <section>
        <div className="max-w-[1200px] w-[95%] mx-auto">
          <ImageSlider />
          <div className="mt-10">
            <Marquee />
          </div>
          <div className="flex flex-col lg:flex-row gap-6 w-full my-8">
            <div className="w-full lg:w-[70%] space-y-8">
              <RecentNotices />
              <HomeIntro />
            </div>
            <div className="w-full lg:w-[30%] bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl h-fit">
              <h2 className="text-2xl font-semibold text-center mb-6 text-blue-300">
                প্রিন্সিপাল
              </h2>
              <Authorities />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;