import React, { useCallback, useMemo, useState } from "react";
import { FaBookOpen, FaCheckCircle } from "react-icons/fa";
import PageTitle from "../utils/PageTitle";
import { useQuery } from "@tanstack/react-query";
import admissionService from "../features/admission/services/admission.services";
import Admission from "../features/admission/components/Admission";
import Loader from "../components/Loader";

const AdmissionPage = () => {
  const [page, setPage] = useState(1);
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["admissions", page],
    queryFn: () => admissionService.getAll(page),
  });
  const refinedData = useMemo(() => data?.data?.results || [], [data]);
  const hasNext = !!data?.data?.next;
  const hasPrev = !!data?.data?.previous;

  const handleNext = useCallback(() => {
    if (hasNext) setPage((prev) => prev + 1);
  }, [hasNext]);

  const handlePrev = useCallback(() => {
    if (hasPrev && page > 1) setPage((prev) => prev - 1);
  }, [hasPrev, page]);

  return (
    <>
      <PageTitle key={"admissionPage"} title={"ভর্তি"} />
      <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
        <br />
        <div className="p-6 rounded-lg shadow-2xl mb-8">
          <h3 className="text-2xl font-semibold flex items-center mb-4" style={{ color: 'wheat' }}>
            <FaBookOpen className="text-blue-500 mr-2" /> ভর্তি হওয়ার যোগ্যতা
          </h3>

          <ul className="space-y-5">
            {[
              "ভর্তি সংক্রান্ত যেকোনো বিষয়ে মাদ্রাসার কতৃপক্ষের সাথে কথা বলুন।",
              "ভর্তি ফরম ও ভর্তি-সংক্রান্ত অন্যান্য কাগজপত্র মাদ্রাসার অফিস থেকে সংগ্রহ করতে হবে।",
              "নতুন ছাত্রদের ভর্তি পরীক্ষায় অবশ্যই উত্তীর্ণ হতে হবে।",
              "ভর্তির বিষয়ে কর্তৃপক্ষের সিদ্ধান্তই চূড়ান্ত বলে গণ্য হবে।",
              "কিতাব বিভাগে ১০০/- টাকা হারে আবাসিক ফি, হিফজ/নাজেরা বিভাগে ৪০০/- টাকা এবং নূরানী বিভাগে আবাসিক ৩০০/- টাকা ও অনাবাসিক ২০০/- টাকা মাসিক বেতন পরিশোধ করতে হবে।",
              "তাহফিজুল কোরআন ও নাজেরা বিভাগে কোটা পূরণ সাপেক্ষে ভর্তি চলবে।",
              "নতুন ছাত্রদের জন্মসনদের ফটোকপি এবং সকল ছাত্রের ১ কপি ছবি সাথে আনতে হবে।",
              "বর্ডিংয়ের খোরাকির ২০০০/- টাকা প্রতি ইংরেজি মাসের ৫ তারিখের মধ্যে পরিশোধ করতে হবে।",
            ].map((item, index) => (
              <li key={index} className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" />{item}</li>))}
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-center" style={{ color: 'wheat' }}>ভর্তি সংক্রান্ত তথ্য</h2>
        {!isPending && isError && (
          <div className="text-red-800 p-4 rounded mt-4">{error.message}</div>
        )}

        {isPending ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto mt-8">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="border p-5">শ্রেণী</th>
                  <th className="border p-5">ক্লাস লেভেল</th>
                  <th className="border p-5 whitespace-nowrap">ফর্ম ফি</th>
                  <th className="border p-5 whitespace-nowrap">নতুন ভর্তি ফি</th>
                  <th className="border p-5 whitespace-nowrap">পুরনো ভর্তি ফি</th>
                  <th className="border p-5 whitespace-nowrap">নতুন মোট ফি</th>
                  <th className="border p-5 whitespace-nowrap">পুরনো মোট ফি</th>
                  <th className="border p-5 whitespace-nowrap">অতিরিক্ত ফি</th>
                  <th className="border p-5 whitespace-nowrap">মাসিক ফি</th>
                  <th className="border p-5 whitespace-nowrap">ভর্তি শুরু</th>
                  <th className="border p-5 whitespace-nowrap">ভর্তি শেষ</th>
                  <th className="border p-5 whitespace-nowrap">দরকারি ডকুমেন্ট</th>
                  <th className="border p-5 whitespace-nowrap">সিটের অবস্থা</th>
                  <th className="border p-5 whitespace-nowrap">প্রকাশের তারিখ</th>
                  <th className="border p-5 whitespace-nowrap">আপডেটের তারিখ</th>
                </tr>
              </thead>
              <tbody>
                {refinedData?.map(
                  ({ id, ClassName, class_level, form_fee, new_admission_fee, old_admission_fee, new_total_fee, old_total_fee, additional_fee, monthly_fee, admission_start_date, admission_end_date, required_documents, seat_availability, admission_created, admission_updated,
                  }) => (
                    <Admission key={id} ClassName={ClassName} class_level={class_level} form_fee={form_fee} new_admission_fee={new_admission_fee} old_admission_fee={old_admission_fee} new_total_fee={new_total_fee} old_total_fee={old_total_fee} additional_fee={additional_fee} monthly_fee={monthly_fee} admission_start_date={admission_start_date} admission_end_date={admission_end_date} required_documents={required_documents} seat_availability={seat_availability} admission_created={admission_created} admission_updated={admission_updated} />
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between mt-8 gap-5">
          <button onClick={handlePrev} disabled={!hasPrev} className={`${!hasPrev && "opacity-50 cursor-not-allowed"}`}>🔙 পূর্ববর্তী পাতা</button>
          <button onClick={handleNext} disabled={!hasNext} className={`button1 ${!hasNext && "opacity-50 cursor-not-allowed"}`}>পরবর্তী পাতা ➡️</button>
        </div>
      </section>
    </>
  );
};

export default AdmissionPage;