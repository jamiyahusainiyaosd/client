import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaDownload,
  FaExpand,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import Time from "../../../utils/formateData";
import ResultsServices from "../services/results.services";

const ResultsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["resultDetails", id],
    queryFn: async () => {
      const res = await ResultsServices.getOneResults(id);
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 30,
  });

  const publishedAt = useMemo(() => {
    if (!result) return "";
    return Time(result.latest_update || result.resultCreatedAt);
  }, [result]);

  const handleDownload = async (url, fileName) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = link;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(link);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader size="lg" />
      </div>
    );
  }

  if (isError) return <Error message="ফলাফল লোড করতে সমস্যা হয়েছে!" />;

  if (!result) {
    return (
      <div className="max-w-3xl mx-auto mt-28 sm:mt-32 md:mt-36 bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 shadow-xl">
        <NoDataFound message="ফলাফল খুঁজে পাওয়া যায়নি" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20">
      {/* Title */}
      <div className="text-center mb-6 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 leading-snug mt-16 md:mt-1">
          {result.studentClassName} জামাতের প্রকাশিত ফলাফল
        </h2>
      </div>

      {/* Card */}
      <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-xl border border-emerald-100/70 dark:border-emerald-700/40 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 break-words">
                {result.studentClassName}
              </h3>

              <div className="flex items-start mt-2 gap-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                <FaCalendarAlt className="mt-[3px] shrink-0" />
                <span className="leading-snug break-words">
                  প্রকাশের তারিখ : {publishedAt}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500
              text-white hover:opacity-90 flex items-center justify-center gap-2 shadow whitespace-nowrap"
            >
              <FaArrowLeft /> ফিরে যান
            </button>
          </div>
        </div>

        {/* Images */}
        <div className="p-4 sm:p-6">
          {result.images?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {result.images.map((img, index) => (
                <div
                  key={index}
                  className="relative group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-950/20 overflow-hidden"
                >
                  {/* Image */}
                  <img
                    src={img.resultsSheetImg}
                    alt="ফলাফল"
                    className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-contain"
                    loading="lazy"
                  />

                  {/* Overlay (✅ mobile: always visible, desktop: on hover) */}
                  <div
                    className="
                      absolute inset-0 flex items-center justify-center gap-4
                      bg-black/45
                      opacity-100 md:opacity-0 md:group-hover:opacity-100
                      transition-all
                    "
                  >
                    <button
                      className="bg-white text-slate-900 p-3 sm:p-3.5 rounded-full shadow hover:bg-gray-100 active:scale-95 transition"
                      onClick={() => setSelectedImage(img.resultsSheetImg)}
                      aria-label="Zoom"
                      type="button"
                    >
                      <FaExpand />
                    </button>

                    <button
                      className="bg-white text-slate-900 p-3 sm:p-3.5 rounded-full shadow hover:bg-gray-100 active:scale-95 transition"
                      onClick={() =>
                        handleDownload(
                          img.resultsSheetImg,
                          `${result.studentClassName}_result_${index + 1}.jpg`
                        )
                      }
                      aria-label="Download"
                      type="button"
                    >
                      <FaDownload />
                    </button>
                  </div>

                  {/* Hint text (only on mobile) */}
                  <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-white/90 bg-black/40 px-3 py-1 rounded-full">
                    জুম / ডাউনলোড
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoDataFound message="কোনো ফলাফল প্রকাশ করা হয়নি" />
          )}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white text-black p-3 rounded-full shadow active:scale-95 transition"
            aria-label="Close"
            type="button"
          >
            <FaTimes size={20} />
          </button>

          <img
            src={selectedImage}
            alt="ফলাফল"
            className="max-w-full max-h-[78vh] sm:max-h-[85vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ResultsDetails;
