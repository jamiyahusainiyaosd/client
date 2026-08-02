const FIRST_SLIDE_IMAGE = "/unnamed3.jpg";

const ImageSlider = () => {
  return (
    <section className="relative w-full pt-[90px] sm:pt-[96px] overflow-hidden bg-watt-bg">
      <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[540px] xl:h-[580px]">
        <img
          src={FIRST_SLIDE_IMAGE}
          alt="জামিয়া হুসাইনিয়া মাদ্রাসা — মূল ক্যাম্পাস"
          className="h-full w-full object-cover object-right md:object-[80%_center]"
        />

        {/* Bottom smooth fade transition into page background */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-watt-bg to-transparent pointer-events-none z-10" />

        {/* Hero Content aligned inside max-w-7xl */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xs sm:max-w-xl md:max-w-2xl">
              {/* Ayah label */}
              <span className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-emerald-800 mb-2 sm:mb-4">
                <span className="h-px w-4 sm:w-6 bg-emerald-800 flex-shrink-0" />
                কুরআনুল কারীম
              </span>

              {/* Main Quote */}
              <h2 className="text-slate-900 font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-tight font-display">
                "হে আমার প্রতিপালক! <br className="hidden sm:inline" />
                জ্ঞানে আমাকে <br className="hidden sm:inline" />
                বৃদ্ধি দান করুন।"
              </h2>

              {/* Source */}
              <p className="mt-2 sm:mt-4 text-slate-700 text-xs sm:text-sm font-semibold font-sans">
                সূরা ত্বা-হা (سورة طه) · আয়াত ১১৪
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
