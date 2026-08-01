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

  const { data: photosData, isLoading, isError, error } = useQuery({
    queryKey: ["photos", currentPage],
    queryFn: () => photoGallaryService.getAll(currentPage),
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (photosData?.results) setAllPhotos(photosData.results);
  }, [photosData]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedPhoto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedPhoto]);

  const photos = photosData?.results || [];
  const totalCount = photosData?.count || 0;
  const totalPages = Math.ceil(totalCount / 9);

  const navigatePhotos = (dir) => {
    const index = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
    let next = dir === "next" ? index + 1 : index - 1;
    if (next >= allPhotos.length) next = 0;
    if (next < 0) next = allPhotos.length - 1;
    setSelectedPhoto(allPhotos[next]);
  };

  return (
    <div>
      {/* Loader */}
      {isLoading && <Loader />}

      {/* Error */}
      {isError && (
        <div className="rounded-xl border-l-4 border-red-400 bg-red-50  px-4 py-3 text-sm text-red-600 ">
          ফটো লোড করতে সমস্যা হয়েছে: {error?.message}
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && photos.length === 0 && (
        <div className="rounded-xl border border-slate-200  bg-white/60  px-4 py-12 text-center text-sm text-slate-400 ">
          এই মুহূর্তে কোনো ছবি পাওয়া যায়নি।
        </div>
      )}

      {/* Grid */}
      {!isLoading && photos.length > 0 && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200/80  bg-slate-100  focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <img
                  src={photo.photoImg}
                  alt={photo.photoTitle}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 ${isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/90  text-emerald-600 shadow-lg">
                    <FiZoomIn size={18} />
                  </div>
                </div>

                {/* Caption bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-medium line-clamp-1">
                    {photo.photoTitle}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalCount={totalCount}
          />
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-11 right-0 h-9 w-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
              aria-label="বন্ধ করুন"
            >
              <FiX size={16} />
            </button>

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden bg-black">
              <img
                src={selectedPhoto.photoImg}
                alt={selectedPhoto.photoTitle}
                className="w-full max-h-[72vh] object-contain"
              />

              {/* Prev */}
              <button
                onClick={() => navigatePhotos("prev")}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-xl bg-black/50 hover:bg-black/70 border border-white/10 text-white transition-all"
                aria-label="আগের ছবি"
              >
                <FiChevronLeft size={18} />
              </button>

              {/* Next */}
              <button
                onClick={() => navigatePhotos("next")}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-xl bg-black/50 hover:bg-black/70 border border-white/10 text-white transition-all"
                aria-label="পরের ছবি"
              >
                <FiChevronRight size={18} />
              </button>
            </div>

            {/* Caption */}
            <div className="mt-3 px-1 flex items-center justify-between gap-4">
              <h3 className="text-sm font-medium text-white/90">
                {selectedPhoto.photoTitle}
              </h3>
              <span className="text-xs text-white/40 flex-shrink-0">
                {allPhotos.findIndex((p) => p.id === selectedPhoto.id) + 1} / {allPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;