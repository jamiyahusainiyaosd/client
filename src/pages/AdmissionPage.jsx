import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FiCheckCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ErrorDisplay from "../components/Error";
import Loader from "../components/Loader";
import Admission from "../features/admission/components/Admission";
import admissionService from "../features/admission/services/admission.services.js";
import PageTitle from "../utils/PageTitle";

const qualifications = [
  "ভর্তি সংক্রান্ত যেকোনো বিষয়ে মাদ্রাসার কর্তৃপক্ষের সাথে কথা বলুন।",
  "ভর্তি ফরম ও প্রয়োজনীয় কাগজপত্র অফিস থেকে সংগ্রহ করতে হবে।",
  "নতুন ছাত্রদের ভর্তি পরীক্ষায় উত্তীর্ণ হতে হবে।",
  "ভর্তির বিষয়ে কর্তৃপক্ষের সিদ্ধান্তই চূড়ান্ত।",
  "কিতাব বিভাগ আবাসিক ফি ১০০ টাকা, হিফজ/নাজেরা বিভাগ ৪০০ টাকা।",
  "নূরানী বিভাগ: আবাসিক ৩০০ টাকা, অনাবাসিক ২০০ টাকা।",
  "তাহফিজুল কোরআন বিভাগে কোটা অনুযায়ী ভর্তি হবে।",
  "এক কপি ছবি ও জন্মনিবন্ধনের ফটোকপি আবশ্যক।",
  "খোরাকি ২০০০ টাকা প্রতি ইংরেজি মাসের ৫ তারিখের মধ্যে পরিশোধ করতে হবে।",
];

const tableHeaders = [
  "শ্রেণী", "লেভেল", "ফর্ম ফি", "নতুন ভর্তি ফি", "পুরনো ভর্তি ফি",
  "নতুন মোট ফি", "পুরনো মোট ফি", "অতিরিক্ত ফি", "মাসিক ফি",
  "শুরু", "শেষ", "ডকুমেন্ট", "সিট",
];

const AdmissionPage = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["admissions", page],
    queryFn: () => admissionService.getAll(page),
    keepPreviousData: true,
  });

  const refinedData = useMemo(() => data?.data?.results || [], [data]);
  const hasNext = !!data?.data?.next;
  const hasPrev = !!data?.data?.previous;

  const navBtnBase =
    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150";
  const navBtnActive =
    "border border-slate-200  bg-white  text-slate-700  hover:border-emerald-200  hover:text-emerald-700 ";
  const navBtnDisabled =
    "border border-slate-100  bg-slate-50  text-slate-300  cursor-not-allowed";

  return (
    <>
      <PageTitle title="ভর্তি" />

      <main className="min-h-screen bg-slate-50  pb-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">

          {/* Page header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 ">
                ভর্তি তথ্য
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 ">
              মাদ্রাসার{" "}
              <span className="text-emerald-600 ">
                ভর্তি সংক্রান্ত নির্দেশনা
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-500  max-w-xl leading-relaxed">
              নতুন ও পুরাতন শিক্ষার্থীদের জন্য সম্পূর্ণ ভর্তি নির্দেশিকা, ফি ও সিটের তথ্য।
            </p>
            <div className="mt-4 h-px w-full bg-slate-200 " />
          </div>

          {/* Qualification card */}
          <div className="rounded-2xl border border-slate-200/80  bg-white/70  backdrop-blur-sm overflow-hidden mb-8">
            <div className="px-6 pt-5 pb-4 border-b border-slate-100  flex items-center gap-3">
              <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-emerald-50  text-emerald-600 ">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900 ">
                ভর্তি হওয়ার যোগ্যতা ও নির্দেশনা
              </h3>
            </div>
            <ul className="p-5 space-y-3">
              {qualifications.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <FiCheckCircle
                    size={15}
                    className="mt-[2px] flex-shrink-0 text-emerald-500 "
                  />
                  <span className="text-slate-600  leading-relaxed text-justify">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Error */}
          {isError && (
            <ErrorDisplay errorMessage={error?.response?.data?.detail || error.message} />
          )}

          {/* Table */}
          {isPending ? (
            <Loader />
          ) : (
            <div className="rounded-2xl border border-slate-200/80  bg-white/70  backdrop-blur-sm overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-slate-200/80  bg-slate-50/80 ">
                      {tableHeaders.map((header, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500  whitespace-nowrap"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 ">
                    {refinedData.length > 0 ? (
                      refinedData.map((ad) => <Admission key={ad.id} {...ad} />)
                    ) : (
                      <tr>
                        <td
                          colSpan={13}
                          className="text-center py-10 text-sm text-slate-400 "
                        >
                          কোনো ভর্তি তথ্য পাওয়া যায়নি।
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => hasPrev && setPage((p) => p - 1)}
              disabled={!hasPrev}
              className={`${navBtnBase} ${hasPrev ? navBtnActive : navBtnDisabled}`}
            >
              <FiChevronLeft size={14} />
              পূর্ববর্তী
            </button>

            <span className="text-xs text-slate-400 ">
              পাতা{" "}
              <span className="font-semibold text-slate-700 ">
                {page}
              </span>
            </span>

            <button
              onClick={() => hasNext && setPage((p) => p + 1)}
              disabled={!hasNext}
              className={`${navBtnBase} ${hasNext ? navBtnActive : navBtnDisabled}`}
            >
              পরবর্তী
              <FiChevronRight size={14} />
            </button>
          </div>

        </section>
      </main>
    </>
  );
};

export default AdmissionPage;