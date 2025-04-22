import React from "react";
import { useQuery } from "@tanstack/react-query";
import academicsServices from "../services/academics.services";
import Error from "../../../components/Error";
import NoDataFound from "../../../components/NoDataFound";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";

const AllAcademics = () => {
  const navigate = useNavigate();
  const { isPending, data, isError } = useQuery({
    queryKey: ["academics"],
    queryFn: academicsServices.getAllAcademic,
  });

  const handleViewDetails = (id) => {
    navigate(`/academic/${id}`);
  };

  return (
    <div className="space-y-8">
      {isPending && (
        <div className="flex justify-center py-16">
          <Loader size="lg" />
        </div>
      )}

      {isError && <Error fullWidth />}

      {data?.data?.data?.length === 0 ? (
        <div className="bg-yellow-900/20 border border-yellow-800/50 text-yellow-300 p-6 rounded-xl text-center text-lg shadow-lg">
          <NoDataFound message="No academic data available" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.data
            ?.sort(
              (a, b) => new Date(a.class_created) - new Date(b.class_update)
            )
            .map((item) => (
              <div
                key={item.id}
                className="group relative bg-gradient-to-br p-6 rounded-2xl shadow-xl bg-gray-700 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => handleViewDetails(item.id)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full filter blur-3xl"></div>

                <div className="relative flex flex-col h-full">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-3 rounded-xl shadow-md">
                      <FaChalkboardTeacher className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-100 group-hover:text-cyan-400 transition-colors duration-300">
                        {item.class_name}
                      </h3>
                      <h4 className="text-gray-400 mt-1">{item.class_title}</h4>
                    </div>
                  </div>

                  <div className="mt-auto border-gray-700/50 group-hover:border-cyan-400/30 transition-colors duration-300">
                    <button>📄 বিস্তারিত দেখুন</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AllAcademics;
