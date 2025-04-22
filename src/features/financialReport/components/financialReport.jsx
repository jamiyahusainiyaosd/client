import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";
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

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-900/50 text-red-300 p-4 rounded-lg text-center">
        ডাটা লোড করতে সমস্যা হয়েছে!
      </div>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="bg-yellow-900/50 text-yellow-300 p-4 rounded-lg text-center text-xl">
        কোনো প্রতিবেদন প্রকাশ করা হয়নি।
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 hover:border-cyan-400 transition-all duration-300"
        >
          <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
            {report.finanicialReportName}
          </h3>

          <p className="text-gray-300 mb-4 leading-relaxed">
            {report.finanicialReportDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">🗓️</span>
              <span>প্রকাশের তারিখ: {Time(report.finanicialReportCreate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">🗓️</span>
              <span>আপডেটের তারিখ: {Time(report.finanicialReportUpdate)}</span>
            </div>
          </div>

          <div className="mt-6">
            <img
              className="w-full max-w-lg rounded-lg cursor-pointer shadow-md hover:shadow-cyan-400/20 transition-shadow"
              src={report.finanicialReportImage}
              alt={report.finanicialReportName}
              onClick={() => setSelectedImage(report.finanicialReportImage)}
            />
          </div>

          <div className="mt-6">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              onClick={() =>
                handleDownload(
                  report.finanicialReportImage,
                  `${report.finanicialReportName}.jpg`
                )
              }
            >
              <FaDownload /> প্রতিবেদন ডাউনলোড করুন
            </button>
          </div>
        </div>
      ))}

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImage}
              alt="প্রতিবেদন"
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialReport;
