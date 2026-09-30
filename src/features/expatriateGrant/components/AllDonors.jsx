import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useExpatriateGrants } from "../services/expatriateGrant.services";
import DonorHero from "./DonorHero";
import DonorFilterBar from "./DonorFilterBar";
import DonorCard from "./DonorCard";
import DonorParticipationCard from "./DonorParticipationCard";
import DonorAppealBanner from "./DonorAppealBanner";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import { getDonorCountry } from "../utils/donorUtils";

const ITEMS_PER_PAGE = 8;

const AllDonors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const currentPage = Math.max(1, Number(rawPage) || 1);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  // Fetch live donors from API with 100 page size
  const { data: apiData, isLoading } = useExpatriateGrants({
    page: 1,
    page_size: 100,
  });

  // Dynamic live donors from API
  const allDonors = useMemo(() => {
    const rawItems = apiData?.items || apiData?.data || [];
    if (!Array.isArray(rawItems)) return [];

    return rawItems.map((item, idx) => {
      const address = item.address || item.location || "";
      const country = getDonorCountry(address, item.country);

      return {
        id: item.id || idx + 1,
        name: item.name || "সম্মানিত দাতা",
        member_type: item.member_type || "প্রবাসী",
        status: item.status || "সক্রীয়",
        address,
        country,
        mobile: item.mobile || item.phone || "",
        chadar_amount: item.chadar_amount || null,
        image: item.image || null,
        created_at: item.created_at || "",
      };
    });
  }, [apiData]);

  // Compute unique countries with counts
  const countryList = useMemo(() => {
    const map = {};
    allDonors.forEach((d) => {
      const c = d.country || "অন্যান্য";
      map[c] = (map[c] || 0) + 1;
    });
    return Object.entries(map).map(([name, count]) => ({ name, count }));
  }, [allDonors]);

  // Filter donors based on search and country filter
  const filteredDonors = useMemo(() => {
    return allDonors.filter((donor) => {
      const matchesCountry =
        selectedCountry === "all" || donor.country === selectedCountry;

      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        donor.name?.toLowerCase().includes(q) ||
        donor.country?.toLowerCase().includes(q) ||
        donor.address?.toLowerCase().includes(q) ||
        donor.mobile?.toLowerCase().includes(q);

      return matchesCountry && matchesSearch;
    });
  }, [allDonors, selectedCountry, searchTerm]);

  // Pagination calculation
  const totalItems = filteredDonors.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const paginatedDonors = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDonors.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDonors, currentPage]);

  const handleCountrySelect = (countryName) => {
    setSelectedCountry(countryName);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", "1");
      return next;
    });
  };

  const handleSearchChange = (query) => {
    setSearchTerm(query);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", "1");
      return next;
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
    window.scrollTo({ top: 280, behavior: "smooth" });
  };

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

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Section 1: Hero Area (#f1f3ff) */}
      <DonorHero totalCount={allDonors.length} />

      {/* Section 2: Main Body Area (bg-white) */}
      <section className="w-full bg-white py-8 sm:py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Toolbar: Count, Category Pills & Search */}
          <DonorFilterBar
            totalCount={allDonors.length}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            selectedCountry={selectedCountry}
            onSelectCountry={handleCountrySelect}
            countryList={countryList}
          />

          {/* Loading */}
          {isLoading ? (
            <Loader message="প্রবাসী অনুদানকারীদের তালিকা লোড হচ্ছে..." />
          ) : (
            <>
              {/* Donor Cards Grid with Participation Bento Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedDonors.map((donor) => (
                  <DonorCard key={donor.id} donor={donor} />
                ))}

                {/* Always show participation invitation card */}
                <DonorParticipationCard />
              </div>

              {/* Empty Search Result State */}
              {filteredDonors.length === 0 && (
                <div className="p-10 text-center bg-[#f1f3ff] rounded-2xl border border-slate-200/80 mt-6">
                  <span className="material-symbols-outlined text-[40px] text-slate-400 mb-2">
                    search_off
                  </span>
                  <p className="text-slate-700 font-semibold text-base">
                    কোনো প্রবাসী দাতার তথ্য পাওয়া যায়নি
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    অন্য কোনো নাম বা দেশ নির্বাচন করে আবার চেষ্টা করুন।
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCountry("all");
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition cursor-pointer"
                  >
                    সকল দাতা দেখুন
                  </button>
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}

          {/* Appeal Callout Banner with Pubali Bank & bKash info */}
          <DonorAppealBanner />
        </div>
      </section>
    </div>
  );
};

export default AllDonors;
