import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import admissionService from "../services/admission.services.js";
import AdmissionHero from "./AdmissionHero";
import AdmissionRules from "./AdmissionRules";
import AdmissionFeeTable from "./AdmissionFeeTable";

const AllAdmissions = () => {
  // Fetch admissions data from API (up to 100 items to get all 17 classes)
  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["admissionsFeeList"],
    queryFn: async () => {
      try {
        const res = await admissionService.getAll(1, 100);
        return res?.data;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  // Dynamic fee records directly mapped from backend API with fallback
  const feeRecords = useMemo(() => {
    const rawList =
      apiResponse?.results ||
      apiResponse?.data ||
      (Array.isArray(apiResponse) ? apiResponse : []);

    if (rawList && rawList.length > 0) {
      return rawList.map((item) => ({
        id: item.id,
        ClassName: item.ClassName,
        class_level: item.class_level,
        form_fee:
          item.form_fee !== undefined ? String(item.form_fee) : "১০০",
        new_admission_fee:
          item.new_admission_fee !== undefined
            ? String(item.new_admission_fee)
            : "০",
        old_admission_fee:
          item.old_admission_fee !== undefined
            ? String(item.old_admission_fee)
            : "০",
        new_total_fee:
          item.new_total_fee !== undefined
            ? String(item.new_total_fee)
            : "০",
        old_total_fee:
          item.old_total_fee !== undefined
            ? String(item.old_total_fee)
            : "০",
        additional_fee:
          item.additional_fee !== undefined
            ? String(item.additional_fee)
            : "০",
        monthly_fee: item.monthly_fee || "আবাসিক",
        admission_start_date: item.admission_start_date || "",
        admission_end_date: item.admission_end_date || "",
        required_documents: item.required_documents || "",
        seat_availability: item.seat_availability !== false,
      }));
    }

    return [];
  }, [apiResponse]);

  // Extract dynamic dates and required documents from database records
  const dynamicAdmissionInfo = useMemo(() => {
    const itemWithDates = feeRecords.find(
      (r) => r.admission_start_date && r.admission_end_date
    );
    const itemWithDocs = feeRecords.find((r) => r.required_documents);

    return {
      dateRange: itemWithDates
        ? `${itemWithDates.admission_start_date} হতে ${itemWithDates.admission_end_date}`
        : "২২ শে ফেব্রুয়ারি – ৬ এপ্রিল",
      requiredDocs:
        itemWithDocs?.required_documents ||
        "নতুন ছাত্রদের জন্মসনদের ফটোকপি এবং সকল ছাত্রদের ১ কপি ছবি সাথে আনতে হবে।",
    };
  }, [feeRecords]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Section 1: Hero Area (#f1f3ff) */}
      <AdmissionHero
        totalClasses={feeRecords.length}
        dateRange={dynamicAdmissionInfo.dateRange}
      />

      {/* Section 2: Main Body Area (bg-white) */}
      <section className="w-full bg-white py-8 sm:py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* Subsection 1: Admission Rules & Instructions Card */}
          <AdmissionRules
            dynamicRequiredDocs={dynamicAdmissionInfo.requiredDocs}
          />

          {/* Subsection 2: Complete Fee Table & Mobile Cards */}
          <AdmissionFeeTable feeRecords={feeRecords} isLoading={isLoading} />
        </div>
      </section>
    </div>
  );
};

export default AllAdmissions;
