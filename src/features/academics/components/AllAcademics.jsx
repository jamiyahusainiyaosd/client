import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import academicsServices from "../services/academics.services";
import Error from "../../../components/Error";
import NoDataFound from "../../../components/NoDataFound";
import Loader from "../../../components/Loader";
import { HiOutlineAcademicCap } from "react-icons/hi";

const AllAcademics = () => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["academics"],
    queryFn: academicsServices.getAllAcademic,
  });

  return (
    <div className="space-y-8">
      {isPending && (
        <div className="flex justify-center py-16">
          <Loader size="lg" variant="pulse" />
        </div>
      )}

      {isError && <Error fullWidth />}

      {data?.data?.data?.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <NoDataFound message="কোনো একাডেমিক ক্লাস পাওয়া যায়নি" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.data?.map((item) => (
            <Link 
              key={item.id} 
              to={`/academic/${item.id}`}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-black text-white dark:bg-white dark:text-black p-3 rounded-lg shadow-md">
                    <HiOutlineAcademicCap className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                      {item.class_name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.class_title}</p>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">ছাত্র সংখ্যা</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.student_count || '০'}
                    </p>
                  </div>
                  <div className="text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                    বিস্তারিত দেখুন →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAcademics;