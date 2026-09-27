import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import academicsServices from "../services/academics.services";
import AcademicHero from "./AcademicHero";
import AcademicFilter from "./AcademicFilter";
import AcademicCards from "./AcademicCards";
import Pagination from "../../../components/Pagination";
import { getCategoryForClass, getIconForClass } from "../utils/academicUtils";

// Deprecated mock array - kept as empty array for backwards compatibility
export const defaultAcademicClasses = [];

const PAGE_SIZE = 9;

const AllAcademics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const page = Math.max(1, Number(rawPage) || 1);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("সকল বিভাগ");
  const [viewMode, setViewMode] = useState("grid");

  // Fetch classes from backend API (fetch all pages)
  const { data, isLoading } = useQuery({
    queryKey: ["academicsAll"],
    queryFn: () => academicsServices.getAllAcademic(1, 100),
    staleTime: 1000 * 60 * 5,
  });

  const rawClasses =
    data?.data?.data ||
    data?.data?.results ||
    data?.data ||
    data?.results ||
    (Array.isArray(data) ? data : []);

  // Map API classes purely dynamically
  const allClasses = useMemo(() => {
    if (rawClasses && Array.isArray(rawClasses) && rawClasses.length > 0) {
      return rawClasses.map((item, idx) => ({
        id: item.id ?? idx + 1,
        class_name: item.class_name || "",
        class_title: item.class_title || "",
        student_count: item.student_count ?? 0,
        number_seat: item.number_seat ?? 0,
        level: item.level || getCategoryForClass(item.class_name),
        category: item.category || getCategoryForClass(item.class_name),
        icon: item.icon || getIconForClass(item.class_name),
        class_description: item.class_description || "",
        course_code: item.course_code || "",
        class_created: item.class_created || "",
      }));
    }
    return [];
  }, [rawClasses]);

  // Client-side filtering by category & search query
  const filteredClasses = useMemo(() => {
    return allClasses.filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      const name = (item.class_name || "").toLowerCase();
      const title = (item.class_title || "").toLowerCase();
      const category = item.category || getCategoryForClass(item.class_name);
      const level = item.level || "";

      const matchesSearch = !q || name.includes(q) || title.includes(q);

      let matchesCategory = true;
      if (activeCategory !== "সকল বিভাগ") {
        matchesCategory =
          category.includes(activeCategory) ||
          level.includes(activeCategory) ||
          name.includes(activeCategory);
      }

      return matchesSearch && matchesCategory;
    });
  }, [allClasses, searchQuery, activeCategory]);

  // Pagination calculation based on all filtered classes
  const totalCount = filteredClasses.length;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;

  const paginatedClasses = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredClasses.slice(start, start + PAGE_SIZE);
  }, [filteredClasses, page]);

  const handlePageChange = (p) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

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

  const from = totalCount === 0 ? 0 : Math.min((page - 1) * PAGE_SIZE + 1, totalCount);
  const to = Math.min(page * PAGE_SIZE, totalCount);

  return (
    <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
      <div className="flex flex-col w-full flex-1">
        {/* Section 1: Hero & Statistics (Background: #f1f3ff) */}
        <AcademicHero
          displayedCount={paginatedClasses.length}
          totalCount={totalCount}
        />

        {/* Section 2: Interactive Controls, Filters & Class Grid (Background: white) */}
        <section className="w-full bg-white py-10 sm:py-14 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search & Filter Controls */}
            <AcademicFilter
              activeCategory={activeCategory}
              from={from}
              onCategoryChange={setActiveCategory}
              onSearchChange={setSearchQuery}
              onViewModeChange={setViewMode}
              searchQuery={searchQuery}
              to={to}
              totalCount={totalCount}
              viewMode={viewMode}
            />

            {/* Academic Classes Cards */}
            <AcademicCards
              classes={paginatedClasses}
              isLoading={isLoading}
              viewMode={viewMode}
            />

            {/* Pagination Controls */}
            {totalCount > PAGE_SIZE && (
              <div className="mt-8 sm:mt-10">
                <Pagination
                  currentPage={page}
                  onPageChange={handlePageChange}
                  pageSize={PAGE_SIZE}
                  totalCount={totalCount}
                  totalPages={totalPages}
                  useBengaliDigits={true}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AllAcademics;