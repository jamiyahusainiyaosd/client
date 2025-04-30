import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { baseUrl } from "../../../constants/env.constants";
import { FaBook } from "react-icons/fa";

const fetchBooks = async () => {
  const response = await axios.get(`${baseUrl}/book`);
  return response.data;
};

const BookIntroduction = () => {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    setCurrentPage(0);
  }, [books]);

  if (isLoading)
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );

  if (isError)
    return (
      <div className="bg-red-900/50 text-red-300 p-4 rounded-lg text-center">
        বই লোড করতে সমস্যা হয়েছে!
      </div>
    );

  const totalPages = Math.ceil(books?.length / itemsPerPage) || 0;
  const currentBooks =
    books?.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    ) || [];

  return (
    <div className="space-y-8 px-4">
      {books?.length === 0 ? (
        <div className="bg-yellow-900/50 text-yellow-300 p-4 rounded-lg text-center">
          ❌ কোনো বই পাওয়া যায়নি!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {currentBooks.map((book) => (
              <div
                key={book.id}
                className="bg-gray-700 p-4 md:p-6 rounded-xl shadow-lg border border-gray-600 hover:border-cyan-400 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-400 p-3 rounded-xl shadow-md">
                      <FaBook className="text-white text-2xl" />
                    </div>
                  <div>
                    <h1 className="text-lg md:text-xl font-semibold text-gray-100 line-clamp-2">
                      {book.bookTitle}
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base">
                      <span className="text-gray-200">লেখক:</span>{" "}
                      {book.authorName}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 text-sm md:text-base line-clamp-3">
                  <span className="text-gray-200">বিষয়:</span>{" "}
                  {book.bookDescription}
                </p>

                <div className="mt-auto">
                  <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-lg border border-gray-600 shadow-md">
                    <img
                      src={book.bookKobarImg}
                      alt={book.bookTitle}
                      className="w-full h-94 md:h-94"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-row justify-center gap-4 mt-8">
              <button
                className={`px-4 py-2 md:px-6 md:py-2 rounded-lg transition-all ${
                  currentPage === 0
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700 shadow-md"
                } text-white font-medium`}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
              >
                ◀️ আগের বই
              </button>
              <button
                className={`px-4 py-2 md:px-6 button1 md:py-2 rounded-lg transition-all ${
                  currentPage === totalPages - 1
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700 shadow-md"
                } text-white font-medium`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                পরের বই ▶️
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookIntroduction;