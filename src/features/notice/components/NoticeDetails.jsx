import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import noticeService from "../services/notice.services";
import {
  getNoticeCategoryLabel,
  getNoticeIcon,
  formatNoticeDate,
} from "../utils/noticeUtils";
import Loader from "../../../components/Loader";
import { useContactSettings } from "../../contactus/hooks/useContactSettings";

// Secure Canvas Signature Component: Renders image bitmap on in-memory canvas
// DevTools DOM Inspector sees ONLY <canvas>, NO <img> tag, and NO image URL to hover/download!
const ProtectedSignature = ({ className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Load image into canvas memory
    img.src = "/signature_transparent.webp";

    img.onload = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = img.width || 1224;
      const height = img.height || 262;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };

    // Obfuscate export methods
    try {
      canvas.toDataURL = () => "";
      canvas.toBlob = () => {};
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center self-end sm:self-auto shrink-0 relative select-none mt-1 sm:mt-0"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Invisible Shield Overlay prevents DevTools element selection */}
      <div
        className="absolute inset-0 z-10 bg-transparent select-none cursor-default"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      <canvas
        ref={canvasRef}
        aria-label="অফিসিয়াল স্বাক্ষর"
        className={className}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        style={{
          WebkitUserSelect: "none",
          userSelect: "none",
          WebkitTouchCallout: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

const NoticeDetails = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const { contact } = useContactSettings();

  // Fetch single notice from API
  const { data: apiNoticeResponse, isLoading: isDetailLoading } = useQuery({
    queryKey: ["noticeDetails", id],
    queryFn: async () => {
      try {
        const res = await noticeService.getOne(id);
        return res?.data || res;
      } catch {
        return null;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  // Fetch all notices in case single notice endpoint is unavailable or for sidebar
  const { data: recentNoticesResponse, isLoading: isListLoading } = useQuery({
    queryKey: ["noticesList"],
    queryFn: async () => {
      try {
        const res = await noticeService.getAll(1);
        return res;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const rawNotice = useMemo(() => {
    if (
      apiNoticeResponse &&
      (apiNoticeResponse.title || apiNoticeResponse.data?.title)
    ) {
      return apiNoticeResponse.data || apiNoticeResponse;
    }
    const list =
      recentNoticesResponse?.results ||
      recentNoticesResponse?.data ||
      (Array.isArray(recentNoticesResponse) ? recentNoticesResponse : []);
    return list.find((n) => String(n.id) === String(id)) || null;
  }, [apiNoticeResponse, recentNoticesResponse, id]);

  const notice = useMemo(() => {
    if (!rawNotice) return null;
    return {
      ...rawNotice,
      id: rawNotice.id,
      title: rawNotice.title || "জরুরি বিজ্ঞপ্তি",
      description: rawNotice.description || "",
      created_at: rawNotice.created_at || rawNotice.noticeCreatedAt || "",
      formattedDate: formatNoticeDate(
        rawNotice.created_at || rawNotice.noticeCreatedAt,
      ),
    };
  }, [rawNotice]);

  const recentNotices = useMemo(() => {
    const list =
      recentNoticesResponse?.results ||
      recentNoticesResponse?.data ||
      (Array.isArray(recentNoticesResponse) ? recentNoticesResponse : []);
    return list.filter((n) => String(n.id) !== String(id)).slice(0, 4);
  }, [recentNoticesResponse, id]);

  const isLoading =
    (isDetailLoading && isListLoading) ||
    (!notice && (isDetailLoading || isListLoading));

  const getNoticePaperText = () => {
    if (!notice) return "";
    const description =
      notice.description ||
      "জামিয়া হুসাইনিয়া মাদ্রাসার সকল শিক্ষক, শিক্ষার্থীবৃন্দ ও অভিভাবকগণের সদয় অবগতির জন্য জানানো যাচ্ছে যে, উপরোক্ত বিষয়ে উল্লেখিত সিদ্ধান্ত অনুযায়ী সংশ্লিষ্ট সকল কার্যক্রম যথানিয়মে পরিচালিত হবে। যেকোনো প্রয়োজনে মাদ্রাসা কার্যালয়ে সরাসরি যোগাযোগ করার জন্য অনুরোধ করা হলো।";

    return `📜 অফিসিয়াল প্রশাসনিক অনুলিপি — জামিয়া হুসাইনিয়া
══════════════════════════════════
📢 ${notice.title}
══════════════════════════════════

${description}

──────────────────────────────────
কর্তৃপক্ষের আদেশক্রমে,
শিক্ষা সচিব ও পরীক্ষা নিয়ন্ত্রক
জামিয়া হুসাইনিয়া মাদ্রাসা, শায়েস্তাগঞ্জ, হবিগঞ্জ

🔗 অনলাইন অনুলিপি লিংক: ${window.location.href}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const textContent = getNoticePaperText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${notice.title} — জামিয়া হুসাইনিয়া মাদ্রাসা`,
          text: textContent,
          url: window.location.href,
        });
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(textContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // fallback
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-2">
            campaign
          </span>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            নোটিশটি পাওয়া যায়নি
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            এই নোটিশটি সরানো হয়েছে বা লিঙ্কটি সঠিক নয়।
          </p>
          <Link
            to="/notice"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            <span>সকল নোটিশে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabel = getNoticeCategoryLabel(notice.title);
  const icon = getNoticeIcon(notice.title);

  return (
    <div className="flex flex-col w-full">
      {/* Targeted Print Style: Prints ONLY the official notice paper (#notice-official-paper) */}
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

          /* Unhide ONLY the official notice paper and all of its content */
          #notice-official-paper,
          #notice-official-paper * {
            visibility: visible !important;
          }

          #notice-official-paper {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 32px 36px !important;
            border: 1.5px solid #cbd5e1 !important;
            border-radius: 8px !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #0f172a !important;
            display: block !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          @page {
            margin: 1.5cm;
            size: auto;
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO & NOTICE HEADER BANNER (#f1f3ff)                         */}
      {/* ========================================================================= */}
      <section className="notice-hero-section no-print w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 border-b border-slate-200/70">
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
              to="/notice"
              className="hover:text-primary transition-colors font-medium"
            >
              নোটিশ
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">
              {notice.title}
            </span>
          </nav>

          {/* Header Row: Title & Back Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>{categoryLabel}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {notice.title}
              </h1>
            </div>

            <Link
              to="/notice"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm border border-slate-200/80 transition-colors shadow-xs shrink-0 self-start sm:self-center"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              <span>সকল নোটিশে ফিরে যান</span>
            </Link>
          </div>

          {/* Notice Info Card (Clean White Banner) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px] sm:text-[32px]">
                    {icon}
                  </span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold shadow-xs">
                      {categoryLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      সার্কুলার কোড: JH-NOT-
                      {String(notice.id || "001").slice(0, 8)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs sm:text-sm text-slate-600 mt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        calendar_today
                      </span>
                      <span>প্রকাশ: {notice.formattedDate}</span>
                    </span>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <span className="flex items-center gap-1 text-slate-700">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        verified
                      </span>
                      <span>জামিয়া হুসাইনিয়া কেন্দ্রীয় প্রশাসন</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: MAIN DOCUMENT BODY & SIDEBAR (bg-white)                        */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-8 sm:py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: Official Notice Paper (Col 8) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="notice-paper-outer bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-3.5 sm:p-7 shadow-xs">
                {/* Document Mount Paper (ONLY THIS IS PRINTED) */}
                <div
                  id="notice-official-paper"
                  className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-9 shadow-sm relative"
                >
                  {/* Top Header Watermark / Official Badge */}
                  <div className="flex flex-wrap items-center justify-between border-b border-slate-200/80 pb-3 sm:pb-4 mb-4 gap-2">
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                          drafts
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">
                          অফিসিয়াল প্রশাসনিক অনুলিপি
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                          জামিয়া হুসাইনিয়া
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="no-print inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-semibold border border-slate-200/80 shadow-2xs transition-colors cursor-pointer active:scale-95"
                        title="শুধুমাত্র এই নোটিশটি প্রিন্ট করুন"
                      >
                        <span className="material-symbols-outlined text-[14px] sm:text-[15px]">
                          print
                        </span>
                        <span className="hidden sm:inline">প্রিন্ট</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleShare}
                        className="no-print inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer active:scale-95"
                        title="অনুলিপি শেয়ার বা কপি করুন"
                      >
                        <span className="material-symbols-outlined text-[14px] sm:text-[15px]">
                          {copied ? "check" : "share"}
                        </span>
                        <span className="hidden sm:inline">
                          {copied ? "কপি হয়েছে" : "শেয়ার"}
                        </span>
                      </button>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] sm:text-xs font-bold flex items-center gap-1 shrink-0">
                        <span className="material-symbols-outlined text-[12px] sm:text-[14px]">
                          verified
                        </span>
                        <span>অনুমোদিত</span>
                      </span>
                    </div>
                  </div>

                  {/* Notice Title inside paper */}
                  <h2 className="text-base sm:text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 leading-snug">
                    {notice.title}
                  </h2>

                  {/* Notice Body Description */}
                  <div className="text-xs sm:text-base text-slate-800 leading-relaxed font-normal whitespace-pre-line min-h-[120px] sm:min-h-[140px]">
                    {notice.description ||
                      "জামিয়া হুসাইনিয়া মাদ্রাসার সকল শিক্ষক, শিক্ষার্থীবৃন্দ ও অভিভাবকগণের সদয় অবগতির জন্য জানানো যাচ্ছে যে, উপরোক্ত বিষয়ে উল্লেখিত সিদ্ধান্ত অনুযায়ী সংশ্লিষ্ট সকল কার্যক্রম যথানিয়মে পরিচালিত হবে। যেকোনো প্রয়োজনে মাদ্রাসা কার্যালয়ে সরাসরি যোগাযোগ করার জন্য অনুরোধ করা হলো।"}
                  </div>

                  {/* Signatures & Seal Box */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-6">
                    <div className="text-[11px] sm:text-xs text-slate-500 leading-snug w-full sm:w-auto sm:flex-1">
                      <p className="font-semibold text-slate-700">
                        কর্তৃপক্ষের আদেশক্রমে,
                      </p>
                      <p className="mt-0.5">শিক্ষা সচিব ও পরীক্ষা নিয়ন্ত্রক</p>
                      <p className="mt-0.5">
                        জামিয়া হুসাইনিয়া মাদ্রাসা, শায়েস্তাগঞ্জ, হবিগঞ্জ
                      </p>
                    </div>

                    <ProtectedSignature className="h-20 sm:h-20 max-w-[180px] sm:max-w-none w-auto object-contain select-none pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Bottom Nav Links */}
              <div className="notice-bottom-nav no-print flex items-center justify-between pt-2">
                <Link
                  to="/notice"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f1f3ff] hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm border border-slate-200/80 transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_back
                  </span>
                  <span>সকল নোটিশে ফিরে যান</span>
                </Link>

                <Link
                  to="/results"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold text-xs sm:text-sm"
                >
                  <span>প্রকাশিত ফলাফল দেখুন</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Column: Sidebar Information (Col 4) */}
            <div className="notice-sidebar-col no-print lg:col-span-4 flex flex-col gap-6">
              {/* Office Contact Card */}
              <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col gap-3">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/70">
                  <div className="w-8 h-8 rounded-lg bg-white text-primary flex items-center justify-center shadow-xs border border-slate-200/80">
                    <span className="material-symbols-outlined text-[18px]">
                      contact_mail
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      শিক্ষা সচিব কার্যালয়
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      জরুরি অনুসন্ধান ও তথ্য
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  নোটিশ সংক্রান্ত কোনো অস্পষ্টতা বা বিস্তারিত তথ্যের জন্য
                  মাদ্রাসার শিক্ষা সচিবের সাথে সরাসরি যোগাযোগ করুন।
                </p>

                <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 flex flex-col gap-2.5 shadow-xs text-xs sm:text-sm">
                  <a
                    href={`tel:${contact.primary_phone}`}
                    className="flex items-center gap-2 text-slate-800 hover:text-primary font-medium transition-colors font-mono"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      call
                    </span>
                    <span>{contact.primary_phone}</span>
                  </a>

                  <a
                    href={`mailto:${contact.primary_email}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors truncate"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      mail
                    </span>
                    <span className="truncate">{contact.primary_email}</span>
                  </a>

                  <div className="flex items-center gap-2 text-slate-600 pt-1 border-t border-slate-100 text-[11px] sm:text-xs">
                    <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                      schedule
                    </span>
                    <span className="line-clamp-1">{contact.office_hours}</span>
                  </div>
                </div>
              </div>

              {/* Recent Notices List Card */}
              {recentNotices.length > 0 && (
                <div className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/70">
                    <div className="w-8 h-8 rounded-lg bg-white text-primary flex items-center justify-center shadow-xs border border-slate-200/80">
                      <span className="material-symbols-outlined text-[18px]">
                        history
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      সাম্প্রতিক নোটিশসমূহ
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2">
                    {recentNotices.map((item) => (
                      <Link
                        key={item.id}
                        to={`/notice/${item.id}`}
                        className="bg-white p-3 rounded-xl border border-slate-200/70 hover:border-primary/40 hover:shadow-sm transition-all flex flex-col gap-1 group"
                      >
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-slate-500">
                          {formatNoticeDate(
                            item.created_at || item.formattedDate,
                          )}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoticeDetails;
