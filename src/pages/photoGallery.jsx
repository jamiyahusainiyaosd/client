import { useEffect, useState } from "react";
import { baseUrl } from "../constants/env.constants";
import PageTitle from "../utils/PageTitle";

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`${baseUrl}/gallary/photo`);
                if (!response.ok) {
                    throw new Error("Server Error: " + response.status);
                }
                const data = await response.json();
                console.log("Fetched Photos:", data);
                setPhotos(data);
            } catch (error) {
                console.error("ফটো লোড করতে সমস্যা হয়েছে:", error);
                setError("ফটো লোড করতে সমস্যা হয়েছে!");
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    const totalPages = Math.ceil(photos.length / itemsPerPage);
    const currentPhotos = photos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <>
            <PageTitle title="Photo Gallery" />
            <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
                <h1 className="text-2xl font-bold text-center mb-8">অত্র জামিয়ার ফটো গ্যালারি</h1>
                {loading ? (
                    <div className="mt-20 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                            <circle cx="50" cy="50" r="45" stroke="#3498db" strokeWidth="5" fill="none" />
                            <circle cx="50" cy="50" r="45" stroke="#2ecc71" strokeWidth="5" fill="none" strokeDasharray="283" strokeDashoffset="75" transform="rotate(-90 50 50)" className="animate-spin" />
                        </svg>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : photos.length === 0 ? (
                    <p className="text-center text-red-500">❌ কোনো ছবি পাওয়া যায়নি!</p>
                ) : (
                    <div className="p-6 border rounded-lg shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {currentPhotos.map((photo) => (
                                <div key={photo.id} className="overflow-hidden rounded-lg shadow-lg relative cursor-pointer" onClick={() => setSelectedPhotoId(photo.id)}>
                                    <img src={photo.photoImg} alt={photo.photoTitle} className="w-full h-[15rem] rounded-lg transition-transform hover:scale-105" />
                                    <small className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2">
                                        {photo.photoTitle}
                                    </small>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-6">
                            <button className={`px-4 py-2 mx-2 rounded-lg ${currentPage === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white`} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>◀️ আগের ছবি</button>
                            <button className={`px-4 py-2 button1 mx-2 rounded-lg ${currentPage === totalPages - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white`} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>পরের ছবি ▶️</button>
                        </div>
                    </div>
                )}
            </section>

            {/* Modal for Fullscreen Image */}
            {selectedPhotoId && <PhotoDetails photoId={selectedPhotoId} onClose={() => setSelectedPhotoId(null)} />}
        </>
    );
};

const PhotoDetails = ({ photoId, onClose }) => {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhotoDetails = async () => {
            try {
                const response = await fetch(`${baseUrl}/gallary/photo/${photoId}`);
                if (!response.ok) {
                    throw new Error("Error fetching details");
                }
                const data = await response.json();
                setPhoto(data);
            } catch (error) {
                console.error("Error fetching photo details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPhotoDetails();
    }, [photoId]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative max-w-3xl w-full p-4 rounded-lg shadow-lg">
                <a className="absolute top-4 right-4 text-4xl font-bold text-black cursor-pointer" onClick={onClose}>✖</a>
                {loading ? (
                    <div className="mt-28 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                            <circle cx="50" cy="50" r="45" stroke="#3498db" strokeWidth="5" fill="none" />
                            <circle cx="50" cy="50" r="45" stroke="#2ecc71" strokeWidth="5" fill="none" strokeDasharray="283" strokeDashoffset="75" transform="rotate(-90 50 50)" className="animate-spin" />
                        </svg>
                    </div>
                ) : photo ? (
                    <>
                        <img src={photo.photoImg} alt={photo.photoTitle} className="w-full rounded-lg shadow-2xl" />
                    </>
                ) : (
                    <p className="text-center text-red-500">ছবি লোড করতে সমস্যা হয়েছে</p>
                )}
            </div>
        </div>
    );
};

export default PhotoGallery;