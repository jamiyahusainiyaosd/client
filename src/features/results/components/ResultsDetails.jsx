import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { FiArrowLeft, FiCalendar, FiDownload, FiMaximize2, FiX } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import ErrorDisplay from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import SmoothImage from "../../../components/SmoothImage";
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
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 font-display">
            {result.studentClassName}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 font-mono">
            <FiCalendar size={11} className="text-emerald-600" />
            <span>প্রকাশের তারিখ: {publishedAt}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-800 hover:bg-slate-50 transition-all self-start sm:self-auto whitespace-nowrap"
        >
          <FiArrowLeft size={14} className="text-slate-600" />
          ফিরে যান
        </button>
      </div>

      {/* Images */}
      <div className="p-5">
        {result.images?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.images.map((img, index) => (
              <div
                key={index}
                className="group relative rounded-lg border border-slate-200 bg-slate-100 overflow-hidden shadow-sm"
              >
                <SmoothImage
                  src={img.resultsSheetImg}
                  alt={`ফলাফল ${index + 1}`}
                  containerClassName="w-full h-64 sm:h-72 md:h-80 flex items-center justify-center bg-slate-100"
                  className="w-full h-full object-contain"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-slate-900/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 pointer-events-none">
                  <button
                    onClick={() => setSelectedImage(img.resultsSheetImg)}
                    className="pointer-events-auto h-10 w-10 flex items-center justify-center rounded-lg bg-white text-slate-900 shadow-sm hover:bg-slate-50 transition-all"
                    aria-label="পূর্ণ স্ক্রিন"
                  >
                    <FiMaximize2 size={15} className="text-emerald-600" />
                  </button>
                  <button
                    onClick={() => handleDownload(img.resultsSheetImg, `${result.studentClassName}_result_${index + 1}.jpg`)}
                    className="pointer-events-auto h-10 w-10 flex items-center justify-center rounded-lg bg-white text-slate-900 shadow-sm hover:bg-slate-50 transition-all"
                    aria-label="ডাউনলোড"
                  >
                    <FiDownload size={15} className="text-emerald-600" />
                  </button>
                </div>

                {/* Mobile hint */}
                <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white bg-slate-900/80 px-3 py-1 rounded-full whitespace-nowrap pointer-events-none">
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
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-11 right-0 h-9 w-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
            >
              <FiX size={16} />
            </button>
            <SmoothImage
              src={selectedImage}
              alt="ফলাফল"
              containerClassName="w-full flex items-center justify-center min-h-[350px] rounded-lg border border-slate-800 shadow-2xl bg-slate-950"
              className="w-full max-h-[82vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDetails;