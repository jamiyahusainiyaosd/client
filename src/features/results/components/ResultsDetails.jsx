import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaDownload, FaTimes } from "react-icons/fa";
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

    if (isLoading) return <Loader />;
    if (!result) return <p className="text-center text-red-500 mt-10">ফলাফল খুঁজে পাওয়া যায়নি!</p>;

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

    return (
        <section>
            <div className="p-6 border rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold">{result.studentClassName}</h2>
                <p>📅 রেজাল্ট ক্রিয়েটেড : {Time(result.resultCreatedAt)}</p>
                <p>📅 রেজাল্ট আপডেটেড : {Time(result.resultUpdatedAt)}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {result.images?.length > 0 ? (
                        result.images.map((image, index) => (
                            <div key={index} className="relative border p-3 rounded-2xl">
                                <img
                                    src={image.resultsSheetImg}
                                    alt="ফলাফল"
                                    className="w-full h-48 rounded shadow cursor-pointer"
                                    onClick={() => setSelectedImage(image.resultsSheetImg)}
                                />
                                <div className="flex justify-center mt-2">
                                    <a className="bg-green-500 text-white px-3 py-1 flex items-center gap-2 rounded hover:bg-green-700 transition" onClick={() => handleDownload(image.resultsSheetImg, `result_${index}.jpg`)}>
                                        <FaDownload /> ডাউনলোড
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-red-500 font-bold">❌ ফলাফল প্রকাশ করা হয় নি</p>
                    )}
                </div>
                <br />
                <button onClick={() => navigate(-1)}>🔙 ফিরে যান</button>
            </div>

            {/* ইমেজ ভিউ মোডাল */}
            {selectedImage && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="relative">
                        <img src={selectedImage} alt="ফলাফল" className="w-auto max-h-screen rounded-lg shadow-lg" />
                        <a
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FaTimes size={20} />
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ResultsDetails;