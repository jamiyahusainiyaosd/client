import { useState, useRef, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ResultsServices from "../services/results.services";
import Time from "../../../utils/formateData";
import {
  toBengaliDigits,
  getIconForResultClass,
  getCategoryLabel,
  getResultDetailsMetadata,
} from "../utils/resultsUtils";
import { getAcademicYear } from "../../../utils/academicYear";
import Loader from "../../../components/Loader";

const ResultsDetails = () => {
  const { id } = useParams();

  const [currentZoom, setCurrentZoom] = useState(1);
  const [copied, setCopied] = useState(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  const canvasRef = useRef(null);

  // Fetch single result from API
  const { data: apiResponse, isLoading: isDetailLoading } = useQuery({
    queryKey: ["resultDetails", id],
    queryFn: async () => {
      try {
        const res = await ResultsServices.getOneResults(id);
        return res?.data;
      } catch {
        return null;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  // Also query results list in case backend provides data via list
  const { data: listResponse, isLoading: isListLoading } = useQuery({
    queryKey: ["resultsList"],
    queryFn: async () => {
      try {
        const res = await ResultsServices.getAllResults(1);
        return res?.data;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const apiData = useMemo(() => {
    if (
      apiResponse &&
      (apiResponse.studentClassName || apiResponse.data?.studentClassName)
    ) {
      return apiResponse.data || apiResponse;
    }
    const list =
      listResponse?.results ||
      listResponse?.data ||
      (Array.isArray(listResponse) ? listResponse : []);
    return list.find((r) => String(r.id) === String(id)) || null;
  }, [apiResponse, listResponse, id]);

  const isLoading =
    (isDetailLoading && isListLoading) ||
    (!apiData && (isDetailLoading || isListLoading));

  // Compute dynamic metadata purely from API data
  const item = useMemo(() => {
    if (!apiData) return null;
    const className = apiData.studentClassName || "";
    const classDescription =
      apiData.studentClassDescription || apiData.description || "";

    const dynamicMeta = getResultDetailsMetadata(className, classDescription);

    const formattedDate =
      apiData.resultCreatedAt || apiData.latest_update
        ? Time(apiData.latest_update || apiData.resultCreatedAt)
        : "সম্প্রতি প্রকাশিত";

    return {
      ...dynamicMeta,
      ...apiData,
      id: apiData.id,
      studentClassName: className,
      studentClassDescription: classDescription || dynamicMeta.description,
      examSession: apiData.exam_session || dynamicMeta.examSession,
      academicYear: apiData.academic_year || getAcademicYear(),
      board: apiData.board_name || dynamicMeta.board,
      totalStudents: apiData.total_students
        ? String(apiData.total_students)
        : dynamicMeta.totalStudents,
      passedStudents: apiData.passed_students
        ? String(apiData.passed_students)
        : dynamicMeta.passedStudents,
      passRate: apiData.pass_rate || dynamicMeta.passRate,
      passDetail: apiData.grade_detail || dynamicMeta.passDetail,
      certificateStatus:
        apiData.certificate_status || dynamicMeta.certificateStatus,
      helpline: apiData.helpline || "+880 1751 699909",
      publishDate: formattedDate,
      images: apiData.images || [],
      marksheetImg:
        apiData.images?.[0]?.resultsSheetImg ||
        apiData.resultsSheetImg ||
        apiData.images?.[0] ||
        null,
    };
  }, [apiData]);

  // Image list extraction
  const imageList = useMemo(() => {
    if (item.images && item.images.length > 0) {
      return item.images
        .map((img) => (typeof img === "string" ? img : img.resultsSheetImg))
        .filter(Boolean);
    }
    if (item.marksheetImg) {
      return [item.marksheetImg];
    }
    return [];
  }, [item]);

  const activeImageSrc = imageList[selectedImgIndex] || item.marksheetImg || "";

  // Zoom handlers
  const handleZoomIn = () => {
    if (currentZoom < 1.6) {
      setCurrentZoom((prev) => Math.min(1.6, Number((prev + 0.15).toFixed(2))));
    }
  };

  const handleZoomOut = () => {
    if (currentZoom > 0.7) {
      setCurrentZoom((prev) => Math.max(0.7, Number((prev - 0.15).toFixed(2))));
    }
  };

  const handleResetZoom = () => {
    setCurrentZoom(1);
  };

  // Fullscreen toggle
  const handleFullscreen = () => {
    if (!document.fullscreenElement && canvasRef.current) {
      canvasRef.current.requestFullscreen?.().catch(() => { });
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  };

  // Share handler
  const getMarksheetShareText = () => {
    if (!item) return "";
    return `📜 অফিসিয়াল একাডেমিক মার্কশীট — জামিয়া হুসাইনিয়া
══════════════════════════════════
🎓 জামাত/শ্রেণি: ${item.studentClassName}
📅 সেশন/পরীক্ষা: ${item.examSession || "বার্ষিক পরীক্ষা"}
🏫 বোর্ড: ${item.board || "বাংলাদেশ কওমি মাদ্রাসা শিক্ষাবোর্ড"}
📊 ফলাফল বিবরণী: মোট ${toBengaliDigits(item.totalStudents)} জন পরীক্ষার্থীর মধ্যে ${toBengaliDigits(item.passedStudents)} জন সফল (পাসের হার: ${toBengaliDigits(item.passRate)})
🔒 ডিজিটাল ট্র্যাকিং আইডি: JH-2026-${String(item.id || "001").slice(0, 8)}
══════════════════════════════════

🔗 অনলাইন অফিশিয়াল মার্কশীট লিঙ্ক: ${window.location.href}`;
  };

  const handleShare = async () => {
    const shareText = getMarksheetShareText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.studentClassName} ফলাফল — জামিয়া হুসাইনিয়া মাদ্রাসা`,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // fallback
      }
    }
  };

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // Download handler
  const handleDownload = async (url, filename) => {
    if (!url) {
      window.print();
      return;
    }
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename || `marksheet_${item.studentClassName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch {
      window.open(url, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-2">
            assignment_late
          </span>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            ফলাফল পাওয়া যায়নি
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            এই জামাতের ফলাফল এখনো প্রকাশিত হয়নি বা লিঙ্কটি সঠিক নয়।
          </p>
          <Link
            to="/results"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            <span>ফলাফল তালিকায় ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  const classIcon = item.icon || getIconForResultClass(item.studentClassName);
  const categoryLabel = getCategoryLabel(item.studentClassName);

  return (
    <div className="flex flex-col w-full">
      {/* Targeted Print Style: Prints ONLY the official marksheet paper card (#paperWrapper) */}
      <style>{`
        @media print {
          /* Hide all surrounding page elements */
          header, footer, nav, .no-print, [data-purpose="navbar"], [data-purpose="footer"] {
            display: none !important;
          }

          /* Hide everything in body */
          body * {
            visibility: hidden !important;
          }

          /* Unhide ONLY the official marksheet paper card and all of its content */
          #paperWrapper,
          #paperWrapper * {
            visibility: visible !important;
          }

          #paperWrapper {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 24px !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 8px !important;
            box-shadow: none !important;
            background: #ffffff !important;
            transform: none !important;
          }

          #marksheetImg {
            max-width: 100% !important;
            height: auto !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO & METRICS (#f1f3ff)                                       */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 border-b border-slate-200/70 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mb-4 sm:mb-5 flex-wrap"
          >
            <Link
              to="/"
              className="hover:text-primary transition-colors flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">
                home
              </span>
              <span>হোম</span>
            </Link>
            <span className="text-slate-400">/</span>
            <Link
              to="/results"
              className="hover:text-primary transition-colors font-medium"
            >
              ফলাফল তালিকা
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">
              {item.studentClassName}
            </span>
          </nav>

          {/* Header Row: Title & Back Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold shadow-xs mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>{categoryLabel}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {item.studentClassName}
              </h1>
            </div>

            <Link
              to="/results"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm border border-slate-200/80 transition-colors shadow-xs shrink-0 self-start sm:self-center"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              <span>ফলাফল তালিকায় ফিরে যান</span>
            </Link>
          </div>

          {/* Department Information Banner Card (Clean White) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[30px] sm:text-[34px]">
                    {classIcon}
                  </span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {item.studentClassName}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold shadow-xs">
                      {item.examSession}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs sm:text-sm text-slate-600 mt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        calendar_today
                      </span>
                      <span>প্রকাশ: {item.publishDate}</span>
                    </span>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        verified
                      </span>
                      <span>{item.board}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Actions Toolbar */}
              <div className="flex items-center gap-2.5 shrink-0 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200/80 transition-colors shadow-xs active:scale-98"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    print
                  </span>
                  <span>প্রিন্ট</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  id="shareBtn"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200/80 transition-colors shadow-xs active:scale-98"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copied ? "check" : "share"}
                  </span>
                  <span>{copied ? "কপি হয়েছে" : "শেয়ার"}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDownload(
                      activeImageSrc,
                      `marksheet_${item.studentClassName}.png`,
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs active:scale-98"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    download
                  </span>
                  <span>মার্কশীট ডাউনলোড</span>
                </button>
              </div>
            </div>
          </div>

          {/* Key Exam Statistics Grid (White Metric Cards) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  groups
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 truncate">
                  মোট পরীক্ষার্থী
                </p>
                <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  {toBengaliDigits(item.totalStudents)} জন
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                <span className="material-symbols-outlined text-[22px]">
                  check_circle
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 truncate">
                  উত্তীর্ণ ছাত্র
                </p>
                <p className="text-base sm:text-lg font-bold text-emerald-800 mt-0.5">
                  {toBengaliDigits(item.passedStudents)} জন সফল
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  percent
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 truncate">পাসের হার</p>
                <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  {toBengaliDigits(item.passRate)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
                <span className="material-symbols-outlined text-[22px]">
                  verified_user
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 truncate">সনদ স্ট্যাটাস</p>
                <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  {item.certificateStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: MAIN VIEWER & SIDEBAR (bg-white)                               */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-8 sm:py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Side: Marksheet Viewer Stage (Col 8) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden flex flex-col">
                {/* Viewer Header Toolbar */}
                <div className="bg-white px-4 sm:px-5 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 no-print">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      description
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      অফিসিয়াল একাডেমিক মার্কশীট পত্র
                    </span>
                  </div>

                  {/* Interactive Zoom / Fullscreen Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label="Zoom Out"
                      onClick={handleZoomOut}
                      id="zoomOutBtn"
                      className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 flex items-center justify-center transition-colors shadow-xs active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        zoom_out
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetZoom}
                      title="রিসেট জুম"
                      className="text-xs font-bold text-slate-700 px-2 py-1 bg-white border border-slate-200/80 rounded-lg min-w-[48px] text-center shadow-xs"
                      id="zoomLevel"
                    >
                      {toBengaliDigits(Math.round(currentZoom * 100))}%
                    </button>
                    <button
                      type="button"
                      aria-label="Zoom In"
                      onClick={handleZoomIn}
                      id="zoomInBtn"
                      className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 flex items-center justify-center transition-colors shadow-xs active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        zoom_in
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-label="Fullscreen"
                      onClick={handleFullscreen}
                      id="fullscreenBtn"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 text-xs font-semibold transition-colors shadow-xs ml-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        fullscreen
                      </span>
                      <span className="hidden sm:inline">পূর্ণস্ক্রিন</span>
                    </button>
                  </div>
                </div>

                {/* Multiple Images Selector Tabs (if API has multiple sheets) */}
                {imageList.length > 1 && (
                  <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white/60 border-b border-slate-200/70 overflow-x-auto no-print">
                    <span className="text-xs text-slate-500 font-semibold shrink-0">
                      পৃষ্ঠা নির্বাচন:
                    </span>
                    {imageList.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImgIndex(idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${selectedImgIndex === idx
                            ? "bg-primary text-white shadow-xs"
                            : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/70"
                          }`}
                      >
                        পৃষ্ঠা {toBengaliDigits(idx + 1)}
                      </button>
                    ))}
                  </div>
                )}

                {/* Marksheet Stage Canvas */}
                <div
                  ref={canvasRef}
                  className="relative bg-slate-100/70 p-4 sm:p-8 flex items-center justify-center min-h-[460px] sm:min-h-[560px] overflow-auto"
                  id="documentCanvas"
                >
                  {/* Physical Paper Mount */}
                  <div
                    style={{
                      transform: `scale(${currentZoom})`,
                      transformOrigin: "center center",
                    }}
                    className="relative bg-white rounded-xl shadow-md border border-slate-200/80 p-4 sm:p-6 transition-transform duration-200 max-w-xl w-full"
                    id="paperWrapper"
                  >
                    {/* Academic Seal Overlay Tag */}
                    <div className="absolute top-4 right-4 bg-emerald-600 text-white rounded-full px-3 py-1 text-[11px] sm:text-xs font-semibold shadow-xs flex items-center gap-1 z-10">
                      <span className="material-symbols-outlined text-[14px]">
                        verified
                      </span>
                      <span>ভেরিফাইড কপি</span>
                    </div>

                    {/* Marksheet Image or Dynamic Placeholder */}
                    {activeImageSrc ? (
                      <div className="overflow-hidden rounded-lg bg-white flex items-center justify-center border border-slate-200/70">
                        <img
                          id="marksheetImg"
                          src={activeImageSrc}
                          alt={`${item.studentClassName} অফিসিয়াল মার্কশীট`}
                          className="w-full h-auto object-contain rounded select-none shadow-xs"
                        />
                      </div>
                    ) : (
                      /* Elegant Official Placeholder when no image is uploaded in backend yet */
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50/50 flex flex-col items-center justify-center min-h-[380px]">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-[36px]">
                            history_edu
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {item.studentClassName}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm">
                          {item.examSession}
                        </p>
                        <div className="mt-4 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                          ✓ ফলাফল কেন্দ্রীয় দপ্তরে সংরক্ষিত ও অনুমোদিত
                        </div>
                        <p className="text-xs text-slate-500 mt-4 leading-relaxed max-w-md">
                          উক্ত জামাতের রেজাল্ট শীটের ডিজিটাল ইলেকট্রনিক কপি
                          বর্তমানে প্রক্রিয়াধীন রয়েছে। মূল সনদ ও গ্রেডশীটের জন্য
                          মাদ্রাসার প্রধান অফিসে সরাসরি যোগাযোগ করুন।
                        </p>
                      </div>
                    )}

                    {/* Bottom Document Watermark / Audit trail */}
                    <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-500 border-t border-slate-200/80 gap-2">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[14px] text-primary">
                          lock
                        </span>
                        <span>
                          ডিজিটাল ট্র্যাকিং আইডি:{" "}
                          <strong className="text-slate-800">
                            JH-2026-{String(item.id || "001").slice(0, 8)}
                          </strong>
                        </span>
                      </span>
                      <span className="font-semibold text-primary">
                        জামিয়া হুসাইনিয়া
                      </span>
                    </div>
                  </div>
                </div>

                {/* Marksheet Bottom Info Bar */}
                <div className="bg-white px-4 sm:px-5 py-3.5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
                  <p className="text-xs text-slate-600 text-center sm:text-left">
                    কোনো কারণে রেজাল্ট বুঝতে সমস্যা হলে বা পিডিএফ কপি পেতে নিচের
                    বাটনটি ব্যবহার করুন।
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(
                        activeImageSrc,
                        `marksheet_${item.studentClassName}.pdf`,
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs shrink-0"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      file_download
                    </span>
                    <span>পিডিএফ সংগ্রহ</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Syllabus, Grade Scale, & Office Info (Col 4) */}
            <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 no-print">
              {/* Syllabus & Subject Breakdown Card */}
              <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col gap-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/70">
                  <div className="w-8 h-8 rounded-lg bg-white text-primary flex items-center justify-center shadow-xs border border-slate-200/80">
                    <span className="material-symbols-outlined text-[18px]">
                      menu_book
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    পরীক্ষার বিষয় ও পাঠ্যক্রম
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.syllabusDesc}
                </p>

                <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 flex flex-col gap-2 mt-1 shadow-xs">
                  {item.syllabus?.map((sub, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2.5 text-xs sm:text-sm pb-1.5 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      <span
                        className="text-slate-800 font-medium whitespace-nowrap truncate"
                        title={sub.name}
                      >
                        {sub.name}
                      </span>
                      <span className="text-primary font-bold whitespace-nowrap shrink-0">
                        {sub.marks}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Grade Distribution Card */}
              <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col gap-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/70">
                  <div className="w-8 h-8 rounded-lg bg-white text-primary flex items-center justify-center shadow-xs border border-slate-200/80">
                    <span className="material-symbols-outlined text-[18px]">
                      grade
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    অফিসিয়াল গ্রেডিং স্কেল
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-xs flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-extrabold text-primary">
                        A+
                      </span>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        মুমতাজ
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 font-medium">
                      ৮০% — ১০০%
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-xs flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-extrabold text-slate-800">
                        A
                      </span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        জায়্যিদ জিদ্দান
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 font-medium">
                      ৭০% — ৭৯%
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-xs flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-extrabold text-slate-800">
                        B
                      </span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        জায়্যিদ
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 font-medium">
                      ৬০% — ৬৯%
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-xs flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-extrabold text-slate-700">
                        C
                      </span>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        মাকবুল
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 font-medium">
                      ৪০% — ৫৯%
                    </span>
                  </div>
                </div>
              </div>

              {/* Office Contact Card */}
              <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col gap-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/70">
                  <div className="w-8 h-8 rounded-lg bg-white text-primary flex items-center justify-center shadow-xs border border-slate-200/80">
                    <span className="material-symbols-outlined text-[18px]">
                      contact_support
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    পরীক্ষা দপ্তর ও অনুসন্ধান
                  </h3>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 text-xs sm:text-sm text-slate-600 leading-relaxed shadow-xs flex flex-col gap-2">
                  <p>
                    মার্কশীট যাচাই, পুনর্মূল্যায়ন বা অফিসিয়াল সত্যায়িত অনুলিপি
                    গ্রহণের জন্য মাদ্রাসার কেন্দ্রীয় পরীক্ষা নিয়ন্ত্রক অফিসে
                    সরাসরি যোগাযোগ করুন।
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-primary font-bold">
                    <span className="material-symbols-outlined text-[16px]">
                      call
                    </span>
                    <span>
                      হেল্পলাইন: {item.helpline || "+880 1751 699909"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultsDetails;
