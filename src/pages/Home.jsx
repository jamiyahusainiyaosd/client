
import Authorities from "../features/home/components/Authorities";
import HomeIntro from "../features/home/components/HomeIntro";
import ImageSlider from "../features/home/components/ImageSlider";
import Marquee from "../features/home/components/Marquee";
import RecentNotices from "../features/home/components/RecentNotices";
import PageTitle from "../utils/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle key={"homePage"} title={"Home"} />
      <section>
        <div className="max-w-[1144px] w-[95%] mx-auto">
          <ImageSlider />
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 mt-10 rounded-lg">
            <Marquee />
          </div>
          <div className="flex flex-col md:flex-row md:px-3 lg:px-0  gap-4 md:gap-8 w-full mb-5 pt-10">
            <div className="w-full border-0 md:w-[69%] md:border-2 md:border-white md:rounded-[16px]">
              <RecentNotices />
              <HomeIntro />
            </div>
            <div className="w-full md:w-[29%] h-full shadow-2xl rounded-lg p-4 space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-4">
                পরিচালক
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
