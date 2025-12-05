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
      <section className="pt-32 pb-16 flex justify-center">
        <ClockLoader color="#10B981" size={50} />
      </section>
    );

  if (isError)
    return (
      <section className="pt-32 pb-10 flex justify-center">
        <div className="bg-red-50/90 dark:bg-red-900/40 border border-red-200 dark:border-red-600 px-5 py-4 rounded-2xl shadow-md max-w-lg w-full text-center">
          <p className="text-sm font-medium text-red-700 dark:text-red-200">
            দুঃখিত! স্লাইডার লোড করতে সমস্যা হয়েছে: {error.message}
          </p>
        </div>
      </section>
    );

  return (
    <section className="pt-32">
      <div className="relative rounded-[32px] overflow-hidden border border-emerald-100/80 dark:border-emerald-500/30 bg-gradient-to-tr from-emerald-100 via-emerald-50 to-slate-50 dark:from-emerald-950 dark:via-slate-900 dark:to-slate-950 shadow-[0_25px_80px_rgba(15,23,42,0.25)]">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-x-10 top-0 h-24 bg-gradient-to-b from-white/60 to-transparent dark:from-slate-950/80" />

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          className="custom-swiper"
          style={{
            "--swiper-navigation-color": "#10B981",
            "--swiper-pagination-color": "#10B981",
          }}
        >
          {refinedData?.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] lg:h-[420px]">
                <img
                  src={image.img}
                  alt={`Slide image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay text */}
        <div className="pointer-events-none absolute left-6 right-6 bottom-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="bg-slate-900/70 text-slate-50 rounded-2xl px-4 py-3 backdrop-blur-md max-w-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-300 font-semibold mb-1">
              Islamic Online & On-Campus Madrasah
            </p>
            <h2 className="text-lg md:text-xl font-bold leading-snug">
              কুরআন ও সুন্নাহর আলোকে সুদৃঢ় দ্বীনি শিক্ষা ও চরিত্র গঠনের
              বিশ্বস্ত ঠিকানা
            </h2>
          </div>
          <div className="hidden sm:flex gap-3">
            <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl px-4 py-2 text-xs text-slate-700 dark:text-slate-200 backdrop-blur border border-white/60 dark:border-slate-700/80">
              🌙 হিফয, কিতাব, নুরানীসহ বিভিন্ন কোর্সে ভর্তি চলছে
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
