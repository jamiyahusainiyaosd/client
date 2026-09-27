import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import noticeService from "../services/notice.services";
import NoticeHero from "./NoticeHero";
import NoticeFilter from "./NoticeFilter";
import NoticeCards from "./NoticeCards";
import Pagination from "../../../components/Pagination";
import { getNoticeCategory } from "../utils/noticeUtils";

const ITEMS_PER_PAGE = 9;

const Notices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const currentPage = Math.max(1, Number(rawPage) || 1);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch notices from backend API
  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["noticesList"],
    queryFn: async () => {
      try {
        const res = await noticeService.getAll(1, 100);
        return res;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  // Pure dynamic API notices
  const allNotices = useMemo(() => {
    const rawApiList =
      apiResponse?.results ||
      apiResponse?.data ||
      (Array.isArray(apiResponse) ? apiResponse : []);

    if (!rawApiList || rawApiList.length === 0) {
      return [];
    }

    return rawApiList.map((apiItem, index) => {
      const title = apiItem.title || "জরুরি বিজ্ঞপ্তি";
      const description = apiItem.description || "";
      return {
        id: apiItem.id || index + 1,
        title,
        description,
        created_at: apiItem.created_at || apiItem.noticeCreatedAt || "",
        category: getNoticeCategory(title, description),
        status: apiItem.status || "সর্বশেষ",
        priority: apiItem.priority || "সাধারণ",
      };
    });
  }, [apiResponse]);

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts = { all: allNotices.length };
    allNotices.forEach((item) => {
      const cat = item.category || "administrative";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [allNotices]);

  // Filter notices by active category and search query
  const filteredNotices = useMemo(() => {
    let list = allNotices;

    if (activeCategory !== "all") {
      list = list.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allNotices, activeCategory, searchQuery]);

  // Pagination calculations
  const totalItems = filteredNotices.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const paginatedNotices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNotices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNotices, currentPage]);

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

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(page));
      return next;
    });
    window.scrollTo({ top: 240, behavior: "smooth" });
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
      <NoticeHero totalCount={allNotices.length} />

      {/* Section 2: Main Body Area (bg-white) */}
      <section className="w-full bg-white py-8 sm:py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <NoticeFilter
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            totalCount={allNotices.length}
            categoryCounts={categoryCounts}
          />

          {/* Notice Cards Grid */}
          <NoticeCards notices={paginatedNotices} isLoading={isLoading} />

          {/* Pagination */}
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

export default Notices;