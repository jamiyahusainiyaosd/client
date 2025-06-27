import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ClockLoader } from "react-spinners";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import homeService from "../services/home.services";

const ImageSlider = () => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["sliderImage"],
    queryFn: homeService.getSliderImage,
  });

  const refinedData = useMemo(() => {
    if (!data?.data) return [];
    return Array.isArray(data.data) ? data.data : [data.data];
  }, [data]);

  if (isPending)
    return (
      <section className="flex justify-center py-40">
        <ClockLoader color="#4FD1C5" size={50} />
      </section>
    );

  if (isError)
    return (
      <section className="flex justify-center py-10">
        <div className="bg-gradient-to-r from-red-900/50 to-red-800/30 backdrop-blur-sm p-4 rounded-xl border border-red-700/50 shadow-lg">
          <span className="text-red-100 font-medium">
            Oops! {error.message}
          </span>
        </div>
      </section>
    );

  if (refinedData.length === 0)
    return (
      <section className="flex justify-center py-10">
        <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/30 backdrop-blur-sm p-4 rounded-xl border border-blue-700/50 shadow-lg">
          <span className="text-blue-100 font-medium">
            No slider images found
          </span>
        </div>
      </section>
    );

  return (
    <section className="mt-36">
      <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="custom-swiper"
          style={{
            "--swiper-navigation-color": "#4FD1C5",
            "--swiper-pagination-color": "#4FD1C5",
          }}
        >
          {refinedData.map((image, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="relative w-full h-[350px] md:h-[350px] lg:h-[400px]">
                <img
                  src={image.img}
                  alt={`Slide image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ImageSlider;
