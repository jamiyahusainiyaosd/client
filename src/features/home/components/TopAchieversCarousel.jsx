import React, { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Award, Trophy, Sparkles, ArrowRight, User } from "lucide-react";
import topAchieverService from "../../results/services/topAchiever.services";
import TopAchieverModal from "../../topAchievers/components/TopAchieverModal";

const TopAchieversCarousel = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch top achievers from backend API
  const { data, isLoading } = useQuery({
    queryKey: ["topAchieversFeatured"],
    queryFn: topAchieverService.getFeatured,
    staleTime: 1000 * 60 * 5,
  });

  const achievers = useMemo(() => {
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data)) return data;
    return [];
  }, [data]);

  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const card = scrollRef.current.querySelector(".achiever-slide");
    if (card) {
      const style = window.getComputedStyle(scrollRef.current);
      const gap = parseFloat(style.columnGap || style.gap) || 16;
      const index = Math.round(scrollLeft / (card.offsetWidth + gap));
      setActiveIndex(Math.max(0, Math.min(index, achievers.length - 1)));
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [achievers]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.querySelector(".achiever-slide");
    if (!card) return;

    const style = window.getComputedStyle(container);
    const gap = parseFloat(style.columnGap || style.gap) || 16;
    const scrollAmount = (card.offsetWidth + gap) * (direction === "left" ? -1 : 1);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.querySelector(".achiever-slide");
    if (!card) return;

    const style = window.getComputedStyle(container);
    const gap = parseFloat(style.columnGap || style.gap) || 16;
    container.scrollTo({
      left: index * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  if (!isLoading && achievers.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              এ বছরের সেরা
            </span>
            <span className="text-secondary text-xs">•</span>
            <span className="text-secondary text-xs font-medium">শীর্ষ মেধা ও গৌরব</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            এ বছরের <span className="text-primary">সেরা কৃতি শিক্ষার্থী</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl">
            কেন্দ্রীয় বোর্ড পরীক্ষা ও বার্ষিক ইমতিহানে শীর্ষস্থান অর্জনকারী শিক্ষার্থীদের গৌরবোজ্জ্বল সাফল্য।
          </p>
        </div>

        {/* View All Link */}
        <div className="shrink-0">
          <Link
            to="/top-achievers"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-hover transition-colors py-1 group"
          >
            <span>সকল সেরা ছাত্র</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="site-card-alt rounded-2xl border border-slate-200/80 p-5 h-80 animate-pulse flex flex-col items-center justify-center"
            >
              <div className="w-28 h-28 rounded-2xl bg-white/70 mb-4" />
              <div className="w-36 h-4 rounded bg-white/70 mb-2" />
              <div className="w-24 h-3 rounded bg-white/50" />
            </div>
          ))}
        </div>
      )}

      {/* Carousel Track with Floating Left / Right Navigation */}
      {!isLoading && (
        <div className="relative group/carousel">
          {/* Floating Left (Previous) Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute -left-3 sm:-left-4 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-md ${
              canScrollLeft
                ? "bg-white text-slate-800 border-slate-200 hover:bg-primary hover:text-white hover:border-primary active:scale-95"
                : "bg-white/90 text-slate-300 border-slate-200/60 cursor-not-allowed opacity-40 shadow-xs"
            }`}
            title="পূর্ববর্তী"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Floating Right (Next) Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute -right-3 sm:-right-4 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-md ${
              canScrollRight
                ? "bg-white text-slate-800 border-slate-200 hover:bg-primary hover:text-white hover:border-primary active:scale-95"
                : "bg-white/90 text-slate-300 border-slate-200/60 cursor-not-allowed opacity-40 shadow-xs"
            }`}
            title="পরবর্তী"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Track */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto scrollbar-none pb-2 pt-1 scroll-smooth snap-x snap-mandatory px-0.5"
          >
            {achievers.map((student, idx) => {
              const getCategoryLabel = (cat) => {
                switch (cat) {
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
              const categoryLabel = student.category_display || getCategoryLabel(student.category);

              return (
                <div
                  key={student.id || idx}
                  className="achiever-slide flex-shrink-0 w-full min-w-full sm:min-w-0 sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/3)] snap-center sm:snap-start"
                >
                  <article className="group site-card-alt bg-[#f1f3ff] hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                    {/* Top Rank Header */}
                    <div>
                      {/* Top Meta: Unified Brand Category Level & Academic Year */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-primary border border-primary-border/60 shadow-2xs">
                          <Trophy className="w-3 h-3 text-primary shrink-0" />
                          <span>{categoryLabel}</span>
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 font-sans px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 shrink-0 shadow-2xs">
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

                      {/* Student Portrait Frame (Clickable) */}
                      <div
                        onClick={() => setSelectedStudent(student)}
                        className="relative mx-auto mb-3.5 w-32 h-36 sm:w-36 sm:h-40 rounded-2xl overflow-hidden bg-white border-2 border-white group-hover:border-primary/30 transition-all shadow-xs cursor-pointer"
                        title={`${student.name} - বিস্তারিত দেখুন`}
                      >
                        {student.image ? (
                          <img
                            src={student.image}
                            alt={student.name}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-white text-slate-400 group-hover:text-primary transition-colors">
                            <User className="w-16 h-16 stroke-1" />
                          </div>
                        )}

                        {/* Rank Medal Overlay Badge */}
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-white/95 shadow-sm border border-slate-200/80 flex items-center justify-center text-primary">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Student Name (Clickable) */}
                      <h3
                        onClick={() => setSelectedStudent(student)}
                        className="font-bold text-sm sm:text-base text-main text-center group-hover:text-primary transition-colors line-clamp-1 leading-snug cursor-pointer"
                        title={`${student.name} - বিস্তারিত দেখুন`}
                      >
                        {student.name}
                      </h3>

                      {/* Class & Department */}
                      <p className="text-xs font-semibold text-primary text-center mt-1 line-clamp-1">
                        {student.class_name}
                      </p>

                      {/* Board / Exam Details: Crisp White Box on #f1f3ff Card */}
                      <div className="mt-3.5 py-2 px-2.5 rounded-xl bg-white border border-slate-200/80 text-center space-y-0.5 shadow-2xs">
                        <p className="text-[11px] text-slate-700 font-medium line-clamp-1">
                          {student.board_name}
                        </p>
                        {student.score_or_division && (
                          <span className="inline-block mt-0.5 text-[10px] font-bold text-primary px-2 py-0.5 rounded-md bg-[#f1f3ff] border border-primary-border/60">
                            {student.score_or_division}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Footer / Action */}
                    <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-muted truncate max-w-[140px]">
                        {student.address || "শায়েস্তাগঞ্জ, হবিগঞ্জ"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedStudent(student)}
                        className="font-semibold text-primary hover:text-white inline-flex items-center gap-1 text-[11px] shrink-0 bg-white hover:bg-primary px-2.5 py-1 rounded-lg border border-slate-200/80 transition-all shadow-2xs cursor-pointer active:scale-95"
                      >
                        <span>বিস্তারিত</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Mobile Slide Dots Indicator */}
          {achievers.length > 1 && (
            <div className="flex sm:hidden items-center justify-center gap-1.5 mt-4">
              {achievers.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`শিক্ষার্থী ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <TopAchieverModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default TopAchieversCarousel;
