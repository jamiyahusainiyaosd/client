import { Link, useSearchParams } from "react-router-dom";
import { GraduationCap, MapPin, Phone } from "lucide-react";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import { useFormerStudents } from "../../../features/formerStudent/services/formerStudent.services";
import Loader from "../../../components/Loader";

const PAGE_SIZE = 12;

export default function FormerStudents() {
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);

  const { data, isLoading, isError } = useFormerStudents({ page, page_size: PAGE_SIZE });

  const items = data?.items || [];
  const meta = data?.meta || {};
  const totalPages =
    meta?.total_pages || (meta?.count ? Math.ceil(meta.count / PAGE_SIZE) : 1);

  if (isLoading) return <Loader />;
  if (isError) return <NoDataFound />;

  return (
    <section className="pb-4">
      {/* Section meta */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <p className="text-xs text-slate-400 ">
          মোট{" "}
          <span className="font-semibold text-slate-700 ">
            {meta?.count ?? items.length}
          </span>{" "}
          জন সাবেক ছাত্র
        </p>
      </div>

      {items.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <Link
              key={x.id}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200/80  bg-white/70  backdrop-blur-sm p-4 hover:border-emerald-200  hover:bg-white  hover:shadow-sm transition-all duration-200"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={x.image || "/default-user.png"}
                  alt={x.name}
                  className="h-12 w-12 rounded-xl object-cover border border-slate-200  group-hover:border-emerald-200  transition-colors"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900  truncate">
                  {x.name}
                </p>

                {x.current && (
                  <span className="mt-1 inline-flex items-center rounded-full bg-emerald-50  px-2 py-0.5 text-[10px] font-semibold text-emerald-700  truncate max-w-full">
                    {x.current}
                  </span>
                )}

                <div className="mt-2 space-y-1.5">
                  <div className="flex items-start gap-1.5 text-xs text-slate-500 ">
                    <MapPin className="mt-px h-3 w-3 flex-shrink-0 text-emerald-500" />
                    <span className="line-clamp-1">{x.address}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 ">
                    <Phone className="h-3 w-3 flex-shrink-0 text-emerald-500" />
                    <span>{x.mobile}</span>
                  </div>

                  {x.pass_year && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 ">
                      <GraduationCap className="h-3 w-3 flex-shrink-0 text-emerald-500" />
                      <span>পাশের সাল: {x.pass_year}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => setSp({ page: String(p) })}
      />
    </section>
  );
}
