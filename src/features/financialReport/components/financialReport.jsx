// src/features/financialReport/components/financialReport.jsx
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
    a.click();
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
  const [expandedReport, setExpandedReport] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isLoading)
    return (
      <div className="py-20 flex justify-center">
        <Loader size="lg" />
      </div>
    );

  if (isError) return <Error message="ডেটা লোড করতে সমস্যা হয়েছে!" />;

  if (!reports?.length)
    return (
      <div className="text-center py-14">
        <div
          className="inline-flex h-16 w-16 items-center justify-center rounded-full
        bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 mb-4"
        >
          <FaInfoCircle className="text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
          কোনো প্রতিবেদন প্রকাশ করা হয়নি
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ভবিষ্যতে নতুন প্রতিবেদন যুক্ত হলে এখানে প্রদর্শিত হবে
        </p>
      </div>
    );

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`rounded-3xl border border-emerald-100/70 dark:border-emerald-600/40 
              bg-white/90 dark:bg-slate-900/90 shadow-md shadow-emerald-900/10 
              hover:shadow-emerald-600/40 transition-all duration-300 overflow-hidden ${
                expandedReport === report.id ? "md:col-span-2" : ""
              }`}
          >
            {/* Header */}
            <div className="p-6 border-b border-emerald-100 dark:border-emerald-700 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 line-clamp-1">
                  {report.finanicialReportName}
                </h3>

                {/* Date Info */}
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center">
                    <FiCalendar className="mr-1" />
                    {Time(report.finanicialReportCreate)}
                  </span>

                  {report.finanicialReportCreate !==
                    report.finanicialReportUpdate && (
                    <span className="flex items-center">
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
                className="p-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-300 transition"
              >
                <FaExpand />
              </button>
            </div>

            {/* Description */}
            <div className="p-6">
              <p
                className={`text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed ${
                  expandedReport === report.id ? "" : "line-clamp-3"
                }`}
              >
                {report.finanicialReportDescription}
              </p>

              {/* Image */}
              <div className="relative group rounded-2xl overflow-hidden border border-emerald-100 dark:border-emerald-700">
                {!isMobile && (
                  <div
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                  transition-all flex items-end p-4"
                  >
                    <button
                      onClick={() =>
                        setSelectedImage(report.finanicialReportImage)
                      }
                      className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white text-sm"
                    >
                      পূর্ণ স্ক্রিনে দেখুন
                    </button>
                  </div>
                )}

                <img
                  src={report.finanicialReportImage}
                  alt="Report"
                  className="w-full rounded-2xl cursor-pointer"
                  onClick={() => setSelectedImage(report.finanicialReportImage)}
                />

                {isMobile && (
                  <button
                    onClick={() =>
                      setSelectedImage(report.finanicialReportImage)
                    }
                    className="mt-3 w-full py-2 bg-emerald-600 text-white rounded-lg"
                  >
                    পূর্ণ স্ক্রিনে দেখুন
                  </button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-emerald-100 dark:border-emerald-700 flex justify-end">
              <button
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 
                text-white rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
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

      {/* Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-emerald-300 transition"
            >
              <FaTimes />
            </button>

            <img
              src={selectedImage}
              alt="Full view"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialReport;
