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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ImageSlider />
        
        <div className="my-8">
          <Marquee />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 my-10">
          <div className="lg:w-2/3 space-y-10">
            <RecentNotices />
            <HomeIntro />
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white relative pb-2 after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-1 after:bg-blue-500 dark:after:bg-blue-400 after:rounded-full">
                প্রিন্সিপাল
              </h2>
              <Authorities />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;