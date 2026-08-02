import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiCalendar, FiDownload, FiMaximize2, FiRefreshCw, FiX } from "react-icons/fi";
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
  const { data: reports, isLoading, isError } = useQuery({
    queryKey: ["financialReports"],
    queryFn: fetchFinancialReports,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedReport, setExpandedReport] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Body scroll lock when modal open
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedImage]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorDisplay errorMessage="ডেটা লোড করতে সমস্যা হয়েছে!" />;

  if (!reports?.length)
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-12 text-center shadow-sm">
        <p className="text-sm font-medium text-slate-700 font-display">
          কোনো প্রতিবেদন প্রকাশ করা হয়নি
        </p>
        <p className="mt-1 text-xs text-slate-500 font-sans">
          ভবিষ্যতে নতুন প্রতিবেদন যুক্ত হলে এখানে প্রদর্শিত হবে
        </p>
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-300 ${expandedReport === report.id ? "md:col-span-2" : ""
              }`}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 line-clamp-1 font-display">
                  {report.finanicialReportName}
                </h3>
                <div className="flex items-center flex-wrap gap-3 mt-1.5 text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={11} className="text-emerald-600" />
                    {Time(report.finanicialReportCreate)}
                  </span>
                  {report.finanicialReportCreate !== report.finanicialReportUpdate && (
                    <span className="flex items-center gap-1">
                      <FiRefreshCw size={11} className="text-emerald-600" />
                      {Time(report.finanicialReportUpdate)}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() =>
                  setExpandedReport(expandedReport === report.id ? null : report.id)
                }
                className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                aria-label="বিস্তারিত দেখুন"
              >
                <FiMaximize2 size={13} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              {/* Description */}
              <p className={`text-sm text-slate-600 leading-relaxed text-bengali ${expandedReport === report.id ? "" : "line-clamp-3"
                }`}>
                {report.finanicialReportDescription}
              </p>

              {/* Image */}
              <div className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={report.finanicialReportImage}
                  alt={report.finanicialReportName}
                  className="w-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(report.finanicialReportImage)}
                />

                {/* Desktop hover overlay */}
                {!isMobile && (
                  <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedImage(report.finanicialReportImage)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-sm font-medium text-slate-900 shadow-sm"
                    >
                      <FiMaximize2 size={14} className="text-emerald-600" />
                      পূর্ণ স্ক্রিনে দেখুন
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile expand button */}
              {isMobile && (
                <button
                  onClick={() => setSelectedImage(report.finanicialReportImage)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <FiMaximize2 size={13} className="text-emerald-600" />
                  পূর্ণ স্ক্রিনে দেখুন
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 pb-5">
              <button
                onClick={() =>
                  handleDownload(
                    report.finanicialReportImage,
                    `${report.finanicialReportName}.jpg`
                  )
                }
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-950 text-white text-sm font-medium transition-all"
              >
                <FiDownload size={14} className="text-emerald-400" />
                ডাউনলোড
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-11 right-0 h-9 w-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
              aria-label="বন্ধ করুন"
            >
              <FiX size={16} />
            </button>

            <img
              src={selectedImage}
              alt="পূর্ণ প্রতিবেদন"
              className="w-full max-h-[82vh] object-contain rounded-lg border border-slate-800 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialReport;