import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import { baseUrl } from "../../../constants/env.constants";
import { FiPlay } from "react-icons/fi";

const fetchVideos = async () => {
  const response = await axios.get(`${baseUrl}/gallary/video`);
  return response.data;
};

const VideoGallery = () => {
  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const itemsPerPage = 4;

  const totalPages = videos ? Math.ceil(videos.length / itemsPerPage) : 0;
  const currentVideos = videos
    ? videos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : isError ? (
        <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 p-4 rounded-lg">
          ❌ ভিডিও লোড করতে সমস্যা হয়েছে!
        </div>
      ) : videos?.length === 0 ? (
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-400 text-yellow-700 dark:text-yellow-300 p-4 rounded-lg">
          ❌ কোনো ভিডিও পাওয়া যায়নি!
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentVideos.map((video) => (
              <div
                key={video.id}
                className="group relative overflow-hidden rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="aspect-video relative">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg text-blue-500 dark:text-blue-400 transform group-hover:scale-110 transition-transform duration-300">
                      <FiPlay className="text-xl" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {video.videoTitle}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              items={videos}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
      )}

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-4xl">
            <button
              className="absolute -top-12 right-0 text-white hover:text-blue-500 dark:hover:text-blue-400 text-2xl transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVideo(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="aspect-video w-full">
                <video
                  controls
                  autoPlay
                  className="w-full h-full"
                  poster={selectedVideo.thumbnail || ""}
                >
                  <source src={selectedVideo.videoImg} type="video/mp4" />
                  আপনার ব্রাউজার ভিডিও প্লে সমর্থন করে না।
                </video>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedVideo.videoTitle}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
