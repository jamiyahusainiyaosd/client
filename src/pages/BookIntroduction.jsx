import { useEffect, useState } from "react";
import { baseUrl } from "../constants/env.constants";
import PageTitle from "../utils/PageTitle";

const BookIntroduction = () => {
    const [book, setbook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchbook = async () => {
            try {
                const response = await fetch(`${baseUrl}/book`);
                if (!response.ok) {
                    throw new Error("Server Error: " + response.status);
                }
                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format. Expected an array.");
                }

                setbook(data);
            } catch (error) {
                console.error("বই লোড করতে সমস্যা হয়েছে:", error);
                setError("বই লোড করতে সমস্যা হয়েছে!");
            } finally {
                setLoading(false);
            }
        };
        fetchbook();
    }, []);

    const totalPages = Math.ceil(book.length / itemsPerPage);
    const currentbook = book.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <>
            <PageTitle title="Book Introduction" />
            <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
                <h1 className="text-2xl font-bold text-center mb-8">বুজুর্গানে দ্বীনের লিখা বই সমূহ</h1>
                {loading ? (
                    <div className="mt-20 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                            <circle cx="50" cy="50" r="45" stroke="#3498db" strokeWidth="5" fill="none" />
                            <circle cx="50" cy="50" r="45" stroke="#2ecc71" strokeWidth="5" fill="none" strokeDasharray="283" strokeDashoffset="75" transform="rotate(-90 50 50)" className="animate-spin" />
                        </svg>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : book.length === 0 ? (
                    <p className="text-center text-red-500">❌ কোনো বই পাওয়া যায়নি!</p>
                ) : (
                    <div className="p-6 border rounded-lg shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentbook.map((book) => (
                                <div key={book.id} className="overflow-hidden p-4 rounded-xl shadow-2xl relative cursor-pointer space-y-3">
                                    <h1 className="text-2xl"><b>লেখক ➝</b> {book.authorName}</h1>
                                    <h3 className="text-xl"><b>বইয়ের নাম ➝</b> {book.bookTitle}</h3>
                                    <p className="text-sm"><b>যে বিষয়ে বই লিখা ➝</b> {book.bookDescription}</p>
                                    <p className="text-sm">
                                        <b>এড করার তারিখ ➝</b> 🗓️ {new Date(book.bookCreatedAt).toLocaleString("bn-BD", { dateStyle: "long", timeStyle: "short" })}
                                    </p>
                                    <p className="text-sm">
                                        <b>আপডেট করার তারিখ ➝</b> 🗓️ {new Date(book.bookUpdatedAt).toLocaleString("bn-BD", { dateStyle: "long", timeStyle: "short" })}
                                    </p>
                                    {/* ইমেজ ক্লিক করলে সেটার ভিউ দেখাবে */}
                                    <img src={book.bookKobarImg} alt={book.bookTitle} className="w-full h-96 transition-transform hover:scale-105 cursor-pointer" onClick={() => setSelectedImage(book.bookKobarImg)} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-6">
                            <button className={`px-4 py-2 mx-2 rounded-lg ${currentPage === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white`} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>◀️ আগের বই</button>

                            <button className={`px-4 button1 py-2 mx-2 rounded-lg ${currentPage === totalPages - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white`} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>পরের বই ▶️</button>
                        </div>
                    </div>
                )}
            </section>

            {/* ইমেজ ভিউ মডাল */}
            {selectedImage && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
                    <div className="relative">
                        {/* ক্রস বাটন */}
                        <a className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-lg" onClick={() => setSelectedImage(null)}>❌</a>
                        {/* বড় ইমেজ */}
                        <img src={selectedImage} alt="Selected Book" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
                    </div>
                </div>
            )}
        </>
    );
};

export default BookIntroduction;