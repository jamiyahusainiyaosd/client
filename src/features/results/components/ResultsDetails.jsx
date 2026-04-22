import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { FiArrowLeft, FiCalendar, FiDownload, FiMaximize2, FiX } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import ErrorDisplay from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import Time from "../../../utils/formateData";
import ResultsServices from "../services/results.services";

const ResultsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: result, isLoading, isError } = useQuery({
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

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedImage]);

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

  if (isLoading) return <Loader />;
  if (isError) return <ErrorDisplay errorMessage="ফলাফল লোড করতে সমস্যা হয়েছে!" />;
  if (!result) return <NoDataFound />;

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {result.studentClassName}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400 dark:text-slate-500">
            <FiCalendar size={11} />
            <span>প্রকাশের তারিখ: {publishedAt}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-200 dark:hover:border-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all self-start sm:self-auto whitespace-nowrap"
        >
          <FiArrowLeft size={14} />
          ফিরে যান
        </button>
      </div>

      {/* Images */}
      <div className="p-5">
        {result.images?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.images.map((img, index) => (
              <div
                key={index}
                className="group relative rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/40 overflow-hidden"
              >
                <img
                  src={img.resultsSheetImg}
                  alt={`ফলাফল ${index + 1}`}
                  className="w-full h-64 sm:h-72 md:h-80 object-contain"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSelectedImage(img.resultsSheetImg)}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 shadow-lg hover:bg-white transition-all"
                    aria-label="পূর্ণ স্ক্রিন"
                  >
                    <FiMaximize2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDownload(img.resultsSheetImg, `${result.studentClassName}_result_${index + 1}.jpg`)}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 shadow-lg hover:bg-white transition-all"
                    aria-label="ডাউনলোড"
                  >
                    <FiDownload size={15} />
                  </button>
                </div>

                {/* Mobile hint */}
                <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white/80 bg-black/50 px-3 py-1 rounded-full whitespace-nowrap">
                  জুম / ডাউনলোড
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-11 right-0 h-9 w-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
            >
              <FiX size={16} />
            </button>
            <img
              src={selectedImage}
              alt="ফলাফল"
              className="w-full max-h-[82vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDetails;