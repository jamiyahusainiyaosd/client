import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Error from "../../../components/Error";
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
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["visitor-count"],
    queryFn: fetchVisitorCount,
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const mutation = useMutation({
    mutationFn: incrementVisitorCount,
    onSuccess: () => {
      queryClient.invalidateQueries(["visitor-count"]);
    },
    onError: (error) => {
      console.error("Visitor count error:", error);
      toast.error("Failed to update visitor count");
    },
  });

  useEffect(() => {
    const getSessionId = () => {
      let sessionId = sessionStorage.getItem("visitSession");
      if (!sessionId) {
        sessionId = Date.now().toString();
        sessionStorage.setItem("visitSession", sessionId);
      }
      return sessionId;
    };

    const sessionId = getSessionId();
    const lastVisit = localStorage.getItem(`lastVisit-${sessionId}`);
    const now = Date.now();

    if (!lastVisit || now - parseInt(lastVisit) > 30 * 60 * 1000) {
      mutation.mutate();
    }

    localStorage.setItem(`lastVisit-${sessionId}`, now.toString());
  }, [mutation]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader size="md" />
      </div>
    );
  }

  if (isError) {
    return <Error message="Failed to load visitor count" />;
  }

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="text-5xl font-bold text-gray-900 dark:text-white">
            {data?.count?.toLocaleString() || "0"}
          </div>
          <div className="absolute -bottom-2 right-0 text-green-600 dark:text-green-400 text-sm">
            +1 Now
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
          Total Website Visitors
        </h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Last updated: Just now
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          ওয়েবসাইটি ভিজিট করার জন্য ধন্যবাদ
        </p>
      </div>
    </div>
  );
};

export default VisitorCounter;
