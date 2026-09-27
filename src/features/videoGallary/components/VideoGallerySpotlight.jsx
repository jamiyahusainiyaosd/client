import VideoThumbnail from "./VideoThumbnail";

const VideoGallerySpotlight = ({
  spotlightVideo,
  onOpenVideoModal,
  onShare
}) => {
  const defaultVideo = {
    title: "মাসআলার আলোকে দুই রাকাআত নামাজের প্রদর্শনী, নূরানী বিভাগের ছাত্রদের।",
    duration: "০৬:১৬ মিনিট",
    durationShort: "০৬:১৬",
    progress: "০২:৩২ / ০৬:১৬",
    category: "নূরানী ও আমলি মশক",
    department: "নূরানী ও মক্তব বিভাগ",
    year: "২০২৬-২৭ শিক্ষাবর্ষ",
    desc: "নূরানী বিভাগের কোমলমতি শিক্ষার্থীরা সম্মানিত উস্তাদবৃন্দের উপস্থিতিতে সিজদা, রুকু, তাকবীরে তাহরিমা এবং ক্বওমার বিশুদ্ধ সুন্নতি নিয়ম অক্ষরে অক্ষরে প্রদর্শন করছে। ছোটবেলা থেকেই সুন্নাহভিত্তিক সালাতের আমলি প্রশিক্ষণ।",
    branch: "নূরানী কিরাত ও মশক",
    location: "মাদ্রাসা মিলনায়তন",
    resolution: "1080p Full HD",
    poster: null,
    videoUrl: "https://ynmfshvkhnqclpcaxrae.supabase.co/storage/v1/object/public/Video%20Gallary/videos/20260907_034110_da960df2a9.mp4"
  };

  const video = spotlightVideo
    ? {
        ...defaultVideo,
        ...spotlightVideo,
        poster: spotlightVideo.poster || spotlightVideo.videoPoster || null,
        videoUrl: spotlightVideo.videoUrl || spotlightVideo.videoImg || defaultVideo.videoUrl,
        title: spotlightVideo.title || spotlightVideo.videoTitle || defaultVideo.title,
      }
    : defaultVideo;

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-[#f1f3ff] border border-slate-200/80 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xs">
          {/* Video Frame Left (7 cols) */}
          <div
            className="lg:col-span-7 relative group rounded-2xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center cursor-pointer shadow-md"
            onClick={() => onOpenVideoModal(video)}
          >
            <VideoThumbnail
              videoUrl={video.videoUrl}
              poster={video.poster}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none"></div>

            {/* Live Duration Pill */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span className="font-label-sm text-xs font-semibold">ফিচার্ড ভিডিও</span>
            </div>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white font-label-sm text-xs flex items-center gap-1 font-mono">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>{video.durationShort || "০৬:১৬"}</span>
            </div>

            {/* Central Play Action Button */}
            <button
              aria-label="ভিডিও প্লে করুন"
              className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[36px] ml-1">play_arrow</span>
            </button>

            {/* Bottom Track Decoration */}
            <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-1.5">
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-2/5"></div>
              </div>
              <div className="flex items-center justify-between text-slate-300 font-label-sm text-xs">
                <span>{video.progress || "আমলি সালাত মশক"}</span>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                </span>
              </div>
            </div>
          </div>

          {/* Editorial Content Right (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full py-1">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-label-sm text-xs font-bold shadow-xs">
                  {video.department || video.badgeText || "নূরানী ও আমলি মশক"}
                </span>
                <span className="text-secondary font-label-sm text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">calendar_today</span>
                  {video.year || "চলতি শিক্ষাবর্ষ"}
                </span>
              </div>
              <h2 className="font-headline-lg text-xl sm:text-2xl lg:text-3xl text-on-surface font-bold leading-tight mb-3">
                {video.title}
              </h2>
              <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed mb-4">
                {video.desc}
              </p>
            </div>

            {/* Meta tags & Action Buttons */}
            <div className="pt-2 border-t border-slate-200/70">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1.5 rounded-xl bg-white text-primary border border-slate-200/70 font-label-sm text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                  <span className="material-symbols-outlined text-[16px]">verified</span> {video.branch || "নূরানী বিভাগ"}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white text-primary border border-slate-200/70 font-label-sm text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                  <span className="material-symbols-outlined text-[16px]">location_on</span> {video.location || "শায়েস্তাগঞ্জ"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="flex-1 bg-primary text-white hover:bg-primary/90 px-5 py-2.5 rounded-xl font-headline-sm text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  onClick={() => onOpenVideoModal(video)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">play_circle</span>
                  <span>ভিডিওটি দেখুন</span>
                </button>
                <button
                  className="bg-white text-slate-700 hover:text-primary border border-slate-200/80 p-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                  onClick={() => onShare && onShare(video.title)}
                  title="লিংক কপি করুন"
                  type="button"
                  aria-label="শেয়ার করুন"
                >
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGallerySpotlight;
