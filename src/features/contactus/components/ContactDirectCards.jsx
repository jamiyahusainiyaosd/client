import React, { useState } from "react";
import { GOOGLE_MAPS_EXACT_URL } from "./ContactMap";
import { useContactSettings } from "../hooks/useContactSettings";

const ContactDirectCards = () => {
  const { contact } = useContactSettings();
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const hasMobileBanking = contact.bkash_number || contact.nagad_number || contact.rocket_number;

  return (
    <div className="space-y-3.5" data-purpose="contact-detail-cards">
      {/* 1. Phone Card (Primary & Secondary) */}
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
                {contact.primary_phone_label || "যোগাযোগ ও হেল্পলাইন"}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <a
                  href={`tel:${contact.primary_phone}`}
                  className="text-base font-bold text-slate-900 hover:text-primary transition-colors font-mono"
                >
                  {contact.primary_phone}
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                ভর্তি, ফলাফল, অনুদান ও সাধারণ তথ্যের জন্য কল করুন
              </p>

              {/* Secondary Phone if available */}
              {contact.secondary_phone && (
                <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      {contact.secondary_phone_label || "বিকল্প নম্বর"}:
                    </span>
                    <a
                      href={`tel:${contact.secondary_phone}`}
                      className="text-sm font-bold text-slate-800 hover:text-primary transition-colors font-mono"
                    >
                      {contact.secondary_phone}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(contact.secondary_phone, "phone_sec")}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs shrink-0"
                    title="নম্বর কপি করুন"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedKey === "phone_sec" ? "check" : "content_copy"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(contact.primary_phone, "phone")}
            className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 flex items-center justify-center transition-colors shadow-xs shrink-0 relative active:scale-95"
            title="নম্বর কপি করুন"
            aria-label="Copy phone number"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copiedKey === "phone" ? "check" : "content_copy"}
            </span>
            {copiedKey === "phone" && (
              <span className="absolute -top-7 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-10">
                কপি হয়েছে
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. WhatsApp Card (Direct Chat) */}
      {contact.whatsapp_number && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs hover:border-emerald-400 transition-all">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[22px]">
                  chat
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    {contact.whatsapp_label || "হোয়াটসঅ্যাপ সাপোর্ট"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-semibold">
                    সরাসরি চ্যাট
                  </span>
                </div>
                <div className="text-base font-bold text-slate-900 font-mono mt-1">
                  {contact.whatsapp_number}
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  যে কোনো তথ্য বা প্রয়োজনে দ্রুত মেসেজ পাঠান
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={`https://wa.me/${contact.whatsapp_number.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                title="হোয়াটসঅ্যাপে চ্যাট করুন"
              >
                <span>মেসেজ</span>
                <span className="material-symbols-outlined text-[15px]">send</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(contact.whatsapp_number, "whatsapp")}
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 flex items-center justify-center transition-colors shadow-xs shrink-0 relative active:scale-95"
                title="নম্বর কপি করুন"
                aria-label="Copy WhatsApp number"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copiedKey === "whatsapp" ? "check" : "content_copy"}
                </span>
                {copiedKey === "whatsapp" && (
                  <span className="absolute -top-7 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-10">
                    কপি হয়েছে
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Mobile Banking / Fee & Donation Card (Bkash / Nagad / Rocket) */}
      {hasMobileBanking && (
        <div className="p-4 sm:p-5 rounded-2xl bg-pink-50/50 border border-pink-200/80 shadow-xs hover:border-pink-300 transition-all">
          <div className="flex items-start gap-3.5 mb-3">
            <div className="w-11 h-11 rounded-xl bg-white border border-pink-200 text-pink-600 flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">
                account_balance_wallet
              </span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-pink-800 uppercase tracking-wider">
                মোবাইল ব্যাংকিং (ফি ও দান সংগ্রহ)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                বিকাশ ও নগদে সরাসরি মাদরাসা তহবিলে ফি বা অনুদান পাঠানো যাবে
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {contact.bkash_number && (
              <div className="bg-white p-3 rounded-xl border border-pink-200/70 flex items-center justify-between gap-2 shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-pink-700">বিকাশ</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-pink-50 text-pink-700 rounded border border-pink-100 font-medium">
                      {contact.bkash_type_display || "পার্সোনাল"}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                    {contact.bkash_number}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(contact.bkash_number, "bkash")}
                  className="p-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs shrink-0 transition-colors"
                  title="বিকাশ নম্বর কপি করুন"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedKey === "bkash" ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
            )}

            {contact.nagad_number && (
              <div className="bg-white p-3 rounded-xl border border-orange-200/70 flex items-center justify-between gap-2 shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-orange-700">নগদ</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-orange-50 text-orange-700 rounded border border-orange-100 font-medium">
                      {contact.nagad_type_display || "পার্সোনাল"}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                    {contact.nagad_number}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(contact.nagad_number, "nagad")}
                  className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs shrink-0 transition-colors"
                  title="নগদ নম্বর কপি করুন"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedKey === "nagad" ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
            )}

            {contact.rocket_number && (
              <div className="bg-white p-3 rounded-xl border border-purple-200/70 flex items-center justify-between gap-2 shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-purple-700">রকেট</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-purple-50 text-purple-700 rounded border border-purple-100 font-medium">
                      {contact.rocket_type_display || "পার্সোনাল"}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                    {contact.rocket_number}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(contact.rocket_number, "rocket")}
                  className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs shrink-0 transition-colors"
                  title="রকেট নম্বর কপি করুন"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedKey === "rocket" ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Email Card (Primary & Secondary) */}
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
                {contact.primary_email_label || "অফিসিয়াল ই-মেইল"}
              </div>
              <a
                href={`mailto:${contact.primary_email}`}
                className="text-sm sm:text-base font-bold text-slate-900 hover:text-primary transition-colors block truncate mt-1"
              >
                {contact.primary_email}
              </a>
              <p className="text-xs text-slate-500 mt-0.5">
                প্রাতিষ্ঠানিক যোগাযোগ ও আনুষ্ঠানিক চিঠিপত্রের জন্য
              </p>

              {/* Secondary Email if present */}
              {contact.secondary_email && (
                <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      {contact.secondary_email_label || "বিকল্প ইমেইল"}:
                    </span>
                    <a
                      href={`mailto:${contact.secondary_email}`}
                      className="text-xs sm:text-sm font-bold text-slate-800 hover:text-primary transition-colors truncate block"
                    >
                      {contact.secondary_email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(contact.secondary_email, "email_sec")}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs shrink-0"
                    title="ইমেইল কপি করুন"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedKey === "email_sec" ? "check" : "content_copy"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(contact.primary_email, "email")}
            className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 flex items-center justify-center transition-colors shadow-xs shrink-0 relative active:scale-95"
            title="ই-মেইল কপি করুন"
            aria-label="Copy email"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copiedKey === "email" ? "check" : "content_copy"}
            </span>
            {copiedKey === "email" && (
              <span className="absolute -top-7 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-10">
                কপি হয়েছে
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 5. Address Card */}
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
                {contact.address}
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
            href={contact.google_maps_url || GOOGLE_MAPS_EXACT_URL}
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

      {/* 6. Office Hours Callout */}
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
          {contact.office_hours}
        </p>
      </div>
    </div>
  );
};

export default ContactDirectCards;
