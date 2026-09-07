import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import VideoGallaryServices from "../services/videoGallary.services";

const VideoGallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const currentPage = Math.max(1, Number(rawPage) || 1);

  useEffect(() => {
    if (!rawPage) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", "1");
          return next;
        },
        { replace: true }
      );
    }
  }, [rawPage, setSearchParams]);

  const handlePageChange = (p) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

  const { data: videosData, isLoading, isError, error } = useQuery({
    queryKey: ["videos", currentPage],
    queryFn: () => VideoGallaryServices.getAllResults(currentPage),
  });

  const videos = videosData?.results || [];
  const totalCount = videosData?.count || 0;
  const totalPages = Math.ceil(totalCount / 9);

  return (
    <div>
      {/* Loading */}
      {isLoading && <Loader />}

      {/* Error */}
      {isError && (
        <div className="rounded-lg border-l-4 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium">
          ভিডিও লোড করতে সমস্যা হয়েছে: {error?.message}
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && videos.length === 0 && (
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-12 text-center text-sm text-slate-500 shadow-sm">
          এই মুহূর্তে কোনো ভিডিও পাওয়া যায়নি।
        </div>
      )}

      {/* Video grid */}
      {!isLoading && videos.length > 0 && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:border-slate-300"
              >
                {(() => {
                  const rawUrl = video.videoImg || "";
                  let directUrl = rawUrl;
                  let isDirectVideo = false;

                  // 1. Convert Cloudinary player embed to direct MP4 URL
                  if (rawUrl.includes("player.cloudinary.com/embed/")) {
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
                  }

                  // 2. Format YouTube URL if applicable
                  let embedUrl = rawUrl;
                  if (!isDirectVideo) {
                    if (rawUrl.includes("youtube.com/watch?v=")) {
                      const videoId = rawUrl.split("v=")[1]?.split("&")[0];
                      if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    } else if (rawUrl.includes("youtu.be/")) {
                      const videoId = rawUrl.split("youtu.be/")[1]?.split("?")[0];
                      if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    }
                  }

                  return (
                    <>
                      {/* Media wrapper */}
                      <div className="relative w-full aspect-video bg-slate-900">
                        {isDirectVideo ? (
                          <video
                            controls
                            controlsList="nodownload"
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-contain bg-black"
                            src={directUrl}
                          >
                            আপনার ব্রাউজার ভিডিওটি চালাতে সক্ষম নয়।
                          </video>
                        ) : (
                          <iframe
                            src={embedUrl}
                            title={video.videoTitle}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                      </div>

                      {/* Title */}
                      <div className="p-4 border-t border-slate-100">
                        <h2 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors font-display text-bengali">
                          {video.videoTitle}
                        </h2>
                      </div>
                    </>
                  );
                })()}
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
            totalPages={totalPages}
            totalCount={totalCount}
          />
        </div>
      )}
    </div>
  );
};

export default VideoGallery;