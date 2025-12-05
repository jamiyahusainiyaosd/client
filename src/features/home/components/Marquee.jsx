const Marquee = () => {
  return (
    <div className="relative overflow-hidden rounded-full border border-emerald-100/80 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 dark:from-emerald-700 dark:via-emerald-600 dark:to-emerald-700 shadow-lg shadow-emerald-800/50 px-4 py-2.5">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/15 to-transparent pointer-events-none rounded-l-full" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/15 to-transparent pointer-events-none rounded-r-full" />

      <div className="marquee-track whitespace-nowrap flex items-center">
        <p className="text-sm sm:text-base font-medium text-emerald-50 flex items-center gap-2 mx-6">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-lg">
            ✦
          </span>
          <span>
            জামিয়া হুসাইনিয়া মাদ্রাসায় আপনাকে স্বাগতম – কুরআন, সুন্নাহ ও
            সলফে সালেহীনের পথে দ্বীনি তালীমের সুবাস ছড়িয়ে দিতে আমরা প্রতিশ্রুতিবদ্ধ।
          </span>
        </p>
        <p className="text-sm sm:text-base font-medium text-emerald-50 flex items-center gap-2 mx-6">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-lg">
            ✦
          </span>
          <span>
            হিফয, নুরানী, দাওরায়ে হাদীসসহ বিভিন্ন কোর্সে নতুন শিক্ষার্থী
            ভর্তি চলছে। বিস্তারিত জানতে ভর্তি পেইজ দেখুন।
          </span>
        </p>
      </div>

      {/* Simple CSS marquee */}
      <style>{`
        .marquee-track {
          animation: jamia-marquee 22s linear infinite;
        }
        @keyframes jamia-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
