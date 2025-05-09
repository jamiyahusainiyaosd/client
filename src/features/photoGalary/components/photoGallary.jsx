import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX, FiZoomIn } from "react-icons/fi";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import { baseUrl } from "../../../constants/env.constants";

const fetchPhotos = async () => {
  const response = await axios.get(`${baseUrl}/gallary/photo`);
  return response.data;
};

const PhotoGallery = () => {
  const {
    data: photos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalPages = photos ? Math.ceil(photos.length / itemsPerPage) : 0;
  const currentPhotos = photos
    ? photos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : isError ? (
        <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 p-4 rounded-lg">
          ❌ ফটো লোড করতে সমস্যা হয়েছে!
        </div>
      ) : photos?.length === 0 ? (
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-400 text-yellow-700 dark:text-yellow-300 p-4 rounded-lg">
          ❌ কোনো ছবি পাওয়া যায়নি!
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={photo.photoImg}
                    alt={photo.photoTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/20 ${
                      isMobile
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    } transition-opacity duration-300`}
                  >
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg text-blue-500 dark:text-blue-400">
                      <FiZoomIn className="text-xl" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-medium truncate translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {photo.photoTitle}
                  </h3>
                  {photo.photoDate && (
                    <p className="text-gray-300 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {new Date(photo.photoDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              items={photos}
            />
          )}
        </div>
      )}

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              className="absolute -top-12 right-0 text-white hover:text-blue-500 dark:hover:text-blue-400 text-2xl transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              <FiX className="h-8 w-8" />
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="max-h-[70vh] overflow-auto relative">
                <img
                  src={selectedPhoto.photoImg}
                  alt={selectedPhoto.photoTitle}
                  className="w-full object-contain"
                />
                <div className="block">
                  <button
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 md:p-3 rounded-full shadow-lg text-blue-500 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = photos.findIndex(
                        (p) => p.id === selectedPhoto.id
                      );
                      if (currentIndex > 0) {
                        setSelectedPhoto(photos[currentIndex - 1]);
                      }
                    }}
                  >
                    <FiChevronLeft className="text-lg md:text-xl" />
                  </button>
                  <button
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 md:p-3 rounded-full shadow-lg text-blue-500 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = photos.findIndex(
                        (p) => p.id === selectedPhoto.id
                      );
                      if (currentIndex < photos.length - 1) {
                        setSelectedPhoto(photos[currentIndex + 1]);
                      }
                    }}
                  >
                    <FiChevronRight className="text-lg md:text-xl" />
                  </button>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedPhoto.photoTitle}
                </h3>
                {selectedPhoto.photoDate && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    তারিখ:{" "}
                    {new Date(selectedPhoto.photoDate).toLocaleDateString()}
                  </p>
                )}
                {selectedPhoto.photoDescription && (
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedPhoto.photoDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
