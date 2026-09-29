import React from "react";
import { useSearchParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const toBengaliNumber = (num) => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num)
    .split("")
    .map((d) => (bengaliDigits[d] !== undefined ? bengaliDigits[d] : d))
    .join("");
};

const Pagination = ({
  page,
  currentPage,
  onPageChange,
  setCurrentPage,
  totalPages = 0,
  totalCount,
  totalItems,
  pageSize,
  itemsPerPage = 9,
  useBengaliDigits = false,
  className = "",
  showDetails = true,
  extraNote = "",
  syncUrl = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = parseInt(searchParams.get("page") || "", 10);
  const activePage = Math.max(1, Number(page ?? currentPage ?? (isNaN(urlPage) ? 1 : urlPage)));
  const changeHandler = onPageChange ?? setCurrentPage;

  const count = totalCount ?? totalItems ?? 0;
  const size = pageSize ?? itemsPerPage ?? 9;
  const calculatedTotalPages =
    totalPages > 0
      ? totalPages
      : count > 0
      ? Math.ceil(count / size)
      : 1;

  if (calculatedTotalPages <= 1 && count <= size) return null;

  const start = count > 0 ? (activePage - 1) * size + 1 : 1;
  const end = count > 0 ? Math.min(count, activePage * size) : size;

  const handlePageClick = (p) => {
    if (p < 1 || p > calculatedTotalPages || p === activePage) return;
    if (changeHandler) {
      changeHandler(p);
    }
    if (syncUrl && searchParams.get("page") !== String(p)) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(p));
        return next;
      });
    }
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (calculatedTotalPages <= 7) {
      for (let i = 1; i <= calculatedTotalPages; i++) pages.push(i);
    } else {
      if (activePage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", calculatedTotalPages);
      } else if (activePage >= calculatedTotalPages - 3) {
        pages.push(
          1,
          "...",
          calculatedTotalPages - 4,
          calculatedTotalPages - 3,
          calculatedTotalPages - 2,
          calculatedTotalPages - 1,
          calculatedTotalPages
        );
      } else {
        pages.push(
          1,
          "...",
          activePage - 1,
          activePage,
          activePage + 1,
          "...",
          calculatedTotalPages
        );
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-md mt-space-sm ${className}`}
    >
      {/* Left count */}
      {showDetails && (
        <div className="font-body-sm text-body-sm text-secondary">
          Showing{" "}
          <span className="font-semibold text-on-surface font-mono">
            {useBengaliDigits ? toBengaliNumber(start) : start}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-on-surface font-mono">
            {useBengaliDigits ? toBengaliNumber(end) : end}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-on-surface font-mono">
            {useBengaliDigits ? toBengaliNumber(count || end) : count || end}
          </span>{" "}
          results
          {extraNote ? ` ${extraNote}` : ""}
        </div>
      )}

      {/* Right controls */}
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <button
          type="button"
          aria-label="Previous Page"
          disabled={activePage <= 1}
          onClick={() => handlePageClick(activePage - 1)}
          className="w-9 h-9 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <FiChevronLeft size={16} />
        </button>

        {/* Page buttons */}
        {pages.map((p, idx) => {
          if (p === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-8 h-9 flex items-center justify-center text-secondary text-xs font-mono select-none"
              >
                ...
              </span>
            );
          }

          const isActive = activePage === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => handlePageClick(p)}
              className={`w-9 h-9 rounded-lg font-label-md text-label-md flex items-center justify-center font-mono transition-colors cursor-pointer ${
                isActive
                  ? "bg-on-secondary-fixed text-surface-container-lowest font-bold shadow-xs"
                  : "bg-surface-container-low text-on-surface hover:bg-surface-container"
              }`}
            >
              {useBengaliDigits ? toBengaliNumber(p) : p}
            </button>
          );
        })}

        {/* Next button */}
        <button
          type="button"
          aria-label="Next Page"
          disabled={activePage >= calculatedTotalPages}
          onClick={() => handlePageClick(activePage + 1)}
          className="w-9 h-9 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;