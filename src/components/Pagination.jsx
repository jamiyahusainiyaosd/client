import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, setCurrentPage, totalPages, totalCount }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-8 flex-wrap">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
      >
        <FiChevronLeft className="text-lg mr-1" />
        পূর্ববর্তী
      </button>

      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => setCurrentPage(1)}
            className={`px-4 py-2 rounded-lg border transition-colors ${currentPage === 1
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded-lg border transition-colors ${currentPage === page
              ? 'bg-blue-500 text-white border-blue-500'
              : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
        >
          {page}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`px-4 py-2 rounded-lg border transition-colors ${currentPage === totalPages
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
      >
        পরবর্তী
        <FiChevronRight className="text-lg ml-1" />
      </button>

      {totalCount && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-0 w-full sm:w-auto text-center">
          পৃষ্ঠা {currentPage} এর {totalPages} - মোট {totalCount} টি নোটিশ
        </div>
      )}
    </div>
  );
};

export default Pagination;