import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ErrorDisplay from "../../../components/Error";
import Loader from "../../../components/Loader";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import academicsServices from "../services/academics.services";

const AllAcademics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const page = Math.max(1, Number(rawPage) || 1);

  useEffect(() => {
    if (!rawPage) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", "1");
          return next;
        },
        { replace: true }
      );
    }
  }, [rawPage, setSearchParams]);

  const handlePageChange = (p) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

  const { isPending, data, isError } = useQuery({
    queryKey: ["academics", page],
    queryFn: () => academicsServices.getAllAcademic(page),
  });

  const classes = data?.data?.data || data?.data?.results || [];
  const totalCount = data?.data?.count || classes.length;
  const totalPages = data?.data?.total_pages || Math.ceil(totalCount / 9);

  if (isPending) return <Loader />;
  if (isError) return <ErrorDisplay errorMessage="একাডেমিক তথ্য লোড করতে সমস্যা হয়েছে।" />;
  if (classes.length === 0) return <NoDataFound />;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes
          .sort((a, b) => new Date(b.class_created) - new Date(a.class_created))
          .map((item) => (
            <Link
              key={item.id}
              to={`/academic/${item.id}`}
              className="group flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-150 hover:shadow-md hover:border-slate-300"
            >
              {/* Icon + Title */}
              <div className="flex items-start gap-3 mb-4">
                <div className="h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug font-display">
                    {item.class_name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 truncate font-sans">
                    {item.class_title}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 font-mono uppercase">ছাত্র সংখ্যা</p>
                  <p className="text-sm font-semibold text-slate-900 font-mono">
                    {item.student_count || "০"}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:gap-1.5 transition-all">
                  বিস্তারিত
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllAcademics;