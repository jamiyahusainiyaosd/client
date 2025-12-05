// src/features/results/components/ResultsDetails.jsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
  });

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

  if (isLoading)
    return (
      <div className="flex justify-center py-40">
        <Loader size="lg" />
      </div>
    );

  if (isError) return <Error message="ফলাফল লোড করতে সমস্যা হয়েছে!" />;

  if (!result)
    return (
      <div className="max-w-3xl mx-auto mt-36 bg-white/90 dark:bg-slate-900/90 rounded-2xl p-8 shadow-xl">
        <NoDataFound message="ফলাফল খুঁজে পাওয়া যায়নি" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-36 pb-20">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
          {result.studentClassName} জামাতের প্রকাশিত ফলাফল
        </h2>
      </div>

      {/* Card */}
      <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-xl border border-emerald-100/70 dark:border-emerald-700/40 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              {result.studentClassName}
            </h3>

            <div className="flex items-center mt-1 gap-2 text-slate-600 dark:text-slate-300">
              <FaCalendarAlt />
              <span>
                প্রকাশের তারিখ :{" "}
                {Time(result.latest_update || result.resultCreatedAt)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 
            text-white hover:opacity-90 flex items-center gap-2 shadow"
          >
            <FaArrowLeft /> ফিরে যান
          </button>
        </div>

        {/* Images */}
        <div className="p-6">
          {result.images?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.resultsSheetImg}
                    alt="ফলাফল"
                    className="w-full h-64 object-contain rounded-xl border border-slate-200 
                    dark:border-slate-700 shadow"
                  />

                  {/* Overlay Buttons */}
                  <div
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                    flex justify-center items-center gap-4 rounded-xl transition-all"
                  >
                    <button
                      className="bg-white text-black p-3 rounded-full shadow hover:bg-gray-100"
                      onClick={() => setSelectedImage(img.resultsSheetImg)}
                    >
                      <FaExpand />
                    </button>

                    <button
                      className="bg-white text-black p-3 rounded-full shadow hover:bg-gray-100"
                      onClick={() =>
                        handleDownload(
                          img.resultsSheetImg,
                          `${result.studentClassName}_result_${index}.jpg`
                        )
                      }
                    >
                      <FaDownload />
                    </button>
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
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 bg-white text-black p-3 rounded-full shadow"
          >
            <FaTimes size={20} />
          </button>

          <img
            src={selectedImage}
            alt="ফলাফল"
            className="max-w-full max-h-[85vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ResultsDetails;
