import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination"; 
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

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" variant="pulse" />
      </div>
    );
  }

  if (isError) {
    return <Error message="বই লোড করতে সমস্যা হয়েছে!" />;
  }

  const totalPages = Math.ceil(books?.length / itemsPerPage) || 0;
  const currentBooks =
    books?.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    ) || [];

  return (
    <div className="space-y-8">
      {books?.length === 0 ? (
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
          <NoDataFound message="কোনো বই পাওয়া যায়নি" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-black text-white dark:bg-white dark:text-black p-3 rounded-lg shadow-md">
                      <FaBook className="text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                        {book.bookTitle}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        <span className="font-medium">লেখক:</span>{" "}
                        {book.authorName}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                      <span className="font-medium">বিষয়:</span>{" "}
                      {book.bookDescription}
                    </p>
                  </div>

                  <div className="mt-4 aspect-w-3 aspect-h-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src={book.bookKobarImg}
                      alt={book.bookTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              items={books}
              itemsPerPage={itemsPerPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BookIntroduction;
