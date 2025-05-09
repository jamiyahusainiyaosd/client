import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
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
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["resultDetails", id],
    queryFn: async () => {
      const response = await ResultsServices.getOneResults(id);
      return response.data;
    },
  });

  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader size="lg" variant="pulse" />
      </div>
    );
  }

  if (isError) {
    return <Error message="ফলাফল লোড করতে সমস্যা হয়েছে!" />;
  }

  if (!result) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
        <NoDataFound message="ফলাফল খুঁজে পাওয়া যায়নি" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-36">
      <div className="text-center mb-12">
        <p className="text-gray-900 text-xl dark:text-gray-200">
          {result.studentClassName} জামাতের প্রকাশিত ফলাফলের বিস্তারিত তথ্য
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {result.studentClassName}
              </h2>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <FaCalendarAlt />
                  <span>প্রকাশ: {Time(result.resultCreatedAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <FaCalendarAlt />
                  <span>আপডেট: {Time(result.resultUpdatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
          <br />
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaArrowLeft />
            ফিরে যান
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {result.images?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.images.map((image, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => !isMobile && setHoveredImage(index)}
                  onMouseLeave={() => !isMobile && setHoveredImage(null)}
                  onClick={() =>
                    isMobile &&
                    setHoveredImage(hoveredImage === index ? null : index)
                  }
                >
                  <div className="relative">
                    <img
                      src={image.resultsSheetImg}
                      alt="ফলাফল"
                      className="w-full h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                    />

                    {/* Image Actions - Show on hover or always on mobile */}
                    {(hoveredImage === index || isMobile) && (
                      <div
                        className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-4 rounded-lg ${
                          isMobile ? "bg-black/70" : ""
                        }`}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(image.resultsSheetImg);
                          }}
                          className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
                          title="পূর্ণ স্ক্রিনে দেখুন"
                        >
                          <FaExpand />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(
                              image.resultsSheetImg,
                              `${result.studentClassName}_${index}.jpg`
                            );
                          }}
                          className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
                          title="ডাউনলোড করুন"
                        >
                          <FaDownload />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
              <NoDataFound message="কোনো ফলাফল প্রকাশ করা হয়নি" />
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full h-full flex flex-col">
            <div className="absolute top-4 right-4 flex gap-4 z-10">
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-white text-black p-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center">
              <img
                src={selectedImage}
                alt="ফলাফল"
                className="max-w-full max-h-[calc(100vh-100px)] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDetails;
