import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaDownload, FaExpand, FaInfoCircle, FaTimes } from "react-icons/fa";
import { FiCalendar, FiRefreshCw } from "react-icons/fi";
import Error from "../../../components/Error";
import Loader from "../../../components/Loader";
import { baseUrl } from "../../../constants/env.constants";
import Time from "../../../utils/formateData";

const fetchFinancialReports = async () => {
  const response = await axios.get(`${baseUrl}/financialReport`);
  return response.data;
};

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

const FinancialReport = () => {
  const {
    data: reports,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["financialReports"],
    queryFn: fetchFinancialReports,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedReport, setExpandedReport] = useState(null);
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

  const filteredReports = reports?.filter((report) => {
    if (activeTab === "all") return true;
    return report.category === activeTab;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" variant="pulse" />
      </div>
    );
  }

  if (isError) {
    return <Error message="ডাটা লোড করতে সমস্যা হয়েছে!" />;
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <FaInfoCircle className="text-2xl text-gray-500 dark:text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
          কোনো প্রতিবেদন প্রকাশ করা হয়নি
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          নতুন প্রতিবেদন প্রকাশিত হলে এখানে দেখানো হবে
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex space-x-2">
          {["all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {tab === "all" && "সকল প্রতিবেদন"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports?.map((report) => (
          <div
            key={report.id}
            className={`bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
              expandedReport === report.id ? "md:col-span-2" : ""
            }`}
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                  {report.finanicialReportName}
                </h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FiCalendar className="mr-1" />
                    {Time(report.finanicialReportCreate)}
                  </span>
                  {report.finanicialReportUpdate !==
                    report.finanicialReportCreate && (
                    <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiRefreshCw className="mr-1" />
                      {Time(report.finanicialReportUpdate)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() =>
                  setExpandedReport(
                    expandedReport === report.id ? null : report.id
                  )
                }
                className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                aria-label={
                  expandedReport === report.id ? "Collapse" : "Expand"
                }
              >
                <FaExpand />
              </button>
            </div>

            <div className="p-5">
              <p
                className={`text-gray-700 dark:text-gray-300 mb-4 ${
                  expandedReport === report.id ? "" : "line-clamp-3"
                }`}
              >
                {report.finanicialReportDescription}
              </p>

              <div className="relative group">
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end p-4">
                    <button
                      onClick={() =>
                        setSelectedImage(report.finanicialReportImage)
                      }
                      className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm flex items-center transition-all"
                    >
                      পূর্ণ স্ক্রিনে দেখুন
                    </button>
                  </div>
                )}
                <img
                  className="w-full h-auto rounded-lg cursor-zoom-in border border-gray-200 dark:border-gray-700"
                  src={report.finanicialReportImage}
                  alt={report.finanicialReportName}
                  onClick={() => setSelectedImage(report.finanicialReportImage)}
                />
                {isMobile && (
                  <button
                    onClick={() =>
                      setSelectedImage(report.finanicialReportImage)
                    }
                    className="mt-2 w-full py-2 bg-black/80 text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <FaExpand /> পূর্ণ স্ক্রিনে দেখুন
                  </button>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
                onClick={() =>
                  handleDownload(
                    report.finanicialReportImage,
                    `${report.finanicialReportName}.jpg`
                  )
                }
              >
                <FaDownload /> ডাউনলোড
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Close"
            >
              <FaTimes size={24} />
            </button>
            <img
              src={selectedImage}
              alt="প্রতিবেদন"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialReport;
