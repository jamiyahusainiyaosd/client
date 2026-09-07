import { useEffect } from "react";
import { BadgeCheck, Coins, MapPin, Phone } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useExpatriateGrants } from "../../../features/expatriateGrant/services/expatriateGrant.services";
import Loader from "./../../../components/Loader";
import NoDataFound from "./../../../components/NoDataFound";
import Pagination from "./../../../components/Pagination";
import SmoothImage from "./../../../components/SmoothImage";

const PAGE_SIZE = 9;

export default function ExpatriateGrants() {
  const [sp, setSp] = useSearchParams();
  const rawPage = sp.get("page");
  const page = Math.max(1, Number(rawPage) || 1);

  useEffect(() => {
    if (!rawPage) {
      setSp(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", "1");
          return next;
        },
        { replace: true }
      );
    }
  }, [rawPage, setSp]);

  const handlePageChange = (p) => {
    setSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

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
      <p className="text-xs text-slate-500 font-mono mb-6">
        মোট{" "}
        <span className="font-semibold text-slate-900 font-mono">
          {meta?.count ?? items.length}
        </span>{" "}
        জন অনুদান দাতা
      </p>

      {items.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <div
              key={x.id}
              className="group flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-150 hover:shadow-md hover:border-slate-300"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <SmoothImage
                  src={x.image}
                  fallbackSrc="/avater.png"
                  alt={x.name}
                  containerClassName="h-12 w-12 rounded-lg border border-slate-200 group-hover:border-slate-300 transition-colors"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate font-display">
                  {x.name}
                </p>

                {/* Badges */}
                <div className="mt-1 flex flex-wrap gap-1.5 font-mono">
                  {x.member_type && (
                    <span className="inline-flex items-center rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                      {x.member_type}
                    </span>
                  )}
                  {x.status && (
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-700">
                      <BadgeCheck className="h-3 w-3 text-emerald-600" />
                      {x.status}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
                    <span className="line-clamp-1">{x.address}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <Phone className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
                    <span>{x.mobile}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <Coins className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
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
        onPageChange={handlePageChange}
      />
    </section>
  );
}