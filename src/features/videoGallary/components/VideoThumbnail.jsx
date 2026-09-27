import { useState, useRef } from "react";

/**
 * Checks if the poster URL is a valid, real poster and not a generic mock/dummy URL
 */
const isValidPoster = (poster) => {
  if (!poster || typeof poster !== "string") return false;
  if (poster.includes("lh3.googleusercontent.com")) return false;
  if (poster === "/unnamed.jpg") return false;
  return true;
};

/**
 * Appends HTML5 media fragment #t=0.5 to extract the video frame at 0.5 seconds
 */
const getVideoSrcWithTime = (url, time = 0.5) => {
  if (!url) return "";
  if (url.includes("#t=")) return url;
  return `${url}#t=${time}`;
};

/**
 * VideoThumbnail component that displays the actual video frame as the thumbnail
 * without relying on external or confusing dummy poster images.
 */
const VideoThumbnail = ({
  videoUrl,
  poster,
  alt = "ভিডিও থাম্বনেল",
  className = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
  seekTime = 0.5
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  const hasValidCustomPoster = isValidPoster(poster);

  if (hasValidCustomPoster) {
    return (
      <img
        src={poster}
        alt={alt}
        className={`${className} ${hasLoaded ? "opacity-90" : "opacity-0 transition-opacity"}`}
        onLoad={() => setHasLoaded(true)}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Sleek placeholder shimmer while frame loads */}
      {!hasLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-900/90 animate-pulse flex items-center justify-center z-0">
          <span className="material-symbols-outlined text-slate-700 text-[36px]">videocam</span>
        </div>
      )}

      {videoUrl && !hasError ? (
        <video
          ref={videoRef}
          src={getVideoSrcWithTime(videoUrl, seekTime)}
          preload="metadata"
          muted
          playsInline
          className={`${className} pointer-events-none transition-opacity duration-300 ${
            hasLoaded ? "opacity-90" : "opacity-0"
          }`}
          onLoadedMetadata={(e) => {
            try {
              if (e.target.currentTime === 0) {
                e.target.currentTime = seekTime;
              }
            } catch {
              // ignore
            }
          }}
          onLoadedData={() => setHasLoaded(true)}
          onSeeked={() => setHasLoaded(true)}
          onError={() => {
            setHasError(true);
            setHasLoaded(true);
          }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900 p-4">
          <span className="material-symbols-outlined text-3xl mb-1 text-slate-600">videocam</span>
          <span className="text-xs text-slate-400 font-label-sm">ভিডিও প্রিভিউ</span>
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;
