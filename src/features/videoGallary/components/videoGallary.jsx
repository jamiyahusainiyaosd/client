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
    const { data: videos, isLoading, isError } = useQuery({
        queryKey: ["videos"],
        queryFn: fetchVideos,
    });

    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = React.useState(0);

    const totalPages = videos ? Math.ceil(videos.length / itemsPerPage) : 0;
    const currentVideos = videos ? videos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];

    return (
        <section>
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <p className="text-center text-red-500">❌ ভিডিও লোড করতে সমস্যা হয়েছে!</p>
            ) : videos.length === 0 ? (
                <p className="text-center text-red-500">❌ কোনো ভিডিও পাওয়া যায়নি!</p>
            ) : (
                <div className="p-6 border rounded-lg shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {currentVideos.map((video) => (
                            <div key={video.id} className="overflow-hidden rounded-lg shadow-lg relative cursor-pointer">
                                <video controls preload="metadata" src={video.videoImg} className="w-full h-[15rem] rounded-lg transition-transform hover:scale-105">
                                    আপনার ব্রাউজার ভিডিও প্লে সমর্থন করে না।
                                </video>
                                <small className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2">
                                    {video.videoTitle}
                                </small>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            className={`px-4 py-2 mx-2 rounded-lg ${currentPage === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white`}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            ◀️ আগের ভিডিও
                        </button>
                        <button
                            className={`px-4 py-2 button1 mx-2 rounded-lg ${currentPage === totalPages - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white`}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                        >
                            পরের ভিডিও ▶️
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default VideoGallary;