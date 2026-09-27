import VideoThumbnail from "./VideoThumbnail";

const VideoGalleryCards = ({
  videos = [],
  viewMode = "grid",
  onOpenVideoModal,
  onShare,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="bg-white rounded-2xl border border-slate-200/60 p-3 shadow-xs flex flex-col gap-3">
            <div className="bg-slate-200/70 rounded-xl aspect-video w-full" />
            <div className="h-5 bg-slate-200/70 rounded-md w-3/4" />
            <div className="h-4 bg-slate-200/50 rounded-md w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-[#f1f3ff] text-primary flex items-center justify-center mx-auto mb-3 shadow-xs">
          <span className="material-symbols-outlined text-[30px]">videocam_off</span>
        </div>
        <h3 className="font-headline-sm text-lg font-bold text-slate-900">কোনো ভিডিও পাওয়া যায়নি</h3>
        <p className="text-secondary text-sm mt-1">অনুগ্রহ করে অন্য কোনো বিভাগ নির্বাচন করুন।</p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      }`}
      id="video-grid-container"
    >
      {videos.map((video) => {

        return (
          <div
            key={video.id}
            className="video-card group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            data-cat={video.category}
          >
            {/* Video Preview Frame */}
            <div>
              <div 
                className="relative w-full aspect-video bg-slate-900 overflow-hidden flex items-center justify-center cursor-pointer"
                onClick={() => onOpenVideoModal(video)}
              >
                <VideoThumbnail
                  videoUrl={video.videoUrl}
                  poster={video.poster}
                  alt={video.alt || video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none"></div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-primary font-label-sm text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">
                    {video.badgeIcon || "videocam"}
                  </span>
                  <span>{video.badgeText || "ভিডিও"}</span>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white font-label-sm text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-mono">
                  <span className="material-symbols-outlined text-[13px]">timer</span>
                  <span>{video.duration || "ভিডিও"}</span>
                </div>

                {/* Central Play Action Button */}
                <button
                  aria-label="প্লে করুন"
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary/95 transition-all cursor-pointer"
                  onClick={() => onOpenVideoModal(video)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[30px] ml-0.5">play_arrow</span>
                </button>
              </div>

              {/* Card Body */}
              <div
                className="p-4 sm:p-5 cursor-pointer"
                onClick={() => onOpenVideoModal(video)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-label-sm text-xs font-semibold">
                    {video.subBadge || "জামিয়া হুসাইনিয়া আর্কাইভ"}
                  </span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
                {video.desc && (
                  <p className="font-body-sm text-xs sm:text-sm text-secondary mt-1.5 leading-relaxed line-clamp-2">
                    {video.desc}
                  </p>
                )}
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-secondary font-label-sm text-xs">
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
                {video.location || "শায়েস্তাগঞ্জ"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="text-primary hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  onClick={() => onOpenVideoModal(video)}
                  type="button"
                >
                  ভিডিও দেখুন <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
                <button
                  className="p-1 rounded text-slate-400 hover:text-primary transition-colors cursor-pointer"
                  onClick={() => onShare && onShare(video.title)}
                  title="শেয়ার করুন"
                  type="button"
                  aria-label="শেয়ার করুন"
                >
                  <span className="material-symbols-outlined text-[16px]">share</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoGalleryCards;
