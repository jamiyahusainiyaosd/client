import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../constants/env.constants";
import Loader from "../../../components/Loader";
import Time from "../../../utils/formateData";

const fetchBooks = async () => {
    const response = await axios.get(`${baseUrl}/book`);
    return response.data;
};

const BookIntroduction = () => {
    const { data: books, isLoading, isError } = useQuery({ queryKey: ["books"], queryFn: fetchBooks });
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    useEffect(() => {
        setCurrentPage(0);
    }, [books]);

    if (isLoading) return <Loader />;
    if (isError) return <p className="text-center text-red-500">বই লোড করতে সমস্যা হয়েছে!</p>;

    const totalPages = Math.ceil(books.length / itemsPerPage);
    const currentBooks = books.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <>
            <section>
                {books.length === 0 ? (
                    <p className="text-center text-red-500">❌ কোনো বই পাওয়া যায়নি!</p>
                ) : (
                    <div className="p-6 rounded-lg border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentBooks.map((book) => (
                                <div key={book.id} className="overflow-hidden border p-4 rounded-xl shadow-2xl relative cursor-pointer space-y-3">
                                    <h1 className="text-2xl"><b>লেখক ➝</b> {book.authorName}</h1>
                                    <h3 className="text-xl"><b>বইয়ের নাম ➝</b> {book.bookTitle}</h3>
                                    <p className="text-sm"><b>যে বিষয়ে বই লিখা ➝</b> {book.bookDescription}</p>
                                    <p className="text-sm"><b>এড করার তারিখ ➝</b> 🗓️ {Time(book.bookCreatedAt)}</p>
                                    <p className="text-sm"><b>আপডেট করার তারিখ ➝</b> 🗓️ {Time(book.bookUpdatedAt)}</p>
                                    <img src={book.bookKobarImg} alt={book.bookTitle} className="w-full h-96 transition-transform hover:scale-105 cursor-pointer" onClick={() => setSelectedImage(book.bookKobarImg)} />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-6">
                            <button className={`px-4 py-2 mx-2 rounded-lg ${currentPage === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white`} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>◀️ আগের বই</button>
                            <button className={`px-4 py-2 mx-2 rounded-lg ${currentPage === totalPages - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white`} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>পরের বই ▶️</button>
                        </div>
                    </div>
                )}
            </section>
            {selectedImage && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
                    <div className="relative">
                        <a className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-lg" onClick={() => setSelectedImage(null)}>❌</a>
                        <img src={selectedImage} alt="Selected Book" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
                    </div>
                </div>
            )}
        </>
    );
};

export default BookIntroduction;