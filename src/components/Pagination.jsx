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

  const btnBase =
    "h-9 min-w-9 px-3 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-150";
  const btnInactive =
    "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600";
  const btnActive =
    "bg-emerald-600 text-white border border-emerald-600 shadow-sm shadow-emerald-600/30";
  const btnNav =
    "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-col items-center gap-3 mt-8">
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        <button
          disabled={activePage === 1}
          onClick={() => goTo(activePage - 1)}
          className={`${btnBase} ${btnNav} gap-1`}
        >
          <FiChevronLeft size={14} />
          পূর্ববর্তী
        </button>

        {pages[0] > 1 && (
          <>
            <button onClick={() => goTo(1)} className={`${btnBase} ${btnInactive}`}>1</button>
            {pages[0] > 2 && <span className="text-slate-400 dark:text-slate-600 px-1 text-sm">···</span>}
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
              <span className="text-slate-400 dark:text-slate-600 px-1 text-sm">···</span>
            )}
            <button onClick={() => goTo(totalPages)} className={`${btnBase} ${btnInactive}`}>
              {totalPages}
            </button>
          </>
        )}

        <button
          disabled={activePage === totalPages}
          onClick={() => goTo(activePage + 1)}
          className={`${btnBase} ${btnNav} gap-1`}
        >
          পরবর্তী
          <FiChevronRight size={14} />
        </button>
      </div>

      {typeof totalCount === "number" && (
        <p className="text-xs text-slate-400 dark:text-slate-500">
          পৃষ্ঠা {activePage} / {totalPages}
          <span className="mx-2 text-slate-300 dark:text-slate-700">—</span>
          মোট {totalCount}
        </p>
      )}
    </div>
  );
};

export default Pagination;