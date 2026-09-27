import PropTypes from "prop-types";

const PhotoGalleryCards = ({
  items = [],
  viewMode = "grid",
  onOpenLightbox,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div key={n} className="bg-white rounded-2xl border border-slate-200/60 p-3 shadow-xs flex flex-col gap-3">
            <div className="bg-slate-200/70 rounded-xl aspect-[4/3] w-full" />
            <div className="h-5 bg-slate-200/70 rounded-md w-3/4" />
            <div className="h-4 bg-slate-200/50 rounded-md w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-[#f1f3ff] text-primary flex items-center justify-center mx-auto mb-3 shadow-xs">
          <span className="material-symbols-outlined text-[30px]">image_not_supported</span>
        </div>
        <h3 className="font-headline-sm text-lg font-bold text-slate-900">কোনো ছবি পাওয়া যায়নি</h3>
        <p className="text-secondary text-sm mt-1">অনুগ্রহ করে অন্য কোনো বিভাগ নির্বাচন করুন।</p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-5 sm:gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2"
      }`}
      id="gallery-grid"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="gallery-item group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          data-category={item.category}
        >
          {/* Card Top: Image & Badge */}
          <div>
            <div
              className="relative overflow-hidden aspect-[4/3] bg-slate-100 cursor-pointer"
              onClick={() => onOpenLightbox && onOpenLightbox(item.id)}
            >
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={item.alt || item.title}
                src={item.image || "/unnamed.jpg"}
                onError={(e) => {
                  e.currentTarget.src = "/unnamed.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <button
                  className="w-10 h-10 rounded-xl bg-white text-primary flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLightbox && onOpenLightbox(item.id);
                  }}
                  type="button"
                  aria-label="বড় করে দেখুন"
                >
                  <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                </button>
              </div>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-primary font-label-sm text-xs font-bold shadow-xs pointer-events-none whitespace-nowrap">
                {item.badge}
              </span>
            </div>

            {/* Card Body */}
            <div
              className="p-4 sm:p-5 cursor-pointer"
              onClick={() => onOpenLightbox && onOpenLightbox(item.id)}
            >
              <h3 className="font-headline-sm text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              {item.desc && (
                <p className="font-body-sm text-xs sm:text-sm text-secondary mt-1.5 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              )}
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-secondary font-label-sm text-xs">
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <span className="material-symbols-outlined text-[16px] text-primary">{item.icon || "photo_camera"}</span>
              {item.tag || "প্রাঙ্গণ দৃশ্য"}
            </span>
            <button
              className="text-primary hover:underline flex items-center gap-1 cursor-pointer font-bold"
              onClick={() => onOpenLightbox && onOpenLightbox(item.id)}
              type="button"
            >
              বড় করে দেখুন <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

PhotoGalleryCards.propTypes = {
  items: PropTypes.array,
  viewMode: PropTypes.string,
  onOpenLightbox: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default PhotoGalleryCards;
