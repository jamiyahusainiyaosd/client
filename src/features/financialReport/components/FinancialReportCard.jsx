import AuditReportSheet from "./AuditReportSheet";
import ProfitLossStatementSheet from "./ProfitLossStatementSheet";

const FinancialReportCard = ({
  report,
  onViewFullDocument,
  onDownload,
}) => {
  const isAudit = report.report_type === "audit_report" || report.id === "report-1";
  const isProfitLoss = report.report_type === "profit_loss" || report.id === "report-2";
  const downloadBtnLabel = isAudit ? "অডিট রিপোর্ট ডাউনলোড করুন" : "আয়-ব্যয় বিবরণী ডাউনলোড করুন";

  return (
    <div
      className="bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      data-purpose={isAudit ? "document-card-1" : "document-card-2"}
    >
      <div>
        {/* Card Header Meta */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {report.title || report.finanicialReportName}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-secondary mt-1.5 font-sans">
              <span className="material-symbols-outlined text-[15px] text-primary">calendar_today</span>
              <span>
                {report.created_at ||
                  report.finanicialReportCreate ||
                  "২০ সেপ্টেম্বর, ২০২৬"}
              </span>
            </div>
          </div>

          <button
            onClick={() => onViewFullDocument(report)}
            className="p-2 rounded-xl bg-white border border-slate-200/80 text-secondary hover:text-primary hover:bg-slate-50 transition-all cursor-pointer shadow-xs shrink-0"
            title="সম্পূর্ণ বিবরণী বড় করে দেখুন"
            type="button"
            aria-label="সম্পূর্ণ বিবরণী দেখুন"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_full</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-secondary mt-2.5 leading-relaxed">
          {report.description ||
            report.finanicialReportDescription ||
            "প্রতিষ্ঠানের সমন্বিত আয়-ব্যয়, তহবিল ব্যবস্থাপনা ও চার্টার্ড অ্যাকাউন্ট্যান্টস দ্বারা সত্যায়িত অডিট রিপোর্ট।"}
        </p>

        {/* Document Sheet Render */}
        {isAudit ? (
          <AuditReportSheet meta={report.meta} />
        ) : isProfitLoss ? (
          <ProfitLossStatementSheet meta={report.meta} />
        ) : report.finanicialReportImage ? (
          <div className="mt-5 p-2 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <img
              src={report.finanicialReportImage}
              alt={report.title || report.finanicialReportName}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        ) : (
          <AuditReportSheet meta={report.meta} />
        )}
      </div>

      {/* Bottom Actions */}
      <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between gap-2 sm:gap-3 w-full">
        <button
          onClick={() => onDownload(report)}
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-primary hover:bg-primary/95 text-white text-[11px] sm:text-xs font-semibold px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-xs transition-all cursor-pointer active:scale-98 whitespace-nowrap shrink-0"
          type="button"
        >
          <span className="material-symbols-outlined text-[15px] sm:text-[16px]">download</span>
          <span className="whitespace-nowrap">{downloadBtnLabel}</span>
        </button>

        <button
          onClick={() => onViewFullDocument(report)}
          className="text-primary hover:text-primary/80 text-[11px] sm:text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap shrink-0"
          type="button"
        >
          <span className="whitespace-nowrap">পূর্ণাঙ্গ প্রিভিউ</span>
          <span className="material-symbols-outlined text-[14px] sm:text-[15px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default FinancialReportCard;
