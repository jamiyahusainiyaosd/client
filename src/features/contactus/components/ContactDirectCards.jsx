import React, { useState } from "react";
import { GOOGLE_MAPS_EXACT_URL } from "./ContactMap";

const ContactDirectCards = () => {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-3.5" data-purpose="contact-detail-cards">
      {/* 1. Phone Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#f1f3ff] border border-slate-200/80 shadow-xs hover:border-primary/40 transition-all">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200/80 text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">
                phone_in_talk
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                যোগাযোগ ও হেল্পলাইন
              </div>
              <div className="flex items-center gap-2 mt-1">
                <a
                  href="tel:+8801751699909"
                  className="text-base font-bold text-slate-900 hover:text-primary transition-colors font-mono"
                >
                  +880 1751-699909
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                ভর্তি, ফলাফল, অনুদান ও সাধারণ তথ্যের জন্য কল করুন
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleCopy("+8801751699909", "phone")}
            className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 flex items-center justify-center transition-colors shadow-xs shrink-0 relative active:scale-95"
            title="নম্বর কপি করুন"
            aria-label="Copy phone number"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copiedKey === "phone" ? "check" : "content_copy"}
            </span>
            {copiedKey === "phone" && (
              <span className="absolute -top-7 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                কপি হয়েছে
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Email Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#f1f3ff] border border-slate-200/80 shadow-xs hover:border-primary/40 transition-all">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200/80 text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">
                mail
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                অফিসিয়াল ই-মেইল
              </div>
              <a
                href="mailto:jamiyahusainiya1@gmail.com"
                className="text-sm sm:text-base font-bold text-slate-900 hover:text-primary transition-colors block truncate mt-1"
              >
                jamiyahusainiya1@gmail.com
              </a>
              <p className="text-xs text-slate-500 mt-0.5">
                প্রাতিষ্ঠানিক যোগাযোগ ও আনুষ্ঠানিক চিঠিপত্রের জন্য
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleCopy("jamiyahusainiya1@gmail.com", "email")}
            className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 flex items-center justify-center transition-colors shadow-xs shrink-0 relative active:scale-95"
            title="ই-মেইল কপি করুন"
            aria-label="Copy email"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copiedKey === "email" ? "check" : "content_copy"}
            </span>
            {copiedKey === "email" && (
              <span className="absolute -top-7 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                কপি হয়েছে
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. Address & Plus Code Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#f1f3ff] border border-slate-200/80 shadow-xs hover:border-primary/40 transition-all">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200/80 text-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">
                location_on
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                মাদ্রাসার ঠিকানা ও প্লাস কোড
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                শায়েস্তাগঞ্জ - হবিগঞ্জ রোড, কুটিরগাঁও রোড সংলগ্ন, শায়েস্তাগঞ্জ, হবিগঞ্জ
              </div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-[11px] font-mono font-semibold text-slate-700">
                  প্লাস কোড: 7F9G+P4X
                </span>
                <span className="text-xs text-slate-500">সিলেট বিভাগ, বাংলাদেশ</span>
              </div>
            </div>
          </div>

          <a
            href={GOOGLE_MAPS_EXACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-primary border border-slate-200/80 flex items-center justify-center transition-colors shadow-xs shrink-0 active:scale-95"
            title="গুগল ম্যাপে দেখুন"
            aria-label="View on Google Maps"
          >
            <span className="material-symbols-outlined text-[18px]">
              open_in_new
            </span>
          </a>
        </div>
      </div>

      {/* 4. Office Hours Callout */}
      <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-slate-800 text-xs sm:text-[13px] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-xs">
          <span className="material-symbols-outlined text-[18px]">
            schedule
          </span>
        </div>
        <p className="leading-relaxed">
          <strong className="text-emerald-950 font-bold">
            সাক্ষাৎ ও অফিস সময়:
          </strong>{" "}
          প্রতিদিন সকাল ৯:০০ হতে আসর এবং আসর হতে মাগরিব পর্যন্ত মুহতামিম ও শিক্ষা সচিবের দফতর দর্শনার্থী ও অভিভাবকদের জন্য উন্মুক্ত থাকে।
        </p>
      </div>
    </div>
  );
};

export default ContactDirectCards;
