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
      <div className="flex items-center justify-between gap-3 mb-6 font-mono text-xs">
        <p className="text-slate-500">
          মোট{" "}
          <span className="font-semibold text-slate-900">
            {meta?.count ?? items.length}
          </span>{" "}
          জন সাবেক ছাত্র
        </p>
      </div>

      {items.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <div
              key={x.id}
              className="group flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-150 hover:shadow-md hover:border-slate-300"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={x.image || "/default-user.png"}
                  alt={x.name}
                  className="h-12 w-12 rounded-lg object-cover border border-slate-200 group-hover:border-slate-300 transition-colors"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate font-display">
                  {x.name}
                </p>

                {x.current && (
                  <span className="mt-1 inline-flex items-center rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 font-mono truncate max-w-full">
                    {x.current}
                  </span>
                )}

                <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
                    <span className="line-clamp-1">{x.address}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <Phone className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
                    <span>{x.mobile}</span>
                  </div>

                  {x.pass_year && (
                    <div className="flex items-center gap-2 font-mono">
                      <GraduationCap className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
                      <span>পাশের সাল: {x.pass_year}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
