import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ResultsServices from "../services/results.services";
import ResultsHero from "./ResultsHero";
import ResultsFilter from "./ResultsFilter";
import ResultsCards from "./ResultsCards";
import Pagination from "../../../components/Pagination";
import { getAcademicYear } from "../../../utils/academicYear";
import {
  getCategoryForClass,
  getResultDetailsMetadata,
} from "../utils/resultsUtils";

const ITEMS_PER_PAGE = 9;

const AllResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const currentPage = Math.max(1, Number(rawPage) || 1);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: responseData, isLoading } = useQuery({
    queryKey: ["resultsList"],
    queryFn: async () => {
      try {
        const res = await ResultsServices.getAllResults(1, 100);
        return res?.data;
      // eslint-disable-next-line no-unused-vars
      } catch (e) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  // Pure dynamic API results
  const allResults = useMemo(() => {
    const rawApiResults =
      responseData?.results ||
      responseData?.data ||
      (Array.isArray(responseData) ? responseData : []);

    if (!rawApiResults || rawApiResults.length === 0) {
      return [];
    }

    return rawApiResults.map((apiItem, index) => {
      const className = apiItem.studentClassName || "ফলাফল";
      const dynamicMeta = getResultDetailsMetadata(className, apiItem.studentClassDescription);
      return {
        ...dynamicMeta,
        ...apiItem,
        id: apiItem.id || index + 1,
        studentClassName: className,
        studentClassDescription: apiItem.studentClassDescription || dynamicMeta.description,
        images: apiItem.images || [],
        marksheetImg:
          apiItem.images?.[0]?.resultsSheetImg ||
          apiItem.resultsSheetImg ||
          apiItem.images?.[0] ||
          null,
        total_students: apiItem.total_students || dynamicMeta.total_students,
        pass_rate: apiItem.pass_rate || dynamicMeta.pass_rate,
        a_plus: apiItem.a_plus || dynamicMeta.a_plus,
        category: getCategoryForClass(className),
      };
    });
  }, [responseData]);

  // Filter items by category and search query
  const filteredResults = useMemo(() => {
    let list = allResults;

    if (activeCategory !== "all") {
      list = list.filter((item) => {
        const cat = item.category || getCategoryForClass(item.studentClassName);
        return cat === activeCategory;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (item) =>
          item.studentClassName?.toLowerCase().includes(q) ||
          item.studentClassDescription?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allResults, activeCategory, searchQuery]);

  // Pagination calculations
  const totalItems = filteredResults.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResults.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredResults, currentPage]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", "1");
      return next;
    });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", "1");
      return next;
    });
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", "1");
      return next;
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
    window.scrollTo({ top: 260, behavior: "smooth" });
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

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Section 1: Hero Area (#f1f3ff) */}
      <ResultsHero
        totalResults={allResults.length}
        academicYear={allResults[0]?.academic_year || getAcademicYear()}
      />

      {/* Section 2: Main Body Area (bg-white) */}
      <section className="w-full bg-white py-8 sm:py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <ResultsFilter
            activeCategory={activeCategory}
            onSelectCategory={handleCategoryChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            totalCount={allResults.length}
          />

          {/* Results Grid Cards */}
          <ResultsCards results={paginatedResults} isLoading={isLoading} />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalItems}
                totalItems={totalItems}
                pageSize={ITEMS_PER_PAGE}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
                useBengaliDigits={true}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllResults;