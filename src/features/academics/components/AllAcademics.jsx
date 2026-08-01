import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ErrorDisplay from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import academicsServices from "../services/academics.services";

const AllAcademics = () => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["academics"],
    queryFn: academicsServices.getAllAcademic,
  });

  const classes = data?.data?.data || [];

  if (isPending) return <Loader />;
  if (isError) return <ErrorDisplay errorMessage="একাডেমিক তথ্য লোড করতে সমস্যা হয়েছে।" />;
  if (classes.length === 0) return <NoDataFound />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {classes
        .sort((a, b) => new Date(b.class_created) - new Date(a.class_created))
        .map((item) => (
          <Link
            key={item.id}
            to={`/academic/${item.id}`}
            className="group flex flex-col rounded-2xl border border-slate-200/80  bg-white/70  backdrop-blur-sm p-5 hover:border-emerald-200  hover:bg-white  hover:shadow-sm transition-all duration-200"
          >
            {/* Icon + Title */}
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-emerald-50  text-emerald-600  group-hover:bg-emerald-100  transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900  group-hover:text-emerald-700  transition-colors leading-snug">
                  {item.class_name}
                </h3>
                <p className="text-xs text-slate-400  mt-0.5 truncate">
                  {item.class_title}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100 ">
              <div>
                <p className="text-[10px] text-slate-400 ">ছাত্র সংখ্যা</p>
                <p className="text-sm font-semibold text-slate-800 ">
                  {item.student_count || "০"}
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600  group-hover:gap-2 transition-all">
                বিস্তারিত
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default AllAcademics;