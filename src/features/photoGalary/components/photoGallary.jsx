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
  const {
    data: photos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = photos ? Math.ceil(photos.length / itemsPerPage) : 0;
  const currentPhotos = photos
    ? photos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  return (
    <section className="bg-gray-800 p-4 rounded-xl">
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      ) : isError ? (
        <div className="bg-red-900/50 text-red-300 p-4 rounded-lg text-center">
          ❌ ফটো লোড করতে সমস্যা হয়েছে!
        </div>
      ) : photos.length === 0 ? (
        <div className="bg-yellow-900/50 text-yellow-300 p-4 rounded-lg text-center">
          ❌ কোনো ছবি পাওয়া যায়নি!
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentPhotos.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-xl shadow-lg relative group cursor-pointer transition-all duration-300 hover:shadow-cyan-500/20"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.photoImg}
                  alt={photo.photoTitle}
                  className="w-full h-64 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium text-lg truncate">
                    {photo.photoTitle}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {photo.photoDate &&
                      new Date(photo.photoDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                className={`px-6 py-2 rounded-full transition-all ${
                  currentPage === 0
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-cyan-600 hover:bg-cyan-700 text-white"
                }`}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
              >
                ◀️ আগের ছবি
              </button>
            
              <button
                className={`px-6 button1 py-2 rounded-full transition-all ${
                  currentPage === totalPages - 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-cyan-600 hover:bg-cyan-700 text-white"
                }`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                পরের ছবি ▶️
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal for viewing full-size image */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full">
            <a
              className="absolute  right-0 text-white hover:text-cyan-400 text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              ❌ বন্ধ করুন
            </a>
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
              <img
                src={selectedPhoto.photoImg}
                alt={selectedPhoto.photoTitle}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="p-4 bg-gray-900/80">
                <h3 className="text-xl font-semibold text-white">
                  {selectedPhoto.photoTitle}
                </h3>
                {selectedPhoto.photoDate && (
                  <p className="text-gray-400">
                    তারিখ:{" "}
                    {new Date(selectedPhoto.photoDate).toLocaleDateString()}
                  </p>
                )}
                {selectedPhoto.photoDescription && (
                  <p className="text-gray-300 mt-2">
                    {selectedPhoto.photoDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallary;
