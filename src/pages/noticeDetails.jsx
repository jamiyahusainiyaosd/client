import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../constants/env.constants";

const NoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${baseUrl}/notices/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("নোটিশ পাওয়া যায়নি!");
        }

        const data = await response.json();
        setNotice(data);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("নোটিশের তথ্য লোড করতে সমস্যা হয়েছে!");
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeDetail();
  }, [id]);

  const backNotice = () => {
    navigate(`/notices`);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>নোটিশ বিস্তারিত</title>
        </Helmet>
      </HelmetProvider>
      <section className="max-w-[800px] w-[95%] mx-auto py-8">
        <h1 className="text-2xl font-bold text-center">
          অত্র জামিয়ার বিস্তারিত নোটিশ
        </h1>
        <br />

        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold" style={{ color: "red" }}>
                পেজ লোড হচ্ছে অপেক্ষা করুন...
              </h1>
            </div>
            <div className="mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="#3498db" strokeWidth="5" fill="none" />
                <circle cx="50" cy="50" r="45" stroke="#2ecc71" strokeWidth="5" fill="none" strokeDasharray="283" strokeDashoffset="75" transform="rotate(-90 50 50)" className="animate-spin" />
              </svg>
            </div>
          </div>
        ) : (
          <>
            {error && <p className="text-center text-red-500">{error}</p>}
            {notice ? (
              <div className="p-14 border rounded-lg shadow-2xl">
                <h2 className="text-2xl font-bold">{notice.title}</h2>
                <br />
                <p className="text-sm text-gray-500 mt-2">
                  🗓️ প্রকাশের তারিখ:{" "}
                  {new Date(notice.created_at).toLocaleDateString("bn-BD")}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  🗓️ আপডেটের তারিখ:{" "}
                  {new Date(notice.updated_at).toLocaleDateString("bn-BD")}
                </p>
                <p className="mt-4">
                  {notice.description || "এই নোটিশের বিস্তারিত তথ্য নেই।"}
                </p>
                <br />
                <button onClick={() => backNotice()} className="mt-4">
                  🔙 ফিরে যান
                </button>
              </div>
            ) : (
              <p className="text-center text-red-500">❌ নোটিশ পাওয়া যায়নি।</p>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default NoticeDetail;