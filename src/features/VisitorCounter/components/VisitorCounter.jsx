import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../../components/Loader";
import { baseUrl } from "../../../constants/env.constants";

const fetchVisitorCount = async () => {
  const response = await axios.get(`${baseUrl}/visitWebsite`);
  return response.data;
};

const incrementVisitorCount = async () => {
  const response = await axios.post(`${baseUrl}/visitWebsite`);
  return response.data;
};

const VisitorCounter = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["visitor-count"],
    queryFn: fetchVisitorCount,
  });

  const mutation = useMutation({
    mutationFn: incrementVisitorCount,
    onError: () => {
      toast.error("Failed to increment visitor count");
    },
  });

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      mutation.mutate();
      sessionStorage.setItem("hasVisited", "true");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error("Error fetching visitor count");
    return (
      <p className="text-red-500 text-center mt-10 text-lg">
        Something went wrong!
      </p>
    );
  }

  return (
    <div className="rounded-xl shadow-lg bg-gray-700 hover:shadow-xl transition-shadow duration-300 p-10 mt-28">
      <div className="flex items-center justify-center gap-3">
        {/* Animated Visitor Icon */}
        <div className="relative">
          <div className="bg-indigo-900/50 p-10 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-indigo-300 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3 animate-ping"></div>
        </div>

        {/* Count Display */}
        <div>
          <p className="text-2xl font-bold text-gray-100 tracking-wider">
            মোট ব্যাবহারকারী
          </p>
          <div className="flex items-baseline gap-1">
            <p className="text-4xl font-bold text-indigo-300">
              {data?.count ?? "---"}
            </p>
            <span className="text-xl text-green-400 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              +{Math.floor(data?.count / 100) || 1}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
