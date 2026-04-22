import { BadgeCheck, Coins, MapPin, Phone } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useExpatriateGrants } from "../../../features/expatriateGrant/services/expatriateGrant.services";
import Loader from "./../../../components/Loader";
import NoDataFound from "./../../../components/NoDataFound";
import Pagination from "./../../../components/Pagination";

const PAGE_SIZE = 12;

export default function ExpatriateGrants() {
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);

  const { data, isLoading, isError } = useExpatriateGrants({
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
      {/* Count */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
        মোট{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {meta?.count ?? items.length}
        </span>{" "}
        জন অনুদান দাতা
      </p>

      {items.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <div
              key={x.id}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm p-4 hover:border-emerald-200 dark:hover:border-emerald-800/60 hover:bg-white dark:hover:bg-slate-800/60 hover:shadow-sm transition-all duration-200"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={x.image || "/default-user.png"}
                  alt={x.name}
                  className="h-12 w-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 group-hover:border-emerald-200 dark:group-hover:border-emerald-700 transition-colors"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {x.name}
                </p>

                {/* Badges */}
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {x.member_type && (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                      {x.member_type}
                    </span>
                  )}
                  {x.status && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                      <BadgeCheck className="h-3 w-3 text-emerald-500" />
                      {x.status}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="mt-px h-3 w-3 flex-shrink-0 text-emerald-500" />
                    <span className="line-clamp-1">{x.address}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Phone className="h-3 w-3 flex-shrink-0 text-emerald-500" />
                    <span>{x.mobile}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Coins className="h-3 w-3 flex-shrink-0 text-emerald-500" />
                    <span>
                      {x.chadar_amount ? `চাঁদা: ${x.chadar_amount}` : "চাঁদা: উল্লেখ নেই"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        totalCount={meta?.count}
        onPageChange={(p) => setSp({ page: String(p) })}
      />
    </section>
  );
}