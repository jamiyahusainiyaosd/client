import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../constants/env.constants";
import PageTitle from "../utils/PageTitle";

const AcademicDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/academics/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        if (result && result.data) {
          setData(result.data);
        } else if (result) {
          setData(result);
        } else {
          setError("❌ কোনো তথ্য পাওয়া যায়নি।");
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("ডাটা লোড করতে সমস্যা হয়েছে!");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClassDetail();
    }
  }, [id, setError]);

  const backAcademic = () => {
    navigate("/academic/");
  };

  return (
    <>
      <PageTitle key={"academicPage"} title={"Academic"} />
      <div className="max-w-[1144px] w-[95%] mx-auto py-8">
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
          <div className="p-14 border rounded-lg shadow-2xl cursor-pointer">
            <h1 className="text-3xl font-semibold">{data.class_name}</h1>
            <br />
            <div className="leading-10">
              <h2 className="text-xl font-semibold">{data.class_title}</h2>
              <p>{data.class_description}</p>
              <p>
                আসন সংখ্যা: {data.number_seat} | ছাত্র সংখ্যা:{" "}
                {data.student_count}
              </p>
              <p>
                🗓️ এড করার তারিখ:{" "}
                {new Date(data.class_created).toLocaleDateString("bn-BD")}
              </p>
              <p>
                🗓️ আপডেট করার তারিখ:{" "}
                {new Date(data.class_update).toLocaleDateString("bn-BD")}
              </p>
            </div>

            <button onClick={() => backAcademic()} className="mt-4 button1">
              🔙 ফিরে যান
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AcademicDetail;
