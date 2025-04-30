import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaDownload, FaTimes, FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import Time from "../../../utils/formateData";
import ResultsServices from "../services/results.services";

const ResultsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const { data: result, isLoading } = useQuery({
        queryKey: ["resultDetails", id],
        queryFn: async () => {
            const response = await ResultsServices.getOneResults(id);
            return response.data;
        }
    });

    const handleDownload = async (fileUrl, fileName) => {
        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName || 'downloaded_file';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        } catch (err) {
            console.error("ডাউনলোড ব্যর্থ হয়েছে: ", err);
        }
    };

    if (isLoading) return (
        <div className="flex justify-center py-12">
            <Loader />
        </div>
    );

    if (!result) return (
        <div className="bg-yellow-900/50 text-yellow-300 p-4 rounded-lg text-center">
            ফলাফল খুঁজে পাওয়া যায়নি!
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600">
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">{result.studentClassName}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                        <FaCalendarAlt className="text-blue-300" />
                        <span>প্রকাশের তারিখ: {Time(result.resultCreatedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <FaCalendarAlt className="text-blue-300" />
                        <span>আপডেটের তারিখ: {Time(result.resultUpdatedAt)}</span>
                    </div>
                </div>

                {result.images?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.images.map((image, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                                <img
                                    src={image.resultsSheetImg}
                                    alt="ফলাফল"
                                    className="w-full h-64 object-contain rounded-lg shadow-md cursor-pointer hover:shadow-cyan-400/20 transition-all"
                                    onClick={() => setSelectedImage(image.resultsSheetImg)}
                                />
                                <button 
                                    className="w-full mt-3 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    onClick={() => handleDownload(image.resultsSheetImg, `result_${index}.jpg`)}
                                >
                                    <FaDownload /> ডাউনলোড
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-yellow-900/50 text-yellow-300 p-4 rounded-lg text-center">
                        ❌ ফলাফল প্রকাশ করা হয় নি
                    </div>
                )}

<button className="mt-10" onClick={() => navigate(-1)}>🔙 ফিরে যান</button>
            </div>

            {selectedImage && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/90 z-50 p-4">
                    <div className="relative max-w-4xl w-full">
                        <button
                            className="absolute -top-12 right-0 bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-full transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FaTimes size={20} />
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="ফলাফল" 
                            className="w-full max-h-[85vh] rounded-lg shadow-2xl border border-gray-700" 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsDetails;