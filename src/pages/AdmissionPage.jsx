import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Admission from "../features/admission/components/Admission";
import admissionService from "../features/admission/services/admission.services";
import PageTitle from "../utils/PageTitle";

const AdmissionPage = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["admissions", page],
    queryFn: () => admissionService.getAll(page),
  });

  const refinedData = useMemo(() => data?.data?.results || [], [data]);
  const hasNext = !!data?.data?.next;
  const hasPrev = !!data?.data?.previous;

  return (
    <>
      <PageTitle title="ভর্তি" />

      <main
        className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20 pt-44 md:pt-40"
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 
              bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 
              rounded-full text-xs font-semibold"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              ভর্তি তথ্য
            </div>

            <h1
              className="mt-4 text-3xl md:text-4xl font-extrabold 
              text-slate-900 dark:text-slate-50"
            >
              মাদ্রাসার{" "}
              <span
                className="bg-gradient-to-r from-emerald-600 to-emerald-400 
              bg-clip-text text-transparent"
              >
                ভর্তি সংক্রান্ত নির্দেশনা
              </span>
            </h1>

            <p className="mt-2 max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
              নতুন ও পুরাতন শিক্ষার্থীদের জন্য সম্পূর্ণ ভর্তি নির্দেশিকা, ফি,
              সিটের তথ্য।
            </p>

            <div
              className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r 
              from-emerald-500 to-emerald-300 mx-auto"
            />
          </div>

          {/* Rules Section */}
          <div
            className="bg-white/90 dark:bg-slate-900/90 border border-emerald-100/70 
            dark:border-emerald-700/40 rounded-3xl shadow-xl p-8 mb-12 backdrop-blur"
          >
            <h3
              className="text-xl md:text-2xl font-bold flex items-center gap-3 
              text-slate-900 dark:text-slate-50"
            >
              <FaBookOpen className="text-emerald-600 dark:text-emerald-400" />
              ভর্তি হওয়ার যোগ্যতা
            </h3>

            <ul className="mt-6 space-y-4">
              {[
                "ভর্তি সংক্রান্ত যেকোনো বিষয়ে মাদ্রাসার কর্তৃপক্ষের সাথে কথা বলুন।",
                "ভর্তি ফরম ও প্রয়োজনীয় কাগজপত্র অফিস থেকে সংগ্রহ করতে হবে।",
                "নতুন ছাত্রদের ভর্তি পরীক্ষায় উত্তীর্ণ হতে হবে।",
                "ভর্তির বিষয়ে কর্তৃপক্ষের সিদ্ধান্তই চূড়ান্ত।",
                "কিতাব বিভাগ আবাসিক ফি ১০০ টাকা, হিফজ/নাজেরা বিভাগ ৪০০ টাকা।",
                "নূরানী বিভাগ: আবাসিক ৩০০ টাকা, অনাবাসিক ২০০ টাকা।",
                "তাহফিজুল কোরআন বিভাগে কোটা অনুযায়ী ভর্তি হবে।",
                "এক কপি ছবি ও জন্মনিবন্ধনের ফটোকপি আবশ্যক।",
                "খোরাকি ২০০০ টাকা প্রতি ইংরেজি মাসের ৫ তারিখের মধ্যে পরিশোধ করতে হবে।",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-slate-700 dark:text-slate-300"
                >
                  <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 mt-1 shrink-0 flex-none text-[18px] sm:text-[18px]" />
                  <span className="text-justify">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Error */}
          {isError && <Error message={error.message} />}

          {/* Table */}
          {isPending ? (
            <div className="flex justify-center py-16">
              <Loader size="lg" />
            </div>
          ) : (
            <div
              className="overflow-x-auto rounded-3xl shadow-xl border border-emerald-100/70 
                dark:border-emerald-700/40 bg-white/70 dark:bg-slate-900/50 
                backdrop-blur-xl"
            >
              <table className="min-w-full divide-y divide-emerald-200 dark:divide-emerald-700">
                <thead className="bg-emerald-100/80 dark:bg-emerald-900/40 whitespace-nowrap">
                  <tr>
                    {[
                      "শ্রেণী",
                      "লেভেল",
                      "ফর্ম ফি",
                      "নতুন ভর্তি ফি",
                      "পুরনো ভর্তি ফি",
                      "নতুন মোট ফি",
                      "পুরনো মোট ফি",
                      "অতিরিক্ত ফি",
                      "মাসিক ফি",
                      "শুরু",
                      "শেষ",
                      "ডকুমেন্ট",
                      "সিট",
                    ].map((header, idx) => (
                      <th
                        key={idx}
                        className="px-6 py-4 text-left text-sm font-semibold 
                        text-emerald-900 dark:text-emerald-200 uppercase tracking-wide"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-100 dark:divide-emerald-800">
                  {refinedData.map((ad) => (
                    <Admission key={ad.id} {...ad} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={() => hasPrev && setPage((p) => p - 1)}
              disabled={!hasPrev}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl 
              ${
                hasPrev
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md hover:-translate-y-0.5 transition-all"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaChevronLeft /> পূর্ববর্তী
            </button>

            <span className="font-medium text-slate-600 dark:text-slate-300">
              পাতা: {page}
            </span>

            <button
              onClick={() => hasNext && setPage((p) => p + 1)}
              disabled={!hasNext}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl 
              ${
                hasNext
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md hover:-translate-y-0.5 transition-all"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              পরবর্তী <FaChevronRight />
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdmissionPage;
