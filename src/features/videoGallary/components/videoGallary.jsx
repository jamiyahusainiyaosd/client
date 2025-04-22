import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loader from "../../../components/Loader";
import { baseUrl } from "../../../constants/env.constants";

const fetchVideos = async () => {
  const response = await axios.get(`${baseUrl}/gallary/video`);
  return response.data;
};

const VideoGallary = () => {
  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = React.useState(0);

  const totalPages = videos ? Math.ceil(videos.length / itemsPerPage) : 0;
  const currentVideos = videos
    ? videos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  return (
    <section className="bg-gray-800 p-6 rounded-xl">
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      ) : isError ? (
        <div className="bg-red-900/50 text-red-300 p-4 rounded-lg text-center">
          ❌ ভিডিও লোড করতে সমস্যা হয়েছে!
        </div>
      ) : videos.length === 0 ? (
        <div className="bg-yellow-900/50 text-yellow-300 p-4 rounded-lg text-center">
          ❌ কোনো ভিডিও পাওয়া যায়নি!
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentVideos.map((video) => (
              <div
                key={video.id}
                className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-cyan-500/20"
              >
                <div className="relative aspect-video">
                  <video
                    controls
                    preload="metadata"
                    src={video.videoImg}
                    className="w-full h-full object-cover rounded-xl"
                    poster={video.thumbnail || ""}
                  >
                    আপনার ব্রাউজার ভিডিও প্লে সমর্থন করে না।
                  </video>
                </div>
                <small className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2">
                  {video.videoTitle}
                </small>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="text-gray-400">
                পৃষ্ঠা {currentPage + 1} / {totalPages}
              </div>
              <div className="flex gap-4">
                <button
                  className={`px-6 py-2 rounded-full transition-all ${
                    currentPage === 0
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-cyan-600 hover:bg-cyan-700 text-white"
                  }`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  ◀️ আগের ভিডিও
                </button>
                <button
                  className={`px-6 py-2 rounded-full transition-all ${
                    currentPage === totalPages - 1
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-cyan-600 hover:bg-cyan-700 text-white"
                  }`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                >
                  পরের ভিডিও ▶️
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default VideoGallary;
