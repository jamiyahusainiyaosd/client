import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import { toBengaliDigits, formatFee } from "../utils/admissionUtils";
import { useContactSettings } from "../../contactus/hooks/useContactSettings";

const ITEMS_PER_PAGE = 8;

const AdmissionFeeTable = ({ feeRecords = [], isLoading = false }) => {
  const { contact } = useContactSettings();
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const currentPage = Math.max(1, Number(rawPage) || 1);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);

  // Sync initial page into URL
  useEffect(() => {
    if (!rawPage) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", "1");
          return next;
        },
        { replace: true },
      );
    }
  }, [rawPage, setSearchParams]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedDetailItem(null);
      }
    };
    if (selectedDetailItem) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedDetailItem]);

  // Search filtering across all fields
  const filteredRecords = useMemo(() => {
    if (!searchTerm.trim()) return feeRecords;
    const q = searchTerm.toLowerCase().trim();
    return feeRecords.filter(
      (r) =>
        r.ClassName?.toLowerCase().includes(q) ||
        r.class_level?.toLowerCase().includes(q) ||
        r.monthly_fee?.toLowerCase().includes(q) ||
        r.required_documents?.toLowerCase().includes(q) ||
        r.admission_start_date?.toLowerCase().includes(q) ||
        r.admission_end_date?.toLowerCase().includes(q),
    );
  }, [feeRecords, searchTerm]);

  const totalItems = filteredRecords.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRecords, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
    const tableEl = document.getElementById("fee-table-section");
    if (tableEl) {
      tableEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-5 sm:p-7 lg:p-8 shadow-xs w-full"
      id="fee-table-section"
      data-purpose="admission-fee-table-card"
    >
      {/* Header & Controls Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-200/70">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              বিভাগভিত্তিক পূর্ণাঙ্গ চার্ট
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            ভর্তি ফি, তারিখ ও প্রয়োজনীয় নথিপত্র
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            সব তথ্য একনজরে — যেকোনো সারিতে ক্লিক করে বিস্তারিত নথিপত্র ও হিসাব
            দেখুন
          </p>
        </div>

        {/* Filter, View Switcher & Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Toggle (Table vs Bento Cards) */}
          <div className="hidden sm:inline-flex items-center p-1 bg-white border border-slate-200/80 rounded-xl shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "table"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300/80 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                table_chart
              </span>
              <span>টেবিল ভিউ</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "cards"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300/80 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                grid_view
              </span>
              <span>কার্ড ভিউ</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="শ্রেণি, তারিখ বা বিভাগ খুঁজুন..."
              id="tableSearch"
              className="bg-white text-slate-800 text-xs sm:text-sm rounded-xl pl-9 pr-8 py-2 w-full sm:w-60 border border-slate-200/80 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[18px] text-slate-400 pointer-events-none">
              search
            </span>
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  close
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <Loader message="ভর্তি ফি ও পাঠ্যক্রমের তথ্য লোড হচ্ছে..." />
      ) : paginatedRecords.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
          <span className="material-symbols-outlined text-slate-400 text-[48px] mb-2">
            search_off
          </span>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            কোনো শ্রেণি বা বিভাগের তথ্য পাওয়া যায়নি
          </h3>
          <p className="text-xs text-slate-500">
            অনুগ্রহ করে সঠিক বানান দিয়ে পুনরায় অনুসন্ধান করুন।
          </p>
        </div>
      ) : (
        <>
          {/* 1. Desktop & Tablet View (Zero Horizontal Scroll Table) */}
          {viewMode === "table" ? (
            <div className="hidden md:block w-full rounded-2xl border border-slate-200/80 shadow-xs bg-white overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f8f9ff] text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-4 px-4 text-left w-[26%]">
                      শ্রেণি / জামাত ও কোর্স
                    </th>
                    <th className="py-4 px-3 text-right w-[14%]">
                      নতুন মোট ফি
                    </th>
                    <th className="py-4 px-3 text-right w-[14%]">
                      পুনঃভর্তি মোট
                    </th>
                    <th className="py-4 px-3 text-center w-[16%]">
                      মাসিক খোরাকি
                    </th>
                    <th className="py-4 px-3 text-center w-[14%]">
                      ভর্তি সময়সীমা
                    </th>
                    <th className="py-4 px-3 text-center w-[16%]">
                      পূর্ণাঙ্গ তথ্য
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {paginatedRecords.map((item, idx) => (
                    <tr
                      key={item.id || idx}
                      onClick={() => setSelectedDetailItem(item)}
                      title="পূর্ণাঙ্গ তথ্য ও নথিপত্র দেখতে ক্লিক করুন"
                      className="hover:bg-emerald-50/40 transition-colors cursor-pointer group"
                    >
                      {/* শ্রেণি ও কোর্স */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                          {item.ClassName}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {item.class_level || "সাধারণ জামাত"}
                        </div>
                      </td>

                      {/* নতুন ভর্তি মোট ফি */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="font-bold text-primary text-sm sm:text-base">
                          {formatFee(item.new_total_fee)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          ভর্তি + ফরম
                        </div>
                      </td>

                      {/* পুরোনো মোট ফি */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="font-bold text-slate-800 text-sm sm:text-base">
                          {formatFee(item.old_total_fee)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          পুরাতন ছাত্র
                        </div>
                      </td>

                      {/* মাসিক খোরাকি */}
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-medium">
                          {item.monthly_fee || "আবাসিক"}
                        </span>
                      </td>

                      {/* ভর্তি সময়সীমা */}
                      <td className="py-3.5 px-3 text-center text-xs text-slate-600">
                        {item.admission_start_date ||
                        item.admission_end_date ? (
                          <div className="inline-flex items-center gap-1 font-mono text-[11px] bg-slate-50 px-2 py-1 rounded-md border border-slate-200/70">
                            <span>{item.admission_start_date || "শুরু"}</span>
                            <span>–</span>
                            <span>{item.admission_end_date || "চলমান"}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">
                            ভর্তি চলছে
                          </span>
                        )}
                      </td>

                      {/* অ্যাকশন বাটন */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDetailItem(item);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white group-hover:bg-primary group-hover:text-white text-primary border border-primary/30 group-hover:border-primary text-xs font-semibold shadow-xs transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            visibility
                          </span>
                          <span>বিস্তারিত</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* 2. Desktop Bento Cards Grid View (when toggled) */
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedRecords.map((item, idx) => (
                <div
                  key={item.id || idx}
                  onClick={() => setSelectedDetailItem(item)}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">
                          {item.ClassName}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {item.class_level}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                          item.seat_availability !== false
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.seat_availability !== false
                              ? "bg-emerald-600"
                              : "bg-rose-600"
                          }`}
                        />
                        <span>
                          {item.seat_availability !== false
                            ? "আসন খালি"
                            : "পূর্ণ"}
                        </span>
                      </span>
                    </div>

                    {/* Fees Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-[#f8f9ff] p-3 rounded-xl mb-3 text-xs">
                      <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                        <span className="text-[10px] text-slate-400 block">
                          নতুন মোট ফি
                        </span>
                        <span className="font-bold text-primary text-sm block mt-0.5">
                          {formatFee(item.new_total_fee)}
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                        <span className="text-[10px] text-slate-400 block">
                          পুরোনো মোট ফি
                        </span>
                        <span className="font-bold text-slate-800 text-sm block mt-0.5">
                          {formatFee(item.old_total_fee)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-400">মাসিক খোরাকি:</span>
                        <span className="font-semibold text-slate-800">
                          {item.monthly_fee || "আবাসিক"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">ভর্তির সময়সীমা:</span>
                        <span className="font-medium text-slate-700">
                          {item.admission_start_date || "শুরু"} হতে{" "}
                          {item.admission_end_date || "চলমান"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDetailItem(item);
                    }}
                    className="mt-4 w-full py-2 bg-emerald-50 hover:bg-primary text-primary hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      visibility
                    </span>
                    <span>পূর্ণাঙ্গ তথ্য ও নথিপত্র দেখুন</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 3. Mobile View: Responsive Bento List */}
          <div className="md:hidden space-y-3.5">
            {paginatedRecords.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setSelectedDetailItem(item)}
                className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3 cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 leading-snug truncate">
                      {item.ClassName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.class_level}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 ${
                      item.seat_availability !== false
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.seat_availability !== false
                          ? "bg-emerald-600"
                          : "bg-rose-600"
                      }`}
                    />
                    <span>
                      {item.seat_availability !== false
                        ? "আসন খালি"
                        : "আসন পূর্ণ"}
                    </span>
                  </span>
                </div>

                {/* 2x2 Primary Fee Grid */}
                <div className="grid grid-cols-2 gap-2 bg-[#f8f9ff] p-3 rounded-xl text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-xs">
                    <div className="text-[10px] text-slate-500 font-medium">
                      নতুন মোট ফি
                    </div>
                    <div className="text-sm font-bold text-primary mt-0.5">
                      {formatFee(item.new_total_fee)}
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-xs">
                    <div className="text-[10px] text-slate-500 font-medium">
                      পুরোনো মোট ফি
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {formatFee(item.old_total_fee)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500">মাসিক খোরাকি:</span>
                  <span className="font-semibold text-emerald-800">
                    {item.monthly_fee || "আবাসিক"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDetailItem(item);
                  }}
                  className="w-full py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    visibility
                  </span>
                  <span>পূর্ণাঙ্গ তথ্য ও নথিপত্র দেখুন</span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 pt-4 border-t border-slate-200/70">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
            extraNote={`(মোট ${toBengaliDigits(totalItems)} টি শ্রেণি)`}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* Interactive "পূর্ণাঙ্গ ভর্তি নির্দেশিকা ও ফি বিবরণী" Modal / Drawer */}
      {/* ========================================================================= */}
      {selectedDetailItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedDetailItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-900 p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>ভর্তি তথ্য ও শর্তাবলী</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {selectedDetailItem.ClassName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {selectedDetailItem.class_level || "সাধারণ কওমি দ্বীনি বিভাগ"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDetailItem(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition cursor-pointer shrink-0"
                title="বন্ধ করুন (Esc)"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-5">
              {/* Section 1: Total Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 shadow-xs">
                  <span className="text-xs text-emerald-800 font-semibold block">
                    সর্বমোট নতুন ভর্তি ফি
                  </span>
                  <span className="text-2xl font-extrabold text-primary block mt-1">
                    {formatFee(selectedDetailItem.new_total_fee)}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    (ফরম ফি + ভর্তি ফি + আনুষঙ্গিক খরচ)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8f9ff] border border-slate-200/80 shadow-xs">
                  <span className="text-xs text-slate-700 font-semibold block">
                    সর্বমোট পুনঃভর্তি ফি (পুরাতন ছাত্র)
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 block mt-1">
                    {formatFee(selectedDetailItem.old_total_fee)}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    (ফরম ফি + পুরাতন ভর্তি ফি)
                  </span>
                </div>
              </div>

              {/* Section 2: Detailed Financial Breakdown */}
              <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    receipt_long
                  </span>
                  <span>ফি কাঠামোর পুঙ্খানুপুঙ্খ হিসাব</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-xs">
                    <span className="text-[11px] text-slate-400 block">
                      ভর্তি ফরম ফি
                    </span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                      {formatFee(selectedDetailItem.form_fee)}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-xs">
                    <span className="text-[11px] text-slate-400 block">
                      নতুন ভর্তি ফি
                    </span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                      {formatFee(selectedDetailItem.new_admission_fee)}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-xs">
                    <span className="text-[11px] text-slate-400 block">
                      পুরাতন ভর্তি ফি
                    </span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                      {formatFee(selectedDetailItem.old_admission_fee)}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-xs">
                    <span className="text-[11px] text-slate-400 block">
                      অতিরিক্ত / বিবিধ ফি
                    </span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                      {formatFee(selectedDetailItem.additional_fee)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">
                    মাসিক খোরাকি ও অনাবাসিক ব্যবস্থা:
                  </span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {selectedDetailItem.monthly_fee || "আবাসিক"}
                  </span>
                </div>
              </div>

              {/* Section 3: Dates & Seat Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#f8f9ff] p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-slate-500 font-medium block flex items-center gap-1.5 mb-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      calendar_month
                    </span>
                    <span>ভর্তির কার্যক্রমের সময়সীমা</span>
                  </span>
                  <div className="space-y-1 text-slate-700">
                    <div>
                      <span className="text-slate-400">শুরুর তারিখ: </span>
                      <span className="font-semibold font-mono">
                        {selectedDetailItem.admission_start_date ||
                          "ঘোষণা করা হবে"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">শেষের তারিখ: </span>
                      <span className="font-semibold font-mono">
                        {selectedDetailItem.admission_end_date ||
                          "আসন খালি থাকা সাপেক্ষে"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8f9ff] p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <span className="text-slate-500 font-medium block flex items-center gap-1.5 mb-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        event_seat
                      </span>
                      <span>বর্তমান আসন স্থিতি</span>
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                        selectedDetailItem.seat_availability !== false
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedDetailItem.seat_availability !== false
                            ? "bg-emerald-600 animate-pulse"
                            : "bg-rose-600"
                        }`}
                      />
                      <span>
                        {selectedDetailItem.seat_availability !== false
                          ? "ভর্তি কার্যক্রম চলমান (আসন খালি আছে)"
                          : "আসন পূর্ণ হয়েছে"}
                      </span>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    আসন সীমিত থাকায় দ্রুত যোগাযোগ করার অনুরোধ করা হলো।
                  </p>
                </div>
              </div>

              {/* Section 4: Required Documents */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5 mb-2 text-sm">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    assignment
                  </span>
                  <span>আবশ্যকীয় কাগজপত্র ও নথিপত্র</span>
                </span>
                <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-emerald-200/60">
                  {selectedDetailItem.required_documents ||
                    "১. শিক্ষার্থীর অনলাইন জন্ম নিবন্ধন সনদের মূল কপি ও ফটোকপি। ২. পাসপোর্ট সাইজ রঙিন ছবি (২ কপি)। ৩. পূর্বের মাদ্রাসার প্রশংসাপত্র বা ছাড়পত্র। ৪. পিতা/মাতার জাতীয় পরিচয়পত্রের (NID) ফটোকপি।"}
                </p>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    call
                  </span>
                  <span>ভর্তি সহায়তায় সরাসরি কল করুন:</span>
                  <a
                    href={`tel:${contact.primary_phone}`}
                    className="font-bold text-slate-800 font-mono hover:text-primary"
                  >
                    {contact.primary_phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedDetailItem(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition shadow-xs cursor-pointer"
                  >
                    বুঝেছি, ধন্যবাদ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AdmissionFeeTable.propTypes = {
  feeRecords: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

export default AdmissionFeeTable;
