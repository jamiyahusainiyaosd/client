import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import homeService from "../services/home.services";

const FIRST_SLIDE_IMAGE = "/unnamed.png";

const ImageSlider = () => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["sliderImage"],
    queryFn: homeService.getSliderImage,
  });

  const apiSlides = useMemo(() => {
    return Array.isArray(data?.data) ? data.data : [];
  }, [data]);

  const slides = useMemo(() => {
    const firstSlide = {
      img: FIRST_SLIDE_IMAGE,
      type: "hero",
    };

    const otherSlides = apiSlides.map((item) => ({
      ...item,
      type: "default",
    }));

    return [firstSlide, ...otherSlides];
  }, [apiSlides]);

  if (isPending) {
    return (
      <section className="pt-28 pb-16 flex justify-center items-center min-h-[360px]">
        <div className="flex flex-col items-center gap-3">
          <ClockLoader color="#10B981" size={40} />
          <p className="text-xs text-slate-400">লোড হচ্ছে...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="pt-28 pb-10 flex justify-center">
        <div className="max-w-md w-full rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-center">
          <p className="text-sm text-red-600">
            স্লাইডার লোড করতে সমস্যা হয়েছে: {error?.message}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28">
      <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18)]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={slides.length > 1}
          className="jamia-swiper"
          style={{
            "--swiper-navigation-color": "#ffffff",
            "--swiper-pagination-color": "#10B981",
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[380px] sm:h-[400px] md:h-[400px] lg:h-[420px] xl:h-[460px]">
                <img
                  src={slide.img}
                  alt={
                    slide.type === "hero"
                      ? "জামিয়া হুসাইনিয়া মাদ্রাসা — মূল ক্যাম্পাস"
                      : `জামিয়া হুসাইনিয়া মাদ্রাসা — ছবি ${index}`
                  }
                  className="h-full w-full object-cover object-center bg-slate-900 dark:bg-slate-950"
                />

                {slide.type === "hero" ? (
                  <>
                    {/* Rich gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />

                    {/* Hero Content */}
                    <div className="absolute inset-0 flex items-center z-10">
                      <div className="max-w-xl px-8 sm:px-12">

                        {/* Ayah label */}
                        <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-5">
                          <span className="h-px w-6 bg-emerald-400 flex-shrink-0" />
                          কুরআনুল কারীম
                        </span>

                        {/* Main Quote — large, impactful */}
                        <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug drop-shadow-lg">
                          "হে আমার প্রতিপালক!<br />
                          জ্ঞানে আমাকে<br />
                          বৃদ্ধি দান করুন।"
                        </h2>

                        {/* Source */}
                        <p className="mt-3 text-white/70 text-xs sm:text-sm font-medium">
                          সূরা ত্বা-হা (سورة طه) · আয়াত ১১৪
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3 mt-8">
                          <NavLink
                            to="/admission"
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/50 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200"
                          >
                            ভর্তি আবেদন করুন
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </NavLink>
                          <NavLink
                            to="/about"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 transition-all duration-200"
                          >
                            আরো জানুন
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-10 pointer-events-none">
                      <div className="max-w-2xl">
                        <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold leading-snug drop-shadow">
                          কুরআন ও সুন্নাহর আলোকে সুদৃঢ় দ্বীনি শিক্ষা ও চরিত্র গঠনের বিশ্বস্ত ঠিকানা
                        </h3>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .jamia-swiper .swiper-button-next,
        .jamia-swiper .swiper-button-prev {
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          backdrop-filter: blur(8px);
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .jamia-swiper .swiper-button-next:hover,
        .jamia-swiper .swiper-button-prev:hover {
          background: rgba(255,255,255,0.28);
          transform: scale(1.05);
        }

        .jamia-swiper .swiper-button-next::after,
        .jamia-swiper .swiper-button-prev::after {
          font-size: 13px;
          font-weight: 800;
        }

        .jamia-swiper .swiper-pagination-bullet {
          opacity: 0.55;
          background: #fff;
          transition: all 0.3s;
        }

        .jamia-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
          background: #10B981;
        }
      `}</style>
    </section>
  );
};

export default ImageSlider;