import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ page, totalPages, onPageChange, totalCount }) => {
  if (!totalPages || totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 disabled:opacity-40 disabled:hover:bg-transparent transition flex items-center gap-1 text-emerald-700 dark:text-emerald-300 shadow-sm"
        >
          <FiChevronLeft />
          পূর্ববর্তী
        </button>

        {pages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition text-emerald-700 dark:text-emerald-300 shadow-sm"
            >
              1
            </button>
            {pages[0] > 2 && <span className="text-slate-500 px-2">...</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-4 py-2 rounded-xl shadow-sm transition 
              ${
                page === p
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border-emerald-600 shadow-emerald-700/40"
                  : "bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
              }`}
          >
            {p}
          </button>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="text-slate-500 px-2">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition text-emerald-700 dark:text-emerald-300 shadow-sm"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 disabled:opacity-40 transition flex items-center gap-1 text-emerald-700 dark:text-emerald-300 shadow-sm"
        >
          পরবর্তী
          <FiChevronRight />
        </button>
      </div>

      {totalCount ? (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          পৃষ্ঠা {page} / {totalPages} — মোট {totalCount}
        </p>
      ) : null}
    </div>
  );
};

export default Pagination;
