import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Admission from "../features/admission/components/Admission";
import admissionService from "../features/admission/services/admission.services";
import PageTitle from "../utils/PageTitle";

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
      <PageTitle title="ভর্তি" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="relative">
              ভর্তি তথ্য
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            আমাদের মাদ্রাসার ভর্তি সংক্রান্ত সকল তথ্য
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold flex items-center mb-4 text-gray-900 dark:text-white">
            <FaBookOpen className="mr-3" /> ভর্তি হওয়ার যোগ্যতা
          </h3>

          <ul className="space-y-3">
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
              <li
                key={index}
                className="flex text-justify text-gray-700 dark:text-gray-300"
              >
                <FaCheckCircle className="text-green-500 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {isError && <Error message={error.message} className="mb-6" />}

        {isPending ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" variant="pulse" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-200 whitespace-nowrap dark:bg-gray-900">
                <tr>
                  {[
                    "শ্রেণী",
                    "ক্লাস লেভেল",
                    "ফর্ম ফি",
                    "নতুন ভর্তি ফি",
                    "পুরনো ভর্তি ফি",
                    "নতুন মোট ফি",
                    "পুরনো মোট ফি",
                    "অতিরিক্ত ফি",
                    "মাসিক ফি",
                    "ভর্তি শুরু",
                    "ভর্তি শেষ",
                    "ডকুমেন্ট",
                    "সিটের অবস্থা",
                    "প্রকাশের তারিখ",
                    "আপডেটের তারিখ",
                  ].map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-4 py-3 font-bold text-left text-md text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {refinedData.map((admission) => (
                  <Admission key={admission.id} {...admission} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={!hasPrev}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              hasPrev
                ? "bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            } transition-opacity`}
          >
            <FaChevronLeft />
            পূর্ববর্তী
          </button>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            পাতা {page}
          </span>

          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              hasNext
                ? "bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            } transition-opacity`}
          >
            পরবর্তী
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default AdmissionPage;
