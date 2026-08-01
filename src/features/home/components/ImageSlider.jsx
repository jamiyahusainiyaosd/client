const FIRST_SLIDE_IMAGE = "/unnamed.png";

const ImageSlider = () => {
  return (
    <section className="pt-28">
      <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18)]">
        <div className="relative w-full h-[380px] sm:h-[400px] md:h-[400px] lg:h-[420px] xl:h-[460px]">
          <img
            src={FIRST_SLIDE_IMAGE}
            alt="জামিয়া হুসাইনিয়া মাদ্রাসা — মূল ক্যাম্পাস"
            className="h-full w-full object-cover object-center bg-slate-900"
          />

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
                "হে আমার প্রতিপালক!
                <br />
                জ্ঞানে আমাকে
                <br />
                বৃদ্ধি দান করুন।"
              </h2>

              {/* Source */}
              <p className="mt-3 text-white/70 text-xs sm:text-sm font-medium">
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
