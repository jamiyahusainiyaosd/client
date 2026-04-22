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
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40 px-4 py-12 text-center">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          কোনো প্রতিবেদন প্রকাশ করা হয়নি
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          ভবিষ্যতে নতুন প্রতিবেদন যুক্ত হলে এখানে প্রদর্শিত হবে
        </p>
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm overflow-hidden transition-all duration-300 ${expandedReport === report.id ? "md:col-span-2" : ""
              }`}
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-700/60 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                  {report.finanicialReportName}
                </h3>
                <div className="flex items-center flex-wrap gap-3 mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={11} />
                    {Time(report.finanicialReportCreate)}
                  </span>
                  {report.finanicialReportCreate !== report.finanicialReportUpdate && (
                    <span className="flex items-center gap-1">
                      <FiRefreshCw size={11} />
                      {Time(report.finanicialReportUpdate)}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() =>
                  setExpandedReport(expandedReport === report.id ? null : report.id)
                }
                className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
                aria-label="বিস্তারিত দেখুন"
              >
                <FiMaximize2 size={13} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              {/* Description */}
              <p className={`text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${expandedReport === report.id ? "" : "line-clamp-3"
                }`}>
                {report.finanicialReportDescription}
              </p>

              {/* Image */}
              <div className="relative group rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-700/60 bg-slate-100 dark:bg-slate-900/40">
                <img
                  src={report.finanicialReportImage}
                  alt={report.finanicialReportName}
                  className="w-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(report.finanicialReportImage)}
                />

                {/* Desktop hover overlay */}
                {!isMobile && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedImage(report.finanicialReportImage)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 text-sm font-medium text-slate-800 dark:text-slate-200 shadow-lg"
                    >
                      <FiMaximize2 size={14} />
                      পূর্ণ স্ক্রিনে দেখুন
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile expand button */}
              {isMobile && (
                <button
                  onClick={() => setSelectedImage(report.finanicialReportImage)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <FiMaximize2 size={13} />
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
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium shadow-sm shadow-emerald-600/30 transition-all"
              >
                <FiDownload size={14} />
                ডাউনলোড
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-11 right-0 h-9 w-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
              aria-label="বন্ধ করুন"
            >
              <FiX size={16} />
            </button>

            <img
              src={selectedImage}
              alt="পূর্ণ প্রতিবেদন"
              className="w-full max-h-[82vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialReport;