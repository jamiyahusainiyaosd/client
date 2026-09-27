import { useEffect } from "react";
import PropTypes from "prop-types";

const PhotoGalleryLightbox = ({
  isOpen = true,
  currentIdx = 0,
  items = [],
  images = [],
  onClose,
  onNext,
  onPrev,
}) => {
  const displayItems = items && items.length > 0 ? items : images || [];

  const toBn = (n) => String(n).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || displayItems.length === 0) return null;

  const currentItem = displayItems[currentIdx] || displayItems[0] || {};

  return (
    <div
      className="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 transition-opacity duration-200 select-none"
      id="lightbox-modal"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between text-white w-full max-w-6xl mx-auto z-10 py-2 gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-1">
          {currentItem.badge && (
            <span className="px-2.5 sm:px-3 py-1 rounded-full bg-primary text-white font-label-sm text-xs font-bold shadow-xs whitespace-nowrap shrink-0">
              {currentItem.badge}
            </span>
          )}
          <span className="font-headline-sm text-xs sm:text-base md:text-lg font-bold truncate text-white min-w-0">
            {currentItem.title || "ছবি"}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="font-label-sm text-xs sm:text-sm text-slate-300 bg-white/10 px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap shrink-0">
            ছবি {toBn(currentIdx + 1)} / {toBn(displayItems.length)}
          </span>
          <button
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer shadow-sm shrink-0"
            onClick={onClose}
            title="বন্ধ করুন"
            type="button"
            aria-label="বন্ধ করুন"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">close</span>
          </button>
        </div>
      </div>

      {/* Image Display Area with Nav Controls */}
      <div
        className="relative flex items-center justify-center w-full max-w-6xl mx-auto my-auto py-2 flex-1 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {displayItems.length > 1 && (
          <button
            className="absolute left-1 sm:left-2 md:-left-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg active:scale-90 border border-white/20"
            onClick={onPrev}
            title="আগের ছবি"
            type="button"
            aria-label="আগের ছবি"
          >
            <span className="material-symbols-outlined text-[28px]">chevron_left</span>
          </button>
        )}

        <div className="relative max-h-[75vh] sm:max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl flex items-center justify-center bg-black/50 p-1">
          <img
            key={currentItem.id || currentIdx}
            className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-full object-contain rounded-xl transition-all duration-200"
            alt={currentItem.alt || currentItem.title || "ছবি"}
            src={currentItem.image || currentItem.photoImg || "/unnamed.jpg"}
            onError={(e) => {
              e.currentTarget.src = "/unnamed.jpg";
            }}
          />
        </div>

        {displayItems.length > 1 && (
          <button
            className="absolute right-1 sm:right-2 md:-right-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg active:scale-90 border border-white/20"
            onClick={onNext}
            title="পরবর্তী ছবি"
            type="button"
            aria-label="পরবর্তী ছবি"
          >
            <span className="material-symbols-outlined text-[28px]">chevron_right</span>
          </button>
        )}
      </div>

      {/* Bottom Description Area */}
      <div
        className="w-full max-w-4xl mx-auto text-center pb-2 text-slate-300 font-body-sm text-xs sm:text-sm px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {currentItem.fullDesc || currentItem.desc || currentItem.title}
      </div>
    </div>
  );
};

PhotoGalleryLightbox.propTypes = {
  isOpen: PropTypes.bool,
  currentIdx: PropTypes.number,
  items: PropTypes.array,
  images: PropTypes.array,
  onClose: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
};

export default PhotoGalleryLightbox;
