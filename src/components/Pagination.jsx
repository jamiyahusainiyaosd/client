// src/components/Pagination.jsx
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  totalCount,
}) => {
  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      {/* Pagination Buttons */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 disabled:opacity-40 disabled:hover:bg-transparent transition flex items-center gap-1 text-emerald-700 dark:text-emerald-300 shadow-sm"
        >
          <FiChevronLeft />
          পূর্ববর্তী
        </button>

        {/* First Page */}
        {pages[0] > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition text-emerald-700 dark:text-emerald-300 shadow-sm"
            >
              1
            </button>
            {pages[0] > 2 && <span className="text-slate-500 px-2">...</span>}
          </>
        )}

        {/* Middle Pages */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`px-4 py-2 rounded-xl shadow-sm transition 
                  ${
                    currentPage === p
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border-emerald-600 shadow-emerald-700/40"
                      : "bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                  }`}
          >
            {p}
          </button>
        ))}

        {/* Last Page */}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="text-slate-500 px-2">...</span>
            )}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition text-emerald-700 dark:text-emerald-300 shadow-sm"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 disabled:opacity-40 transition flex items-center gap-1 text-emerald-700 dark:text-emerald-300 shadow-sm"
        >
          পরবর্তী
          <FiChevronRight />
        </button>
      </div>

      {/* Count Info */}
      {totalCount && (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          পৃষ্ঠা {currentPage} এর {totalPages} — মোট {totalCount} টি ছবি
        </p>
      )}
    </div>
  );
};

export default Pagination;
