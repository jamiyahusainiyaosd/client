const Marquee = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-200/60  bg-gradient-to-r from-emerald-50 via-white to-emerald-50   ">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-emerald-50  to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-emerald-50  to-transparent z-10 pointer-events-none" />

      {/* Left label */}
      <div className="absolute left-0 inset-y-0 flex items-center z-20">
        <div className="px-4 py-0 h-full flex items-center border-r border-emerald-200/60  bg-emerald-600 ">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white whitespace-nowrap writing-mode-vertical">
            ঘোষণা
          </span>
        </div>
      </div>

      <div className="pl-20 py-3">
        <div className="marquee-track whitespace-nowrap flex items-center">
          {[
            "জামিয়া হুসাইনিয়া মাদ্রাসায় আপনাকে স্বাগতম – কুরআন, সুন্নাহ ও সলফে সালেহীনের পথে দ্বীনি তালীমের সুবাস ছড়িয়ে দিতে আমরা প্রতিশ্রুতিবদ্ধ।",
            "হিফয, নুরানী ও কিতাব বিভাগ সমূহ আছে।",
          ].map((text, idx) => (
            <span key={idx} className="inline-flex items-center gap-3 mx-8 text-sm text-slate-700 ">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              {text}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            "জামিয়া হুসাইনিয়া মাদ্রাসায় আপনাকে স্বাগতম – কুরআন, সুন্নাহ ও সলফে সালেহীনের পথে দ্বীনি তালীমের সুবাস ছড়িয়ে দিতে আমরা প্রতিশ্রুতিবদ্ধ।",
            "হিফয, নুরানী ও কিতাব বিভাগ সমূহ আছে।",
          ].map((text, idx) => (
            <span key={`dup-${idx}`} className="inline-flex items-center gap-3 mx-8 text-sm text-slate-700 ">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-slide 15s linear infinite;
        }
        @keyframes marquee-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;