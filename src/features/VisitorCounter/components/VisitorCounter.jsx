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
    <div className="flex items-center justify-center px-4 bg-[rgb(31,41,60)] mt-28">
      <div className="bg-[rgb(41,51,70)] rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-[rgb(61,71,90)]">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">
          মোট ব্যাবহারকারী
        </h2>
        <p className="text-5xl font-extrabold text-indigo-400 mb-6">
          {data.count}
        </p>

        <div className="mt-6 flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-500 opacity-70"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
