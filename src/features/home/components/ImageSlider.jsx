import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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
      <section className="pt-28 pb-16 flex justify-center items-center min-h-[320px]">
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
      <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.15)]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 12000,
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
              <div className="relative w-full h-[300px] sm:h-[380px] md:h-[440px] lg:h-[500px] xl:h-[560px]">
                <img
                  src={slide.img}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                {slide.type === "hero" ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                    <div className="absolute inset-0 flex items-center z-10">
                      <div className="max-w-xl px-6 sm:px-10">
                        <h2 className="text-white font-medium text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                          “হে আমার <br />  প্রতিপালক! জ্ঞানে <br /> আমাকে বৃদ্ধি দান করুন।”
                        </h2>

                        <p className="mt-2 text-white/90 text-[11px] sm:text-xs">
                          সূরা ত্বা-হা (سورة طه), আয়াত : ১১৪
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 pointer-events-none">
                      <div className="max-w-2xl">
                        <h3 className="text-white text-base sm:text-sm md:text-md leading-snug">
                          কুরআন ও সুন্নাহর আলোকে সুদৃঢ় দ্বীনি শিক্ষা ও চরিত্র
                          গঠনের বিশ্বস্ত ঠিকানা
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
          width: 40px;
          height: 40px;
        }

        .jamia-swiper .swiper-button-next:hover,
        .jamia-swiper .swiper-button-prev:hover {
        }

        .jamia-swiper .swiper-button-next::after,
        .jamia-swiper .swiper-button-prev::after {
          font-size: 14px;
          font-weight: 700;
        }

        .jamia-swiper .swiper-pagination-bullet {
          opacity: 1;
        }

        .jamia-swiper .swiper-pagination-bullet-active {
          width: 20px;
        }
      `}</style>
    </section>
  );
};

export default ImageSlider;