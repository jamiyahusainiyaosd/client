import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorDisplay from "../../../components/Error";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import teacherService from "../services/teacher.services";
import Teacher from "./Teacher";

const Teachers = () => {
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
    queryKey: ["teachers", page],
    queryFn: () => teacherService.getAllTeacher(page),
  });

  const refineData = data?.data?.data || data?.data?.results || [];
  const totalCount = data?.data?.count || refineData.length;
  const totalPages = data?.data?.total_pages || Math.ceil(totalCount / 9);

  if (isPending) return <Loader />;
  if (isError) return <ErrorDisplay errorMessage="শিক্ষক তালিকা লোড করতে সমস্যা হয়েছে।" />;

  return (
    <div className="space-y-6">
      {refineData && (
        <>
          {/* Count */}
          <p className="text-xs text-slate-500 font-mono">
            মোট{" "}
            <span className="font-semibold text-slate-900 font-mono">
              {totalCount}
            </span>{" "}
            জন শিক্ষক
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {refineData.map((teacher, index) => (
              <Teacher key={teacher.id} {...teacher} priority={index < 6} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Teachers;