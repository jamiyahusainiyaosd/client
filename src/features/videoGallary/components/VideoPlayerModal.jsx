import PropTypes from "prop-types";
import { useEffect } from "react";

const VideoPlayerModal = ({
  isOpen = true,
  video,
  onClose
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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

  if (isOpen === false || !video) return null;

  const rawUrl = video.videoUrl || video.videoImg || "";
  let isImage = false;
  let isDirectVideo = false;
  let isYouTube = false;
  let embedUrl = "";
  let directUrl = rawUrl;

  if (
    /\.(jpg|jpeg|png|webp|gif|avif)(\?.*)?$/i.test(rawUrl) ||
    rawUrl.includes("storage/v1/object/public/Photo%20Gallary")
  ) {
    isImage = true;
  } else if (rawUrl.includes("player.cloudinary.com/embed/")) {
    try {
      const urlObj = new URL(rawUrl);
      const cname = urlObj.searchParams.get("cloud_name");
      const pid = urlObj.searchParams.get("public_id");
      if (cname && pid) {
        directUrl = `https://res.cloudinary.com/${cname}/video/upload/${pid}.mp4`;
        isDirectVideo = true;
      }
    } catch {
      // fallback
    }
  } else if (
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(rawUrl) ||
    rawUrl.includes("storage/v1/object/public/Video%20Gallary") ||
    rawUrl.includes("storage.supabase.co")
  ) {
    isDirectVideo = true;
  } else if (rawUrl.includes("youtube.com/watch?v=")) {
    const videoId = rawUrl.split("v=")[1]?.split("&")[0];
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      isYouTube = true;
    }
  } else if (rawUrl.includes("youtu.be/")) {
    const videoId = rawUrl.split("youtu.be/")[1]?.split("?")[0];
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      isYouTube = true;
    }
  } else if (rawUrl.includes("youtube.com/embed/")) {
    embedUrl = rawUrl;
    isYouTube = true;
  }

  const toBn = (n) => String(n).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

  const categoryNameMap = {
    all: "সব ভিডিও",
    nurani: "নূরানী ও আমলি মশক",
    seminar: "বক্তব্য ও সেমিনার",
    practical: "আমলি প্রশিক্ষণ",
    general: "ক্যাম্পাস ও অন্যান্য"
  };

  const categoryLabel =
    video.badgeText ||
    categoryNameMap[video.category] ||
    video.category ||
    "ভিডিও গ্যালারি";

  const isValidPoster =
    video.poster &&
    typeof video.poster === "string" &&
    !video.poster.includes("lh3.googleusercontent.com") &&
    video.poster !== "/unnamed.jpg";

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-opacity duration-200"
      id="videoModal"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 bg-black/60 border-b border-white/10">
          <div className="flex items-center gap-2 text-white min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0"></span>
            <span className="font-label-sm text-xs sm:text-sm font-semibold text-primary truncate" id="modalCategory">
              {categoryLabel}
            </span>
            <span className="text-white/40 shrink-0">•</span>
            <span className="font-body-sm text-xs sm:text-sm text-slate-300 shrink-0" id="modalDuration">
              {toBn(video.duration || "ভিডিও")}
            </span>
          </div>
          <button
            aria-label="বন্ধ করুন"
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Player Frame */}
        <div className="relative aspect-video max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
          {isImage ? (
            <img
              src={rawUrl}
              alt={video.title}
              className="max-h-[72vh] w-auto max-w-full object-contain"
            />
          ) : isDirectVideo ? (
            <video
              key={directUrl || video.id || video.title}
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={isValidPoster ? video.poster : undefined}
              className="w-full h-full object-contain bg-black"
              src={directUrl}
            >
              আপনার ব্রাউজার ভিডিওটি চালাতে সক্ষম নয়।
            </video>
          ) : isYouTube ? (
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /* Visual Simulated Player */
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 relative">
              {isValidPoster && (
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                  alt={video.title}
                  id="modalPoster"
                  src={video.poster}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-[36px]">play_circle</span>
                </div>
                <p className="font-headline-sm text-base sm:text-lg text-white max-w-xl text-center px-4" id="modalTitle">
                  {video.title}
                </p>
                <span className="font-body-sm text-xs sm:text-sm text-slate-400">
                  শায়েস্তাগঞ্জ, হবিগঞ্জ — জামিয়া হুসাইনিয়া মিডিয়া
                </span>
              </div>

              {/* Bottom Player UI Bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
                <div className="w-full bg-white/20 h-1.5 rounded-full cursor-pointer">
                  <div className="bg-primary h-full w-1/3 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-slate-300 font-label-sm text-xs">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-white cursor-pointer">pause</span>
                    <span className="material-symbols-outlined text-[18px] text-white cursor-pointer">volume_up</span>
                    <span className="text-white">০০:৪৫ / {video.durationShort || "০২:০৩"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-white cursor-pointer">settings</span>
                    <span className="material-symbols-outlined text-[18px] text-white cursor-pointer" onClick={onClose}>
                      fullscreen
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer details */}
        <div className="p-3.5 sm:p-5 bg-black/75 border-t border-white/10 flex flex-col gap-2.5 text-slate-300 overflow-y-auto max-h-44 sm:max-h-52 scrollbar-none">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-headline-sm text-sm sm:text-base font-bold text-white leading-snug flex-1">
              {video.title}
            </h3>
            <button
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              onClick={onClose}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>ফিরে যান</span>
            </button>
          </div>
          {video.desc && (
            <p className="font-body-sm text-xs sm:text-sm text-slate-300 leading-relaxed">
              {video.desc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

VideoPlayerModal.propTypes = {
  isOpen: PropTypes.bool,
  video: PropTypes.object,
  onClose: PropTypes.func,
};

export default VideoPlayerModal;
