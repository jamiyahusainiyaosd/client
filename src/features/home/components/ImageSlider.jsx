import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import sliderImageService from "../services/sliderImage.service";
import { ClockLoader } from "react-spinners";

const ImageSlider = () => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["sliderImage"],
    queryFn: sliderImageService.getSliderImageService,
  });

  if (isPending)
    return (
      <section className="w-full flex justify-center items-center h-[300px]">
        <ClockLoader color="#4A90E2" size={50} />
      </section>
    );

  if (isError)
    return (
      <section className="w-full flex justify-center items-center h-[300px]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-[90%] max-w-[500px] text-center shadow-md">
          <strong className="font-bold">Oops! </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </section>
    );
  console.log();
  return (
    <section className="w-full max-w-[1144px] mx-auto py-6 relative z-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full h-full"
      >
        {data?.data?.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <img
              src={image.img}
              alt={`Slide image ${index + 1}`}
              className="w-full h-[300px] object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ImageSlider;
