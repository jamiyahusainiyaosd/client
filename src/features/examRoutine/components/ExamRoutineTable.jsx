import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Clock,
  MapPin,
  AlertCircle,
  FileText,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import examRoutineService from "../services/examRoutine.services";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

const toBengaliNumber = (num) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[Number(d)]);
};

const ITEMS_PER_PAGE = 8;

const ExamRoutineTable = ({ activeSession = "annual" }) => {
  const [selectedJamat, setSelectedJamat] = useState("meshkat");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic Jamats from API
  const { data: apiJamats } = useQuery({
    queryKey: ["examJamats"],
    queryFn: () => examRoutineService.getAllJamats(),
    staleTime: 1000 * 60 * 5,
  });

  const jamats = useMemo(() => {
    if (Array.isArray(apiJamats) && apiJamats.length > 0) {
      return apiJamats;
    }
    return [
      { id: "meshkat", name: "ফযিলত ২য় বর্ষ (মেশকাত)" },
      { id: "jalalain", name: "ফযিলত ১ম বর্ষ (জালালাইন)" },
      { id: "jami", name: "সানাবিয়্যাতুল উলইয়া (শরহে জামি)" },
      { id: "kafia", name: "সানাবিয়্যাহ আম্মাহ (কাফিয়া)" },
      { id: "nahbemir", name: "মুতাওয়াসসিতাহ ২য় বর্ষ (নাহবেমির)" },
      { id: "hifz", name: "তাহফিজুল কোরআন (হিফজ)" },
      { id: "noorani", name: "নূরানী ৩য় বর্ষ" },
    ];
  }, [apiJamats]);

  // Dynamic Instructions from API
  const { data: apiInstructions } = useQuery({
    queryKey: ["examInstructions"],
    queryFn: () => examRoutineService.getAllInstructions(),
    staleTime: 1000 * 60 * 5,
  });

  const examInstructions = useMemo(() => {
    const raw = Array.isArray(apiInstructions) ? apiInstructions : apiInstructions?.results || [];
    if (raw.length > 0) {
      return raw.map((item) => item.instruction);
    }
    return [];
  }, [apiInstructions]);

  // Keep selectedJamat valid when jamats load
  useEffect(() => {
    if (jamats.length > 0 && !jamats.some((j) => j.id === selectedJamat)) {
      setSelectedJamat(jamats[0].id);
    }
  }, [jamats, selectedJamat]);

  // Reset page when session, jamat, or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSession, selectedJamat, searchQuery]);

  // Dynamic fetch from DRF API
  const {
    data: apiRoutines,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["examRoutines", activeSession, selectedJamat],
    queryFn: () => examRoutineService.getAllExamRoutines(activeSession, selectedJamat),
    staleTime: 1000 * 60 * 5,
  });

  // Normalize API data
  const schedules = useMemo(() => {
    const rawList = Array.isArray(apiRoutines)
      ? apiRoutines
      : apiRoutines?.results || apiRoutines?.data || [];

    return rawList.map((item) => ({
      id: item.id,
      jamatId: item.jamat_id,
      jamatName: item.jamat_name,
      date: item.date_str,
      day: item.day_name,
      subject: item.subject,
      code: item.subject_code,
      time: item.time_str,
      hall: item.hall_name,
      marks: item.marks,
      sessionName: item.session_name,
      academicYear: item.academic_year,
    }));
  }, [apiRoutines]);

  const filteredSchedules = useMemo(() => {
    return schedules.filter((item) => {
      const matchSearch =
        !searchQuery.trim() ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hall.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  }, [schedules, searchQuery]);

  const paginatedSchedules = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSchedules.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSchedules, currentPage]);

  const currentJamatObj = jamats.find((j) => j.id === selectedJamat);

  // Dynamic header info
  const sessionHeader = useMemo(() => {
    if (schedules.length > 0 && schedules[0].sessionName) {
      return {
        title: schedules[0].sessionName,
        academicYear: schedules[0].academicYear || "২০২৫-২০২৬ শিক্ষাবর্ষ",
        timing: schedules[0].time || "সকাল ৯:০০ – ১২:০০"
      };
    }
    return {
      title: activeSession === "befaq" ? "বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ" : "বার্ষিক শালানা ইমতিহান ২০২৬",
      academicYear: "২০২৫-২০২৬ শিক্ষাবর্ষ",
      timing: "সকাল ৯:০০ – ১২:০০",
      announcement: "জামিয়া হুসাইনিয়া কেন্দ্রীয় পরীক্ষা কমিটি কর্তৃক অনুমোদিত আনুষ্ঠানিক সময়সূচি",
    };
  }, [schedules, activeSession]);

  return (
    <div className="space-y-6">
      {/* Session Title & Announcement Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
              {sessionHeader.academicYear}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-emerald-950 mt-1">
              {sessionHeader.title}
            </h2>
            <p className="text-xs text-emerald-800/90 mt-0.5">
              {sessionHeader.announcement}
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>{sessionHeader.timing}</span>
          </div>
        </div>
      </div>

      {/* Jamat Switcher Bar & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Jamat Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
          {jamats.map((jamat) => {
            const isActive = selectedJamat === jamat.id;
            return (
              <button
                key={jamat.id}
                type="button"
                onClick={() => setSelectedJamat(jamat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-xs"
                    : "bg-[#f1f3ff] text-slate-700 hover:bg-slate-200/70"
                }`}
              >
                {jamat.name}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="বিষয় বা তারিখ খুঁজুন..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200/80 bg-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Selected Jamat Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm sm:text-base font-bold text-main">
          {currentJamatObj ? currentJamatObj.name : "রুটিন তালিকা"} — পরীক্ষার সময়সূচি
        </h3>
        <span className="text-xs text-slate-500">
          মোট পরীক্ষা:{" "}
          <strong className="text-main">
            {toBengaliNumber(filteredSchedules.length)}টি
          </strong>
        </span>
      </div>

      {/* Error state with retry */}
      {isError && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>সার্ভার থেকে সরাসরি রুটিন লোড হতে বিঘ্ন ঘটেছে।</span>
          </div>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-3 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            পুনরায় চেষ্টা
          </button>
        </div>
      )}

      {/* Loading or Data Display */}
      {isLoading ? (
        <Loader />
      ) : paginatedSchedules.length > 0 ? (
        <>
          {/* DESKTOP TABLE VIEW (hidden on mobile, visible on md and up) */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200/80 shadow-xs bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-900 text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center w-14">ক্র. নং</th>
                  <th className="py-3.5 px-4">তারিখ ও বার</th>
                  <th className="py-3.5 px-5">বিষয় / কিতাবের নাম</th>
                  <th className="py-3.5 px-3">বিষয় কোড</th>
                  <th className="py-3.5 px-4">পরীক্ষার সময়</th>
                  <th className="py-3.5 px-4">পরীক্ষার হল / কক্ষ</th>
                  <th className="py-3.5 px-3 text-center">পূর্ণমান</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {paginatedSchedules.map((item, idx) => {
                  const globalIdx = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
                  return (
                    <tr
                      key={item.id || idx}
                      className={`hover:bg-emerald-50/40 transition-colors duration-150 ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center font-bold text-slate-500 font-sans">
                        {toBengaliNumber(globalIdx)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 whitespace-nowrap">
                        <p className="font-bold text-main">{item.date}</p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {item.day}
                        </p>
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="font-bold text-main">{item.subject}</p>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-xs text-slate-600">
                        {item.code || "—"}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-800 whitespace-nowrap">
                        {item.time}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          {item.hall}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md font-bold text-xs bg-slate-100 text-slate-800 border border-slate-200">
                          {item.marks}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW (tailored for iPhone X 375px screens) */}
          <div className="md:hidden space-y-3">
            {paginatedSchedules.map((item, idx) => {
              const globalIdx = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
              return (
                <div
                  key={item.id || idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#f1f3ff] text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {toBengaliNumber(globalIdx)}
                      </span>
                      <span className="font-semibold text-xs text-slate-700">
                        {item.date} ({item.day})
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md font-bold text-[11px] bg-slate-100 text-slate-800 shrink-0">
                      পূর্ণমান: {item.marks}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-main leading-snug">
                    {item.subject}
                  </h4>

                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Clock className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span className="truncate">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span className="truncate">{item.hall}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shared Pagination component */}
          {filteredSchedules.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalCount={filteredSchedules.length}
              pageSize={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
              useBengaliDigits={true}
            />
          )}
        </>
      ) : (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">
            কোনো পরীক্ষার রুটিন পাওয়া যায়নি
          </p>
        </div>
      )}

      {/* Exam Rules & Guidelines Accordion / Box */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
        <div className="flex items-center gap-2 text-main font-bold text-sm sm:text-base">
          <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>পরীক্ষার্থীদের জন্য বিশেষ নির্দেশনাবলী</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700">
          {examInstructions.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamRoutineTable;
