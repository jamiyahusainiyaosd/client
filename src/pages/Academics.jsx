import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/env.constants";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Academics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcademicData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/academics`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const sortedData = result.data.sort(
          (a, b) => new Date(a.class_created) - new Date(b.class_created)
        );
        setData(sortedData);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("ডাটা লোড করতে সমস্যা হয়েছে!");
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicData();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/academics/${id}`);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>একাডেমিক</title>
        </Helmet>
      </HelmetProvider>
      <section className="max-w-[1144px] w-[95%] mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          একাডেমিক তথ্য
        </h2>

        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold" style={{ color: "red" }}>
                পেজ লোড হচ্ছে অপেক্ষা করুন...
              </h1>
            </div>
            <div className="mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#3498db"
                  strokeWidth="5"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#2ecc71"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset="75"
                  transform="rotate(-90 50 50)"
                  className="animate-spin"
                />
              </svg>
            </div>
          </div>
        ) : (
          <>
            {error && <p className="text-center text-red-500">❌ {error}</p>}
            {data.length === 0 && !error && (
              <p className="text-center">❌ কোনো তথ্য পাওয়া যায়নি।</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="p-5 border rounded-lg shadow-2xl cursor-pointer"
                >
                  <div className="leading-14">
                    <h3 className="text-2xl font-semibold">
                      {item.class_name}
                    </h3>
                    <h3 className="text-md font-semibold">
                      {item.class_title}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleViewDetails(item.id)}
                    className="mt-4"
                  >
                    বিস্তারিত দেখুন
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Academics;
