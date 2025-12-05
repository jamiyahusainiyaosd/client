// src/features/photoGalary/components/photoGallary.jsx
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX, FiZoomIn } from "react-icons/fi";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import photoGallaryService from "../services/photoGallary.services";

const PhotoGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [allPhotos, setAllPhotos] = useState([]);

  const {
    data: photosData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["photos", currentPage],
    queryFn: () => photoGallaryService.getAll(currentPage),
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (photosData?.results) setAllPhotos(photosData.results);
  }, [photosData]);

  const photos = photosData?.results || [];
  const totalCount = photosData?.count || 0;
  const totalPages = Math.ceil(totalCount / 9);

  const navigatePhotos = (dir) => {
    const index = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
    let newIndex = dir === "next" ? index + 1 : index - 1;
    if (newIndex >= allPhotos.length) newIndex = 0;
    if (newIndex < 0) newIndex = allPhotos.length - 1;
    setSelectedPhoto(allPhotos[newIndex]);
  };

  return (
    <div className="rounded-3xl border border-emerald-100/70 bg-white/90 dark:bg-slate-900/90 dark:border-emerald-500/30 shadow-xl shadow-emerald-900/10 p-6 md:p-8">
      {/* Loader */}
      {isLoading && (
        <div className="py-20 flex justify-center">
          <Loader />
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="px-4 py-4 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-200 rounded-xl border-l-4 border-red-600 shadow">
          ❌ ফটো লোড করতে সমস্যা হয়েছে! {error?.message}
        </div>
      )}

      {/* No photos */}
      {!isLoading && photos.length === 0 && (
        <div className="px-4 py-4 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-200 rounded-xl border-l-4 border-yellow-600 shadow">
          ❌ কোনো ছবি পাওয়া যায়নি!
        </div>
      )}

      {/* Gallery grid */}
      {!isLoading && photos.length > 0 && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="relative rounded-2xl overflow-hidden border border-emerald-100 dark:border-emerald-700/40 shadow-md hover:shadow-2xl bg-white/80 dark:bg-slate-800/80 cursor-pointer group transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.photoImg}
                    alt={photo.photoTitle}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/30 flex items-center justify-center 
                         transition-all duration-300 
                        ${
                          isMobile
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }
                        `}
                  >
                    <div className="p-3 bg-white/90 dark:bg-slate-900/90 rounded-full shadow-lg text-emerald-600 dark:text-emerald-300">
                      <FiZoomIn className="text-xl" />
                    </div>
                  </div>
                </div>

                {/* Title fade-in */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                  <h3 className="text-white text-sm font-semibold drop-shadow-lg">
                    {photo.photoTitle}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              totalCount={totalCount}
            />
          )}
        </div>
      )}

      {/* Fullscreen Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-5"
        >
          <div className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border border-emerald-200 dark:border-emerald-700">
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
              className="absolute -top-12 right-0 text-white/90 hover:text-emerald-300 transition text-3xl"
            >
              <FiX />
            </button>

            {/* Image */}
            <div className="relative max-h-[70vh] bg-black rounded-t-2xl">
              <img
                src={selectedPhoto.photoImg}
                alt={selectedPhoto.photoTitle}
                className="w-full max-h-[70vh] object-contain"
              />

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhotos("prev");
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/70 dark:bg-slate-900/60 rounded-full text-emerald-600 hover:bg-white dark:hover:bg-slate-800 transition shadow"
              >
                <FiChevronLeft className="text-xl" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhotos("next");
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/70 dark:bg-slate-900/60 rounded-full text-emerald-600 hover:bg-white dark:hover:bg-slate-800 transition shadow"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </div>

            {/* Caption */}
            <div className="bg-white dark:bg-slate-900 p-6 border-t border-emerald-100 dark:border-emerald-700">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                {selectedPhoto.photoTitle}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
