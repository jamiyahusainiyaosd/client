import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";
import Loader from "../../../components/Loader";
import { baseUrl } from "../../../constants/env.constants";
import Time from "../../../utils/formateData";

const fetchFinancialReports = async () => {
    const response = await axios.get(`${baseUrl}/financialReport`);
    return response.data;
};

const handleDownload = async (fileUrl, fileName) => {
    try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Download failed:", error);
    }
};

const FinancialReport = () => {
    const { data: reports, isLoading, isError } = useQuery({ queryKey: ["financialReports"], queryFn: fetchFinancialReports });
    const [selectedImage, setSelectedImage] = useState(null);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div className="text-center text-red-500">ডাটা লোড করতে সমস্যা হয়েছে!</div>;
    }

    if (!reports || reports.length === 0) {
        return <div className="text-center text-red-500 text-xl">কোনো প্রতিবেদন প্রকাশ করা হয়নি।</div>;
    }

    return (
        <div className="space-y-4">
            {reports.map((report) => (
                <div key={report.id} className="border text-justify space-y-3 p-3 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold">{report.finanicialReportName}</h3>
                    <p className="mt-2 text-lg">{report.finanicialReportDescription}</p>
                    <p className="text-md">🗓️ প্রকাশের তারিখ : {Time(report.finanicialReportCreate)}</p>
                    <p className="text-md">🗓️ আপডেটের তারিখ : {Time(report.finanicialReportUpdate)}</p>

                    <img
                        className="mt-5 w-96 cursor-pointer"
                        src={report.finanicialReportImage}
                        alt={report.finanicialReportName}
                        onClick={() => setSelectedImage(report.finanicialReportImage)}
                    />

                    <div className="flex mt-2">
                        <a
                            className="bg-green-500 text-white px-3 py-1 flex items-center gap-2 rounded hover:bg-green-700 transition"
                            onClick={() => handleDownload(report.finanicialReportImage, `${report.finanicialReportName}.jpg`)}
                        >
                            <FaDownload /> ডাউনলোড
                        </a>
                    </div>
                </div>
            ))}

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
        </div>
    );
};

export default FinancialReport;