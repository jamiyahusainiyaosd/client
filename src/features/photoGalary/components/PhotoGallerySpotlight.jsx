const PhotoGallerySpotlight = ({ onOpenLightbox, spotlightItem }) => {
  const defaultSpotlight = {
    id: 0,
    title: "জামিয়া হুসাইনিয়া প্রাঙ্গণ ও তোরণ",
    desc: "প্রাকৃতিক ছায়াঘেরা শান্ত পরিবেশ, সুউচ্চ বৃক্ষরাজি ও ঐতিহ্যবাহী স্থাপত্যের স্নিগ্ধ সমারোহে মুখরিত এই প্রাঙ্গণ ছাত্রদের মনোযোগ ও ইলমী তরক্কির জন্য পরম সহায়ক।",
    badge: "ঐতিহাসিক স্মারক",
    tag: "শায়েস্তাগঞ্জ নতুনব্রিজ",
    image: "https://ynmfshvkhnqclpcaxrae.supabase.co/storage/v1/object/public/Photo%20Gallary/photos/20260907_030036_402fae4cdf.jpg",
  };

  const item = spotlightItem || defaultSpotlight;

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-[#f1f3ff] border border-slate-200/80 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xs">
          {/* Left Column: Image with zoom action */}
          <div
            className="lg:col-span-7 relative group overflow-hidden rounded-2xl bg-slate-900 aspect-[16/10] sm:aspect-[16/10] shadow-xs cursor-pointer"
            onClick={() => onOpenLightbox && onOpenLightbox(item.id)}
          >
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt={item.title || "জামিয়া হুসাইনিয়া মাদ্রাসা"}
              src={item.image || item.photoImg || "/unnamed.jpg"}
              onError={(e) => {
                e.currentTarget.src = "/unnamed.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                <span className="px-3 py-1 bg-primary text-white rounded-full font-label-sm text-xs font-semibold shadow-xs whitespace-nowrap shrink-0">
                  {item.badge || "ফিচার্ড ফটো"}
                </span>
                <span className="font-headline-sm text-sm sm:text-base font-bold truncate text-white min-w-0">
                  {item.title}
                </span>
              </div>
              <button
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md hover:bg-primary text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
                onClick={() => onOpenLightbox && onOpenLightbox(item.id)}
                type="button"
                aria-label="বড় করে দেখুন"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
            </div>
          </div>

          {/* Right Column: Narrative & Highlights */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs font-bold">
                ফিচার্ড অ্যালবাম
              </span>
              <span className="text-secondary font-label-sm text-xs">• শায়েস্তাগঞ্জ নতুনব্রিজ সংলগ্ন</span>
            </div>
            <h2 className="font-headline-lg text-xl sm:text-2xl lg:text-3xl text-on-surface font-bold leading-tight">
              {item.title || "মনোরম সবুজ ক্যাম্পাস ও ইলমী পরিবেশ"}
            </h2>
            <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed">
              {item.desc || "শায়েস্তাগঞ্জের ঐতিহ্যবাহী দ্বীনি বিদ্যাপীঠ জামিয়া হুসাইনিয়া। প্রাকৃতিক ছায়াঘেরা শান্ত পরিবেশ, সুউচ্চ বৃক্ষরাজি ও সুন্নতি তালিমের স্নিগ্ধ সমারোহে মুখরিত এই প্রাঙ্গণ ছাত্রদের আত্মশুদ্ধির জন্য পরম সহায়ক।"}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1.5 rounded-xl bg-white text-primary border border-slate-200/70 font-label-sm text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs">
                <span className="material-symbols-outlined text-[16px]">park</span> প্রাকৃতিক আঙিনা
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white text-primary border border-slate-200/70 font-label-sm text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs">
                <span className="material-symbols-outlined text-[16px]">menu_book</span> দ্বীনী তালীম
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white text-primary border border-slate-200/70 font-label-sm text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs">
                <span className="material-symbols-outlined text-[16px]">history_edu</span> ঐতিহাসিক স্থাপনা
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallerySpotlight;
