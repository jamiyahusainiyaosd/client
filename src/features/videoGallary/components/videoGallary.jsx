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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : isError ? (
        <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 p-4 rounded-lg">
          ❌ ভিডিও লোড করতে সমস্যা হয়েছে!
          <br />
          <span className="text-sm">
            {error?.response?.data?.message || error?.message}
          </span>
        </div>
      ) : videos.length === 0 ? (
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-400 text-yellow-700 dark:text-yellow-300 p-4 rounded-lg">
          ❌ কোনো ভিডিও পাওয়া যায়নি!
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="border border-gray-200 dark:border-slate-500 p-4 bg-white dark:bg-slate-600 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg"
              >
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    src={video.videoImg}
                    title={video.videoTitle}
                    className="w-full h-64 rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                  {video.videoTitle}
                </h2>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default VideoGallery;