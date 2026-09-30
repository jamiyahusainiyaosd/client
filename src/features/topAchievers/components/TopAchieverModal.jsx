import React, { useEffect } from "react";
import { X, Trophy, Award, BookOpen, MapPin, User, Hash, Quote } from "lucide-react";

const getCategoryLabel = (category) => {
  switch (category) {
    case "national":
      return "জাতীয় মেধা";
    case "division":
      return "বিভাগীয় মেধা";
    case "district":
      return "জেলা মেধা";
    case "madrasa":
      return "বার্ষিক মেধা";
    default:
      return "শীর্ষ মেধা";
  }
};

const TopAchieverModal = ({ student, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!student) return null;

  const categoryLabel = student.category_display || getCategoryLabel(student.category);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/65 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg my-auto bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden max-h-[92vh] flex flex-col transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Banner with Achievement Title */}
        <div className="relative p-5 sm:p-6 bg-slate-950 text-white shrink-0 border-b border-slate-800">
          {/* Close button with high-contrast positioning */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md z-20 border border-white/20 active:scale-95"
            aria-label="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Meta Tags: Category Level & Academic Year */}
          <div className="flex flex-wrap items-center gap-2 pr-10 mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/25 text-amber-300 border border-amber-400/40 backdrop-blur-sm">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>{categoryLabel}</span>
            </span>

            <span className="text-xs font-semibold text-white/90 bg-white/15 px-2.5 py-1 rounded-full font-sans border border-white/25">
              শিক্ষাবর্ষ: {student.academic_year || "২০২৬"}
            </span>
          </div>

          {/* Full Achievement Title: Big, prestigious, never truncated */}
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug pr-8">
            {student.achievement_title}
          </h3>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* Student Profile Card (Clean, aligned, zero awkward negative-margin overlap) */}
          <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#f1f3ff] border border-slate-200/80 mb-5 shadow-2xs">
            <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-white border-2 border-white shadow-xs shrink-0">
              {student.image ? (
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                  <User className="w-10 h-10 stroke-1" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-main leading-tight">
                {student.name}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-primary mt-1">
                {student.class_name}
              </p>
              <p className="text-xs text-muted flex items-center gap-1.5 mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{student.address || "শায়েস্তাগঞ্জ, হবিগঞ্জ"}</span>
              </p>
            </div>
          </div>

          {/* Academic Info Grid: Responsive, no awkward truncation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {/* পরীক্ষা ও শিক্ষাবোর্ড */}
            <div className="col-span-1 sm:col-span-2 p-3.5 rounded-2xl bg-[#f1f3ff] border border-slate-200/70">
              <span className="text-[11px] font-semibold text-muted block mb-1">
                পরীক্ষা ও শিক্ষাবোর্ড
              </span>
              <p className="text-xs sm:text-sm font-bold text-main flex items-start gap-2 leading-relaxed">
                <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="break-words">{student.board_name}</span>
              </p>
            </div>

            {/* ফলাফল / গ্রেড */}
            <div className="p-3.5 rounded-2xl bg-[#f1f3ff] border border-slate-200/70">
              <span className="text-[11px] font-semibold text-muted block mb-1">
                ফলাফল / গ্রেড
              </span>
              <p className="text-xs sm:text-sm font-bold text-primary flex items-center gap-2">
                <Award className="w-4 h-4 text-primary shrink-0" />
                <span>{student.score_or_division || "মুমতাজ (স্টার মার্কস)"}</span>
              </p>
            </div>

            {/* রোল নম্বর */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-muted block mb-1">
                রোল নম্বর
              </span>
              <p className="text-xs sm:text-sm font-mono font-bold text-main flex items-center gap-2">
                <Hash className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{student.roll_number || "—"}</span>
              </p>
            </div>

            {/* পিতার নাম / অভিভাবক */}
            {student.father_name && (
              <div className="col-span-1 sm:col-span-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-[11px] font-semibold text-muted block mb-1">
                  পিতার নাম / অভিভাবক
                </span>
                <p className="text-xs sm:text-sm font-bold text-main flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{student.father_name}</span>
                </p>
              </div>
            )}
          </div>

          {/* Student Quote / Advice if available */}
          {student.quote && (
            <div className="mb-5 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
              <div className="flex items-start gap-2.5">
                <Quote className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-primary mb-1">
                    কৃতি শিক্ষার্থীর অনুভূতি ও পরামর্শ:
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{student.quote}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Close Action */}
          <div className="flex justify-end pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer text-center active:scale-95"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAchieverModal;
