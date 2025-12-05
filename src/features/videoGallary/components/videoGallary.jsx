// src/features/videoGallary/components/videoGallary.jsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import VideoGallaryServices from "../services/videoGallary.services";

const VideoGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: videosData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["videos", currentPage],
    queryFn: () => VideoGallaryServices.getAllResults(currentPage),
  });

  const videos = videosData?.results || [];
  const totalCount = videosData?.count || 0;
  const totalPages = Math.ceil(totalCount / 9);

  return (
    <div className="rounded-3xl border border-emerald-100/70 bg-white/90 dark:bg-slate-900/90 dark:border-emerald-500/30 shadow-xl shadow-emerald-900/10 p-6 md:p-8">
      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-24">
          <Loader />
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="px-4 py-4 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-200 border-l-4 border-red-500 dark:border-red-400 rounded-xl shadow">
          ❌ ভিডিও লোড করতে সমস্যা হয়েছে!
          <br />
          <span className="text-sm">{error?.message}</span>
        </div>
      )}

      {/* No Videos */}
      {!isLoading && videos.length === 0 && (
        <div className="px-4 py-4 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-200 border-l-4 border-yellow-500 dark:border-yellow-400 rounded-xl shadow">
          ❌ কোনো ভিডিও পাওয়া যায়নি!
        </div>
      )}

      {/* Video Cards */}
      {!isLoading && videos.length > 0 && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="rounded-3xl overflow-hidden bg-white/80 dark:bg-slate-800/70 border border-emerald-100 dark:border-emerald-700/50 shadow-md hover:shadow-emerald-600/40 transition-all duration-300 p-5 group"
              >
                {/* Video Frame */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-emerald-900/10 border border-emerald-100 dark:border-emerald-600/40">
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white bg-emerald-600 px-3 py-1 rounded-full text-xs shadow-lg">
                      ▶ প্লে
                    </span>
                  </div>

                  <iframe
                    src={video.videoImg}
                    title={video.videoTitle}
                    className="w-full h-64 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Title */}
                <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-all">
                  {video.videoTitle}
                </h2>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              totalCount={totalCount}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
