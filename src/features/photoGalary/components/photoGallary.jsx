import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader";
import { baseUrl } from "../../../constants/env.constants";

const fetchPhotos = async () => {
    const response = await axios.get(`${baseUrl}/gallary/photo`);
    return response.data;
};

const PhotoGallary = () => {
    const { data: photos, isLoading, isError } = useQuery({
        queryKey: ["photos"],
        queryFn: fetchPhotos,
    });

    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = photos ? Math.ceil(photos.length / itemsPerPage) : 0;
    const currentPhotos = photos ? photos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];

    return (
        <section>
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <p className="text-center text-red-500">❌ ফটো লোড করতে সমস্যা হয়েছে!</p>
            ) : photos.length === 0 ? (
                <p className="text-center text-red-500">❌ কোনো ছবি পাওয়া যায়নি!</p>
            ) : (
                <div className="p-6 border rounded-lg shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {currentPhotos.map((photo) => (
                            <div
                                key={photo.id}
                                className="overflow-hidden rounded-lg shadow-lg relative cursor-pointer"
                                onClick={() => setSelectedPhoto(photo)}
                            >
                                <img
                                    src={photo.photoImg}
                                    alt={photo.photoTitle}
                                    className="w-full h-[15rem] rounded-lg transition-transform hover:scale-105"
                                />
                                <small className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2">
                                    {photo.photoTitle}
                                </small>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            className={`px-4 py-2 mx-2 rounded-lg ${
                                currentPage === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                            } text-white`}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            ◀️ আগের ছবি
                        </button>
                        <button
                            className={`px-4 button1 py-2 mx-2 rounded-lg ${
                                currentPage === totalPages - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                            } text-white`}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                        >
                            পরের ছবি ▶️
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for viewing full-size image */}
            {selectedPhoto && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="relative p-4 rounded-lg shadow-lg">
                        <a
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-700"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            ❌
                        </a>
                        <img src={selectedPhoto.photoImg} alt={selectedPhoto.photoTitle} className="max-w-full max-h-[80vh] rounded-lg" />
                    </div>
                </div>
            )}
        </section>
    );
};

export default PhotoGallary;