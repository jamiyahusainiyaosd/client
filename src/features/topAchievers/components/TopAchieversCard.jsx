import React from "react";
import {
  Trophy,
  Award,
  BookOpen,
  MapPin,
  User,
  ChevronRight,
  Hash,
  Star,
} from "lucide-react";

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

const TopAchieversCard = ({ student, onSelect }) => {
  const isNational = student.category === "national";
  const categoryLabel =
    student.category_display || getCategoryLabel(student.category);

  return (
    <article className="group site-card-alt bg-[#f1f3ff] hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full p-4 sm:p-5 rounded-2xl border border-slate-200/80">
      <div>
        {/* Top Meta: White Badges on #f1f3ff Card */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-primary border border-primary-border/60 shadow-2xs">
            <Trophy className="w-3 h-3 text-primary shrink-0" />
            <span>{categoryLabel}</span>
          </span>

          <span className="inline-block px-2.5 py-0.5 rounded-md bg-white text-slate-600 text-[10px] sm:text-[11px] font-semibold font-sans border border-slate-200/80 shrink-0 shadow-2xs">
            {student.academic_year || "২০২৬"}
          </span>
        </div>

        {/* Achievement Rank Title: Crisp White Box on #f1f3ff Card */}
        <div className="mb-4 px-3 py-2 rounded-xl bg-white border border-slate-200/80 text-center shadow-2xs">
          <p className="text-xs sm:text-[13px] font-bold text-main leading-snug line-clamp-2">
            <Trophy className="w-3.5 h-3.5 text-amber-500 inline-block mr-1.5 shrink-0 align-sub" />
            <span>{student.achievement_title}</span>
          </p>
        </div>

        {/* Student Portrait with Crisp White Frame */}
        <div className="relative mx-auto mb-4 w-32 h-36 sm:w-36 sm:h-40 rounded-2xl overflow-hidden bg-white border-2 border-white group-hover:border-primary/30 transition-all shadow-xs">
          {student.image ? (
            <img
              src={student.image}
              alt={student.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-white text-slate-400 group-hover:text-primary transition-colors">
              <User className="w-14 h-14 stroke-1" />
            </div>
          )}

          {/* Medal Icon Badge */}
          <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-white/95 backdrop-blur-sm shadow-md border border-slate-200/80 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Award className="w-3.5 h-3.5" />
          </div>

          {/* National Special Achievement Tag */}
          {isNational && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/85 to-transparent p-1 text-center">
              <span className="text-[10px] font-bold text-amber-300 flex items-center justify-center gap-1">
                <Star className="w-2.5 h-2.5 fill-amber-300" />
                জাতীয় মেধা
              </span>
            </div>
          )}
        </div>

        {/* Student Name */}
        <h3 className="font-bold text-base sm:text-lg text-main text-center group-hover:text-primary transition-colors line-clamp-1 leading-snug">
          {student.name}
        </h3>

        {/* Class Name */}
        <p className="text-xs sm:text-sm font-semibold text-primary text-center mt-0.5 line-clamp-1">
          {student.class_name}
        </p>

        {/* Board & Exam Details Cardlet: Crisp White Box */}
        <div className="mt-3.5 p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/80 text-center space-y-1 shadow-2xs">
          <p className="text-xs text-slate-800 font-medium line-clamp-1 flex items-center justify-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{student.board_name}</span>
          </p>
          <div className="flex items-center justify-center gap-2 text-[11px] pt-0.5">
            {student.score_or_division && (
              <span className="font-bold text-primary px-2 py-0.5 rounded-md bg-[#f1f3ff] border border-primary-border/60">
                {student.score_or_division}
              </span>
            )}
            {student.roll_number && (
              <span className="font-mono text-muted text-[11px] flex items-center gap-0.5">
                <Hash className="w-3 h-3 text-slate-400" />
                {student.roll_number}
              </span>
            )}
          </div>
        </div>

        {/* Quote / Advice Snippet if present */}
        {student.quote && (
          <p className="mt-2.5 text-[11px] text-slate-500 italic text-center line-clamp-2 px-1">
            "{student.quote}"
          </p>
        )}
      </div>

      {/* Card Footer: Address & Detail Action */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/80 flex items-center justify-between gap-2 text-xs">
        <span className="text-[11px] text-muted flex items-center gap-1 truncate">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">
            {student.address || "শায়েস্তাগঞ্জ, হবিগঞ্জ"}
          </span>
        </span>

        <button
          type="button"
          onClick={() => onSelect(student)}
          className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-white hover:bg-primary py-1.5 px-3 rounded-xl bg-white border border-slate-200/80 transition-all cursor-pointer text-xs shrink-0 shadow-2xs active:scale-95"
        >
          <span>বিস্তারিত</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};

export default TopAchieversCard;
