import { useQuery } from "@tanstack/react-query";
import { ClockLoader } from "react-spinners";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import homeService from "../services/home.services";
import { useMemo } from "react";

const ImageSlider = () => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["sliderImage"],
    queryFn: homeService.getSliderImage,
  });
  const refinedData = useMemo(() => data?.data, [data]);
  if (isPending)
    return (
      <section className="flex justify-center py-10">
        <ClockLoader color="#4A90E2" size={50} />
      </section>
    );

  if (isError)
    return (
      <section className="flex justify-center py-10">
        <div className="alert alert-error w-[90%] max-w-[500px] text-center">
          <span>Oops! {error.message}</span>
        </div>
      </section>
    );

  return (
    <section className="mt-28">
      <div className="w-full max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="custom-swiper rounded-lg"
        >
          {refinedData?.map((image, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={image.img}
                alt={`Slide image ${index + 1}`}
                className="w-full h-[300px] md:h-[350px] lg:h-[400px] shadow-2xl object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ImageSlider;
