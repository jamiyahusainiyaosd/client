import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../../constants/env.constants";
import FinancialReportCard from "./FinancialReportCard";
import AuditReportSheet from "./AuditReportSheet";
import ProfitLossStatementSheet from "./ProfitLossStatementSheet";
import Loader from "../../../components/Loader";
const fetchFinancialReports = async () => {
  try {
    const response = await axios.get(`${baseUrl}/financialReport`);
    return response.data;
  } catch {
    return null;
  }
};

const toBn = (n) => String(n).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

const getDynamicAcademicSession = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextYearShort = String(currentYear + 1).slice(-2);
  return `${toBn(currentYear)}-${toBn(nextYearShort)}`;
};

const AllFinancialReports = ({ academicSession }) => {
  const [modalDocument, setModalDocument] = useState(null);
  const session = academicSession || getDynamicAcademicSession();

  // Fetch live reports from API
  const { data: apiReports, isLoading } = useQuery({
    queryKey: ["financialReports"],
    queryFn: fetchFinancialReports,
    staleTime: 1000 * 60 * 5,
  });

  // Pure dynamic reports from API
  const reportsList = useMemo(() => {
    const raw = Array.isArray(apiReports)
      ? apiReports
      : apiReports?.results || apiReports?.data || [];

    if (!raw || raw.length === 0) {
      return [];
    }

    return raw.map((item, index) => ({
      id: item.id || `report-${index + 1}`,
      title: item.finanicialReportName || "বার্ষিক আর্থিক বিবরণী",
      description: item.finanicialReportDescription || "প্রতিষ্ঠানের আয়-ব্যয় ও অডিট সংক্রান্ত প্রামাণ্য হিসাব বিবরণী।",
      created_at: item.finanicialReportCreate || "",
      finanicialReportImage: item.finanicialReportImage || null,
      report_type: "document_image",
    }));
  }, [apiReports]);


  // Handle download
  const handleDownload = (report) => {
    if (report.finanicialReportImage) {
      const a = document.createElement("a");
      a.href = report.finanicialReportImage;
      a.download = `${report.title || "আর্থিক-রিপোর্ট"}.jpg`;
      a.target = "_blank";
      a.click();
      return;
    }

    // Print or trigger browser print preview for high fidelity
    window.print();
  };

  return (
    <div className="w-full">
      {/* Hero Section (Background: #f1f3ff) */}
      <section className="w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start max-w-3xl">
            {/* Breadcrumb & Eyebrow Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                স্বচ্ছ আর্থিক ব্যবস্থাপনা
              </span>
              <span className="text-secondary text-body-sm">•</span>
              <span className="text-secondary text-body-sm font-medium">আমানতদারিতা, অডিট ও হিসাবের বিবরণী</span>
            </div>

            {/* Heading & Subtitle */}
            <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[1.3] text-on-surface font-bold tracking-tight mb-3">
              জামিয়া হুসাইনিয়ার <span className="text-primary">স্বচ্ছ আর্থিক বিবরণী ও অডিট রিপোর্ট</span>
            </h1>
            <p className="font-body-lg text-sm sm:text-base lg:text-lg text-secondary leading-relaxed max-w-3xl">
              প্রতিষ্ঠান বিনির্মাণ, ছাত্রকল্যাণ তহবিল, বার্ষিক অডিট ও আয়-ব্যয়ের পুঙ্খানুপুঙ্খ হিসাব — শতভাগ স্বচ্ছতা, জবাবদিহিতা ও আমানতদারিতার সাথে উন্মুক্ত উপস্থাপনা।
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[22px] sm:text-[26px]">account_balance</span>
              </div>
              <div>
                <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">
                  {reportsList.length > 0 ? `${toBn(reportsList.length)}টি` : "সংরক্ষিত"}
                </span>
                <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">সংরক্ষিত মূল বিবরণী</span>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[22px] sm:text-[26px]">verified</span>
              </div>
              <div>
                <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">১০০%</span>
                <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">স্বচ্ছতা ও জবাবদিহিতা</span>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[22px] sm:text-[26px]">assignment_turned_in</span>
              </div>
              <div>
                <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">নিরীক্ষিত</span>
                <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">সনদপ্রাপ্ত হিসাববিদ দ্বারা</span>
              </div>
            </div>

            {/* Stat 4: Dynamic Academic Year */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3.5 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[22px] sm:text-[26px]">history_edu</span>
              </div>
              <div>
                <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">{session}</span>
                <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">চলতি শিক্ষাবর্ষ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Section (Background: White) */}
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="w-full py-12 flex items-center justify-center">
              <Loader />
            </div>
          ) : reportsList.length === 0 ? (
            <div className="w-full py-16 text-center">
              <div className="max-w-md mx-auto bg-[#f1f3ff] p-8 rounded-2xl border border-slate-200/80">
                <span className="material-symbols-outlined text-5xl text-slate-300 mb-2">account_balance</span>
                <h3 className="text-lg font-bold text-slate-800 mb-1">কোনো প্রতিবেদন পাওয়া যায়নি</h3>
                <p className="text-slate-500 text-xs sm:text-sm">বর্তমানে কোনো অডিট রিপোর্ট বা আর্থিক বিবরণী প্রকাশিত নেই।</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" data-purpose="financial-document-grid">
              {reportsList.map((report) => (
                <FinancialReportCard
                  key={report.id}
                  report={report}
                  onViewFullDocument={(doc) => setModalDocument(doc)}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Full Document Modal */}
      {modalDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setModalDocument(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full p-6 my-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  {modalDocument.title || modalDocument.finanicialReportName}
                </h3>
                <span className="text-xs text-secondary font-sans">
                  {modalDocument.created_at || "২০ সেপ্টেম্বর, ২০২৬"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalDocument(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                aria-label="বন্ধ করুন"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="overflow-y-auto py-4 flex-1">
              {modalDocument.finanicialReportImage ? (
                <img
                  src={modalDocument.finanicialReportImage}
                  alt={modalDocument.title}
                  className="w-full h-auto object-contain rounded-xl"
                />
              ) : modalDocument.report_type === "profit_loss" ||
                modalDocument.id === "report-2" ? (
                <ProfitLossStatementSheet
                  meta={modalDocument.meta}
                  isModal={true}
                />
              ) : (
                <AuditReportSheet meta={modalDocument.meta} isModal={true} />
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleDownload(modalDocument)}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>প্রিন্ট / ডাউনলোড করুন</span>
              </button>
              <button
                type="button"
                onClick={() => setModalDocument(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AllFinancialReports.propTypes = {
  academicSession: PropTypes.string,
};

export default AllFinancialReports;
