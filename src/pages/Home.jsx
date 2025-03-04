import React from "react";
import RecentNotices from "../features/home/components/RecentNotices";
import ImageSlider from "../features/home/components/ImageSlider";
import HomeIntro from "../features/home/components/HomeIntro";
import Authorities from "../features/home/components/Authorities";

const Home = () => {
  return (
    <>
      <section>
        <div className="max-w-[1144px] w-full mx-auto">
          <ImageSlider />
          <div className="flex flex-col md:flex-row md:px-3 lg:px-0  gap-4 md:gap-8 w-full mb-5">
            <div className="w-full border-0 md:w-[69%] md:border-2 md:border-white md:rounded-[16px]">
              <RecentNotices />
              <HomeIntro />
            </div>
            <div className="w-full md:w-[29%] h-full bg-white shadow-lg rounded-lg p-4 space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Our Authorities
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
