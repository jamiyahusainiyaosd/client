import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFormerStudents } from "../services/formerStudent.services";
import FormerStudentHero from "./FormerStudentHero";
import FormerStudentFilter from "./FormerStudentFilter";
import FormerStudentCards from "./FormerStudentCards";
import Pagination from "../../../components/Pagination";
import FormerStudentModal from "./FormerStudentModal";
import { preloadImage } from "../../../utils/imageLoader";
import { getOptimizedImageUrl } from "../../../utils/imageOptimizer";

const PAGE_SIZE = 9;

const FormerStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const page = Math.max(1, Number(rawPage) || 1);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch from API
  const { data, isLoading } = useFormerStudents({ page });

  // Dynamic mapping purely from API
  const allStudents = useMemo(() => {
    const rawList =
      data?.items ||
      data?.results ||
      data?.data ||
      (Array.isArray(data) ? data : []);

    if (rawList && Array.isArray(rawList) && rawList.length > 0) {
      return rawList.map((x, idx) => ({
        id: x.id ?? idx + 1,
        name: x.name || x.student_name || `সাবেক ছাত্র ${idx + 1}`,
        current: x.current || x.designation || x.profession || "প্রাক্তনী",
        address: x.address || x.location || "",
        mobile: x.mobile || x.phone || "",
        pass_year: String(x.pass_year || x.passing_year || x.year || ""),
        image: x.image || x.avatar || x.photo || "",
      }));
    }
    return [];
  }, [data]);

  // Derived available years dynamically from actual data
  const availableYears = useMemo(() => {
    const yearsSet = new Set(
      allStudents.map((s) => String(s.pass_year)).filter((y) => y && y !== "undefined" && y !== "null")
    );
    return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
  }, [allStudents]);

  // Dynamic filtering based on search query & selected batch
  const filteredStudents = useMemo(() => {
    return allStudents.filter((student) => {
      const name = (student.name || "").toLowerCase();
      const year = String(student.pass_year || "");
      const phone = (student.mobile || "").toLowerCase();
      const address = (student.address || "").toLowerCase();
      const current = (student.current || "").toLowerCase();

      const matchesYear = selectedYear === "all" || year === selectedYear;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        name.includes(q) ||
        year.includes(q) ||
        phone.includes(q) ||
        address.includes(q) ||
        current.includes(q);

      return matchesYear && matchesQuery;
    });
  }, [allStudents, selectedYear, searchQuery]);


  const totalCount = filteredStudents.length;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;

  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredStudents.slice(start, start + PAGE_SIZE);
  }, [filteredStudents, page]);

  // Preload visible student avatars for instant display
  useEffect(() => {
    paginatedStudents.forEach((student) => {
      if (student.image) {
        const optimized = getOptimizedImageUrl(student.image, 140, 140);
        preloadImage(optimized);
      }
    });
  }, [paginatedStudents]);

  const handlePageChange = (p) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", "1");
        return next;
      },
      { replace: true }
    );
  };

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", "1");
        return next;
      },
      { replace: true }
    );
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

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedYear("all");
    handlePageChange(1);
  };

  return (
    <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
      <div className="flex flex-col w-full flex-1 font-body-md text-body-md text-on-surface">
        {/* SECTION 1: HERO & METRICS (Background: #f1f3ff) */}
        <FormerStudentHero totalCount={allStudents.length} />

        {/* SECTION 2: ALUMNI DIRECTORY, FILTER & CARDS (Background: white) */}
        <section className="w-full bg-white py-10 sm:py-14 lg:py-16 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Search & Batch Year Filter Toolbar */}
            <FormerStudentFilter
              availableYears={availableYears}
              onSearchChange={handleSearchChange}
              onSelectYear={handleSelectYear}
              resultCount={filteredStudents.length}
              searchQuery={searchQuery}
              selectedYear={selectedYear}
            />

            {/* Alumni Grid Cards */}
            <FormerStudentCards
              isLoading={isLoading}
              onOpenDetails={setSelectedStudent}
              onResetFilters={handleResetFilters}
              students={paginatedStudents}
            />

            {/* Pagination Strip */}
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

      {/* Details Modal */}
      <FormerStudentModal
        isOpen={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
        student={selectedStudent}
      />
    </main>
  );
};

export default FormerStudents;
