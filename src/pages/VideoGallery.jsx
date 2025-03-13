import { useEffect, useState } from "react";
import { baseUrl } from "../constants/env.constants";
import PageTitle from "../utils/PageTitle";

const VideoGallery = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`${baseUrl}/gallary/video`);
                if (!response.ok) {
                    throw new Error("Server Error: " + response.status);
                }
                const data = await response.json();
                console.log("Fetched videos:", data);
                setVideos(data);
            } catch (error) {
                console.error("ভিডিও লোড করতে সমস্যা হয়েছে:", error);
                setError("ভিডিও লোড করতে সমস্যা হয়েছে!");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const totalPages = Math.ceil(videos.length / itemsPerPage);
    const currentvideos = videos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <>
            <PageTitle title="Video Gallery" />
            <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
                <h1 className="text-2xl font-bold text-center mb-8">অত্র জামিয়ার ভিডিও গ্যালারি</h1>
                {loading ? (
                    <div className="mt-20 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                            <circle cx="50" cy="50" r="45" stroke="#3498db" strokeWidth="5" fill="none" />
                            <circle cx="50" cy="50" r="45" stroke="#2ecc71" strokeWidth="5" fill="none" strokeDasharray="283" strokeDashoffset="75" transform="rotate(-90 50 50)" className="animate-spin" />
                        </svg>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : videos.length === 0 ? (
                    <p className="text-center text-red-500">❌ কোনো ভিডিও পাওয়া যায়নি!</p>
                ) : (
                    <div className="p-6 border rounded-lg shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {currentvideos.map((video) => (
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

                        {/* Pagination */}
                        <div className="flex justify-center mt-6">
                            <button className={`px-4 py-2 mx-2 rounded-lg ${currentPage === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white`} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>◀️ আগের ভিডিও</button>
                            <button className={`px-4 py-2 button1 mx-2 rounded-lg ${currentPage === totalPages - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white`} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>পরের ভিডিও ▶️</button>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default VideoGallery;