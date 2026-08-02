import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({
  page,
  onPageChange,
  currentPage,
  setCurrentPage,
  totalPages = 0,
  totalCount,
  maxVisible = 5,
}) => {
  const activePage = page ?? currentPage ?? 1;
  const handleChange = onPageChange ?? setCurrentPage;

  if (!handleChange || !totalPages || totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    let start = Math.max(1, activePage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = getPages();

  const goTo = (p) => {
    const next = Math.min(totalPages, Math.max(1, p));
    if (next !== activePage) handleChange(next);
  };

  const pageSize = totalCount && totalPages ? Math.ceil(totalCount / totalPages) : 12;
  const start = totalCount ? (activePage - 1) * pageSize + 1 : 0;
  const end = totalCount ? Math.min(totalCount, activePage * pageSize) : 0;

  const btnBase =
    "h-9 min-w-[36px] px-3 flex items-center justify-center rounded-lg text-xs font-mono transition-all duration-150";
  const btnInactive =
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium";
  const btnActive =
    "bg-slate-900 text-white border border-slate-900 font-semibold shadow-sm";
  const btnNav =
    "h-9 w-9 p-0 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-slate-200/80">
      {/* Left count */}
      <div className="text-xs text-slate-500 font-mono">
        {totalCount ? (
          <>
            Showing <span className="font-semibold text-slate-900">{start}</span> to{" "}
            <span className="font-semibold text-slate-900">{end}</span> of{" "}
            <span className="font-semibold text-slate-900">{totalCount}</span> results
          </>
        ) : (
          <>
            Showing page <span className="font-semibold text-slate-900">{activePage}</span> of{" "}
            <span className="font-semibold text-slate-900">{totalPages}</span>
          </>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1.5">
        <button
          disabled={activePage === 1}
          onClick={() => goTo(activePage - 1)}
          className={btnNav}
          aria-label="Previous Page"
        >
          <FiChevronLeft size={16} />
        </button>

        {pages[0] > 1 && (
          <>
            <button onClick={() => goTo(1)} className={`${btnBase} ${btnInactive}`}>
              1
            </button>
            {pages[0] > 2 && <span className="px-1.5 text-slate-400 font-mono text-xs">...</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => goTo(p)}
            aria-current={activePage === p ? "page" : undefined}
            className={`${btnBase} ${activePage === p ? btnActive : btnInactive}`}
          >
            {p}
          </button>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="px-1.5 text-slate-400 font-mono text-xs">...</span>
            )}
            <button onClick={() => goTo(totalPages)} className={`${btnBase} ${btnInactive}`}>
              {totalPages}
            </button>
          </>
        )}

        <button
          disabled={activePage === totalPages}
          onClick={() => goTo(activePage + 1)}
          className={btnNav}
          aria-label="Next Page"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;