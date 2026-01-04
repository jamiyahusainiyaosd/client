import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Phone, GraduationCap, ArrowUpRight } from "lucide-react";
import NoDataFound from "../../../components/NoDataFound";
import Pagination from "../../../components/Pagination";
import { useFormerStudents } from "../../../features/formerStudent/services/formerStudent.services";
import Loader from "../../../components/Loader";

const PAGE_SIZE = 12;

export default function FormerStudents() {
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);

  const { data, isLoading, isError } = useFormerStudents({
    page,
    page_size: PAGE_SIZE,
  });

  const items = data?.items || [];
  const meta = data?.meta || {};

  const totalPages =
    meta?.total_pages || (meta?.count ? Math.ceil(meta.count / PAGE_SIZE) : 1);

  if (isLoading) return <Loader />;
  if (isError) return <NoDataFound />;

  return (
    <section className="pb-4">
      {/* Section title (optional) */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-50">
            সাবেক ছাত্র
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            মোট: {meta?.count ?? items.length}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <Link
              key={x.id}
              className="
                group relative overflow-hidden rounded-3xl
                border border-emerald-100/80 dark:border-emerald-700/40
                bg-white/90 dark:bg-slate-900/70
                shadow-[0_12px_40px_rgba(2,6,23,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
                backdrop-blur
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(2,6,23,0.12)]
              "
            >
              {/* subtle gradient glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-emerald-600/15 blur-3xl" />
              </div>

              <div className="relative p-5">
                {/* top row */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={x.image || "/default-user.png"}
                      alt={x.name}
                      className="
                        h-14 w-14 rounded-2xl object-cover
                        ring-2 ring-emerald-200 dark:ring-emerald-600/50
                        shadow-sm
                      "
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-base font-bold text-slate-900 dark:text-slate-50">
                          {x.name}
                        </p>

                        {x.current ? (
                          <span
                            className="
                              mt-1 inline-flex max-w-full truncate
                              items-center rounded-full
                              bg-emerald-50 text-emerald-700
                              dark:bg-emerald-900/30 dark:text-emerald-200
                              px-2.5 py-1 text-xs font-semibold
                            "
                            title={x.current}
                          >
                            {x.current}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {/* info list */}
                <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-[2px] h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <p className="line-clamp-2">{x.address}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <p className="font-medium">{x.mobile}</p>
                  </div>

                  {x.pass_year ? (
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <p>পাশের সাল: {x.pass_year}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => setSp({ page: String(p) })}
        />
      </div>
    </section>
  );
}
