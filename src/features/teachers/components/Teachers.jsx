import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import teacherService from "../services/teacher.services";
import TeachersHero from "./TeachersHero";
import TeachersFilter from "./TeachersFilter";
import TeacherCards from "./TeacherCards";
import Pagination from "../../../components/Pagination";

const ITEMS_PER_PAGE = 9;

const Teachers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const currentPage = Math.max(1, Number(rawPage) || 1);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch teachers from backend API
  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["teachersList"],
    queryFn: async () => {
      try {
        const res = await teacherService.getAllTeacher(1, 100);
        return res?.data;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  // Dynamic teachers data from backend API with fallback
  const allTeachers = useMemo(() => {
    const rawApiTeachers =
      apiResponse?.data ||
      apiResponse?.results ||
      (Array.isArray(apiResponse) ? apiResponse : []);

    if (rawApiTeachers && rawApiTeachers.length > 0) {
      return rawApiTeachers.map((apiItem) => {
        const imageUrl = apiItem.image || apiItem.avatar || null;
        return {
          id: apiItem.id,
          name: apiItem.name,
          designation: apiItem.designation,
          phone_number: apiItem.phone_number,
          image: imageUrl,
          avatar: imageUrl,
          address: apiItem.address || "শায়েস্তাগঞ্জ, হবিগঞ্জ",
          status: apiItem.status || "সম্মানিত শিক্ষক",
        };
      });
    }

    return [];
  }, [apiResponse]);

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts = {
      all: allTeachers.length,
      leadership: 0,
      academic_lead: 0,
      general: 0,
    };
    allTeachers.forEach((teacher) => {
      const des = (teacher.designation || "").toLowerCase();
      if (
        des.includes("মুহতামিম") ||
        des.includes("প্রশাসন") ||
        des.includes("পরিচালক") ||
        des.includes("নায়েবে")
      ) {
        counts.leadership += 1;
      } else if (
        des.includes("নাজিম") ||
        des.includes("তা’লিমাত") ||
        des.includes("তালিমাত") ||
        des.includes("শিক্ষা")
      ) {
        counts.academic_lead += 1;
      } else {
        counts.general += 1;
      }
    });
    return counts;
  }, [allTeachers]);

  // Filter teachers by category and search query
  const filteredTeachers = useMemo(() => {
    let list = allTeachers;

    if (activeCategory !== "all") {
      list = list.filter((teacher) => {
        const des = (teacher.designation || "").toLowerCase();
        if (activeCategory === "leadership") {
          return (
            des.includes("মুহতামিম") ||
            des.includes("প্রশাসন") ||
            des.includes("পরিচালক") ||
            des.includes("নায়েবে")
          );
        }
        if (activeCategory === "academic_lead") {
          return (
            des.includes("নাজিম") ||
            des.includes("তা’লিমাত") ||
            des.includes("তালিমাত") ||
            des.includes("শিক্ষা")
          );
        }
        if (activeCategory === "general") {
          const isSpecial =
            des.includes("মুহতামিম") ||
            des.includes("প্রশাসন") ||
            des.includes("পরিচালক") ||
            des.includes("নায়েবে") ||
            des.includes("নাজিম") ||
            des.includes("তা’লিমাত") ||
            des.includes("তালিমাত");
          return !isSpecial;
        }
        return true;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (teacher) =>
          teacher.name?.toLowerCase().includes(q) ||
          teacher.designation?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allTeachers, activeCategory, searchQuery]);

  // Pagination calculation
  const totalItems = filteredTeachers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const paginatedTeachers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTeachers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTeachers, currentPage]);

  const handleSelectCategory = (catId) => {
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
      <TeachersHero totalCount={allTeachers.length} />

      {/* Section 2: Main Body Area (bg-white) */}
      <section className="w-full bg-white py-8 sm:py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <TeachersFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            totalCount={allTeachers.length}
            categoryCounts={categoryCounts}
          />

          {/* Teacher Cards Bento Grid */}
          <TeacherCards teachers={paginatedTeachers} isLoading={isLoading} />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Teachers;