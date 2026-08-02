import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import VideoGallaryServices from "../services/videoGallary.services";

const VideoGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
                {/* iframe wrapper */}
                <div className="relative w-full aspect-video bg-slate-900">
                  <iframe
                    src={video.videoImg}
                    title={video.videoTitle}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Title */}
                <div className="p-4 border-t border-slate-100">
                  <h2 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors font-display text-bengali">
                    {video.videoTitle}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalCount={totalCount}
          />
        </div>
      )}
    </div>
  );
};

export default VideoGallery;