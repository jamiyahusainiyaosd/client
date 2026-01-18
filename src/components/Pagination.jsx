// components/Pagination.jsx
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({
  // ✅ support both naming styles
  page,
  onPageChange,
  currentPage,
  setCurrentPage,

  totalPages = 0,
  totalCount,
  maxVisible = 5,
}) => {
  // ✅ normalize
  const activePage = page ?? currentPage ?? 1;
  const handleChange = onPageChange ?? setCurrentPage;

  // if handler missing, don't render to avoid silent failures
  if (!handleChange) return null;
  if (!totalPages || totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    let start = Math.max(1, activePage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    // ensure we always show maxVisible if possible
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = getPages();

  const goTo = (p) => {
    const next = Math.min(totalPages, Math.max(1, p));
    if (next === activePage) return;
    handleChange(next);

    // ✅ optional UX: scroll to top on page change
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          disabled={activePage === 1}
          onClick={() => goTo(activePage - 1)}
          className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 disabled:opacity-40 disabled:hover:bg-transparent transition flex items-center gap-1 text-emerald-700 dark:text-emerald-300 shadow-sm"
        >
          <FiChevronLeft />
          পূর্ববর্তী
        </button>

        {/* First page + leading ellipsis */}
        {pages[0] > 1 && (
          <>
            <button
              onClick={() => goTo(1)}
              className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition text-emerald-700 dark:text-emerald-300 shadow-sm"
            >
              1
            </button>
            {pages[0] > 2 && <span className="text-slate-500 px-2">...</span>}
          </>
        )}

        {/* Middle pages */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => goTo(p)}
            aria-current={activePage === p ? "page" : undefined}
            className={`px-4 py-2 rounded-xl shadow-sm transition 
              ${
                activePage === p
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border-emerald-600 shadow-emerald-700/40"
                  : "bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
              }`}
          >
            {p}
          </button>
        ))}

        {/* Trailing ellipsis + last page */}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="text-slate-500 px-2">...</span>
            )}
            <button
              onClick={() => goTo(totalPages)}
              className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition text-emerald-700 dark:text-emerald-300 shadow-sm"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          disabled={activePage === totalPages}
          onClick={() => goTo(activePage + 1)}
          className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 disabled:opacity-40 transition flex items-center gap-1 text-emerald-700 dark:text-emerald-300 shadow-sm"
        >
          পরবর্তী
          <FiChevronRight />
        </button>
      </div>

      {typeof totalCount === "number" ? (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          পৃষ্ঠা {activePage} / {totalPages} — মোট {totalCount}
        </p>
      ) : null}
    </div>
  );
};

export default Pagination;
