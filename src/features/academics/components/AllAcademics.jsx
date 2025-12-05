// src/features/academics/components/AllAcademics.jsx
import { useQuery } from "@tanstack/react-query";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";
import Error from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import academicsServices from "../services/academics.services";

const AllAcademics = () => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["academics"],
    queryFn: academicsServices.getAllAcademic,
  });

  const classes = data?.data?.data || [];

  if (isPending)
    return (
      <div className="flex justify-center py-16">
        <Loader size="lg" />
      </div>
    );

  if (isError) return <Error fullWidth />;

  if (classes.length === 0)
    return (
      <div className="bg-white/90 dark:bg-slate-900/90 shadow-xl rounded-3xl p-6 
      border border-emerald-100/70 dark:border-emerald-700">
        <NoDataFound message="কোনো একাডেমিক ক্লাস পাওয়া যায়নি" />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {classes
        ?.sort((a, b) => new Date(b.class_created) - new Date(a.class_created))
        .map((item) => (
          <Link
            key={item.id}
            to={`/academic/${item.id}`}
            className="group relative bg-white/90 dark:bg-slate-900/90 
            border border-emerald-100/70 dark:border-emerald-700/40 
            rounded-3xl shadow-md shadow-emerald-800/10 hover:shadow-emerald-600/40 
            transition-all duration-300 p-6 overflow-hidden hover:-translate-y-1"
          >
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/10 
              to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Icon + Title */}
            <div className="flex items-start gap-4 mb-5">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-400 text-white 
                dark:bg-gradient-to-br dark:from-emerald-800 dark:to-emerald-600 
                p-3 rounded-xl shadow-lg">
                <HiOutlineAcademicCap className="text-2xl" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 
                  group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition">
                  {item.class_name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{item.class_title}</p>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-auto flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">ছাত্র সংখ্যা</p>
                <p className="font-semibold text-slate-900 dark:text-slate-50">
                  {item.student_count || "০"}
                </p>
              </div>

              <p className="text-emerald-600 dark:text-emerald-300 font-medium group-hover:underline">
                বিস্তারিত →
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default AllAcademics;
