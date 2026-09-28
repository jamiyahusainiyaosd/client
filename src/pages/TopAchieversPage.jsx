import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../utils/PageTitle";
import topAchieverService from "../features/results/services/topAchiever.services";
import TopAchieversHero from "../features/topAchievers/components/TopAchieversHero";
import TopAchieversFilter from "../features/topAchievers/components/TopAchieversFilter";
import TopAchieversCard from "../features/topAchievers/components/TopAchieversCard";
import TopAchieverModal from "../features/topAchievers/components/TopAchieverModal";
import Pagination from "../components/Pagination";
import { Trophy, SearchX } from "lucide-react";

// Exactly 9 items per page (3 cards x 3 rows on desktop)
const PAGE_SIZE = 9;

const TopAchieversPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const currentPage = Math.max(1, Number(rawPage) || 1);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [academicYear, setAcademicYear] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch all achievers from the API
  const { data, isLoading } = useQuery({
    queryKey: ["topAchieversAll"],
    queryFn: () => topAchieverService.getAll({ all: true }),
    staleTime: 1000 * 60 * 5,
  });

  const allAchievers = useMemo(() => {
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data)) return data;
    return [];
  }, [data]);

  // Extract unique academic years for the dropdown
  const availableYears = useMemo(() => {
    const years = new Set();
    allAchievers.forEach((item) => {
      if (item.academic_year) years.add(item.academic_year);
    });
    return Array.from(years).sort().reverse();
  }, [allAchievers]);

  // Filter students based on category, year, and search query
  const filteredStudents = useMemo(() => {
    return allAchievers.filter((student) => {
      // Category filter
      if (activeCategory !== "all" && student.category !== activeCategory) {
        return false;
      }
      // Academic year filter
      if (academicYear !== "all" && student.academic_year !== academicYear) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = student.name?.toLowerCase().includes(query);
        const matchesClass = student.class_name?.toLowerCase().includes(query);
        const matchesBoard = student.board_name?.toLowerCase().includes(query);
        const matchesTitle = student.achievement_title?.toLowerCase().includes(query);
        const matchesRoll = student.roll_number?.toLowerCase().includes(query);
        const matchesAddress = student.address?.toLowerCase().includes(query);
        if (
          !matchesName &&
          !matchesClass &&
          !matchesBoard &&
          !matchesTitle &&
          !matchesRoll &&
          !matchesAddress
        ) {
          return false;
        }
      }
      return true;
    });
  }, [allAchievers, activeCategory, academicYear, searchQuery]);

  // Page navigation handler syncing with URL search params
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
    window.scrollTo({ top: 340, behavior: "smooth" });
  };

  // Reset page to 1 when filters change
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    handlePageChange(1);
  };

  const handleSearchChange = (q) => {
    setSearchQuery(q);
    handlePageChange(1);
  };

  const handleAcademicYearChange = (yr) => {
    setAcademicYear(yr);
    handlePageChange(1);
  };

  // Ensure ?page=1 defaults cleanly in URL if not present
  useEffect(() => {
    if (!rawPage) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", "1");
          return next;
        },
        { replace: true }
      );
    }
  }, [rawPage, setSearchParams]);

  // Paginate filtered results (9 per page)
  const totalCount = filteredStudents.length;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredStudents.slice(start, start + PAGE_SIZE);
  }, [filteredStudents, currentPage]);

  return (
    <>
      <PageTitle title="এ বছরের সেরা কৃতি শিক্ষার্থী | জামিয়া হুসাইনিয়া মাদ্রাসা" />

      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        {/* SECTION 1: HERO & METRICS (Background: #f1f3ff) */}
        <TopAchieversHero totalCount={allAchievers.length} />

        {/* SECTION 2: STUDENTS DIRECTORY, FILTER & CARDS (Background: white) */}
        <section className="w-full bg-white py-10 sm:py-14 lg:py-16 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Filter and Search Bar */}
            <TopAchieversFilter
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              academicYear={academicYear}
              onAcademicYearChange={handleAcademicYearChange}
              availableYears={availableYears}
              totalCount={filteredStudents.length}
            />

            {/* Loading Skeletons: 3 items per row on desktop */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-5 h-96 animate-pulse flex flex-col items-center justify-center"
                  >
                    <div className="w-32 h-36 rounded-2xl bg-slate-200 mb-4" />
                    <div className="w-44 h-4 rounded bg-slate-200 mb-2" />
                    <div className="w-28 h-3 rounded bg-slate-100 mb-3" />
                    <div className="w-full h-12 rounded-xl bg-slate-50" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredStudents.length === 0 && (
              <div className="bg-[#f1f3ff] rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs my-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200/60">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-main">কোনো শিক্ষার্থী পাওয়া যায়নি</h3>
                <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
                  আপনার নির্বাচিত ফিল্টার বা অনুসন্ধানের সাথে মিল রেখে কোনো কৃতি শিক্ষার্থীর তথ্য নেই। অন্য ক্যাটাগরি অথবা অনুসন্ধান শব্দ পরিবর্তন করে চেষ্টা করুন।
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                    setAcademicYear("all");
                    handlePageChange(1);
                  }}
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-white hover:bg-primary-hover transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Trophy className="w-4 h-4" />
                  <span>সকল শিক্ষার্থী প্রদর্শন করুন</span>
                </button>
              </div>
            )}

            {/* Students Grid: 1 col on mobile, 2 cols on tablet, EXACTLY 3 cards per row on desktop */}
            {!isLoading && paginatedStudents.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedStudents.map((student) => (
                  <TopAchieversCard
                    key={student.id}
                    student={student}
                    onSelect={(st) => setSelectedStudent(st)}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls (Triggered when items exceed 9 or totalPages > 1) */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  totalItems={totalCount}
                  pageSize={PAGE_SIZE}
                  itemsPerPage={PAGE_SIZE}
                  onPageChange={handlePageChange}
                  useBengaliDigits={true}
                />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <TopAchieverModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </>
  );
};

export default TopAchieversPage;
