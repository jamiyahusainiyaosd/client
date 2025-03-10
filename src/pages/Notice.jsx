import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { baseUrl } from "../constants/env.constants";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${baseUrl}/notices`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setNotices(data);
        } else {
          setNotices([]);
          setError("কোনো নোটিশ পাওয়া যায়নি!");
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("ডাটা লোড করতে সমস্যা হয়েছে!");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>নোটিশ</title>
        </Helmet>
      </HelmetProvider>
      <section className="max-w-[1144px] w-[95%] mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-8">নোটিশ সমূহ</h2>

        {/* লোডিং হলে SVG দেখাবে */}
        {loading && (
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
        )}

        {/* লোডিং শেষ হলে নোটিশ দেখাবে */}
        {!loading && error && (
          <p className="text-center text-red-500">{error}</p>
        )}
        {!loading && notices.length === 0 && (
          <p className="text-center text-gray-500">কোনো নোটিশ পাওয়া যায়নি।</p>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.map((notice) => (
              <div key={notice.id} className="p-4 border rounded-lg shadow-2xl">
                <h3 className="text-2xl font-semibold">{notice.title}</h3>
                <p className="text-sm mt-5 text-gray-500">
                  🗓️ প্রকাশের তারিখ : {formatDate(notice.created_at)}
                </p>
                <button className="button1 mt-5">
                  <Link to={`/notices/${notice.id}`} className="text-white">
                    বিস্তারিত দেখুন
                  </Link>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Notice;