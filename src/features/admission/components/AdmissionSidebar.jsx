import React, { useState } from "react";

const AdmissionSidebar = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText("3070101040683");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lg:col-span-4 flex flex-col gap-space-md">
      {/* Admission Desk Card */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-md p-space-md flex flex-col gap-space-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">
              contact_phone
            </span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              ভর্তি সহায়তা ডেস্ক
            </h3>
            <p className="font-body-sm text-body-sm text-secondary">
              সরাসরি পরামর্শ ও দিকনির্দেশনা
            </p>
          </div>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          ফরম পূরণে জটিলতা অথবা ভর্তি পরীক্ষা সংক্রান্ত যেকোনো তথ্যের জন্য
          আমাদের ভর্তি শাখায় নির্দ্বিধায় যোগাযোগ করতে পারেন।
        </p>

        <div className="space-y-2">
          <a
            className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface transition-colors"
            href="tel:+8801751699909"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[20px]">
                call
              </span>
              <span className="font-headline-sm text-headline-sm font-mono">
                +880 1751 699909
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-primary">
              কল করুন
            </span>
          </a>

          <a
            className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface transition-colors"
            href="mailto:jamiyahusainiya1@gmail.com"
          >
            <div className="flex items-center gap-2.5 truncate">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                mail
              </span>
              <span className="font-body-sm text-body-sm text-secondary truncate">
                jamiyahusainiya1@gmail.com
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-primary shrink-0 ml-1">
              ইমেইল
            </span>
          </a>
        </div>

        <div className="p-3 rounded-xl bg-primary-fixed/20 text-on-primary-fixed-variant font-body-sm text-body-sm flex items-start gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">
            schedule
          </span>
          <span>
            অফিস সময়: সকাল ৯:০০ টা হতে বিকেল ৫:০০ টা পর্যন্ত (শুক্রবার ব্যতীত)।
          </span>
        </div>
      </div>

      {/* Pubali Bank & Payment Details Card */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-md p-space-md flex flex-col gap-space-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[22px]">
              account_balance
            </span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              পূবালী ব্যাংক একাউন্ট
            </h3>
            <p className="font-body-sm text-body-sm text-secondary">
              ফি ও অনুদান প্রেরণের হিসাব
            </p>
          </div>
        </div>

        <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-1.5">
          <span className="font-label-sm text-label-sm text-secondary uppercase">
            ব্যাংক ও শাখার নাম
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface">
            পূবালী ব্যাংক পিএলসি
          </span>
          <span className="font-body-sm text-body-sm text-secondary">
            শায়েস্তাগঞ্জ শাখা, হবিগঞ্জ
          </span>

          <div className="mt-2 pt-2 border-0 bg-surface-container-lowest p-2.5 rounded-lg flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-secondary block">
                হিসাব নম্বর:
              </span>
              <span className="font-headline-sm text-headline-sm font-mono text-primary font-bold">
                3070101040683
              </span>
            </div>
            <button
              className="p-1.5 rounded-md hover:bg-surface-container text-secondary hover:text-primary transition-colors relative"
              onClick={handleCopyAccount}
              title="কপি করুন"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {copied ? "done" : "content_copy"}
              </span>
              {copied && (
                <span className="absolute -top-7 right-0 bg-on-surface text-surface-container-lowest text-[10px] px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                  কপি হয়েছে
                </span>
              )}
            </button>
          </div>

          <span className="font-label-sm text-label-sm text-secondary-fixed-dim font-mono">
            BS25-C-0717526 TO BS25-C-0717550
          </span>
        </div>

        <p className="font-body-sm text-body-sm text-secondary">
          টাকা জমা দেওয়ার পর জমার রসিদ বা ট্রানজেকশন আইডির ছবি ফরমের সাথে অথবা
          হোয়াটস্যাপে প্রেরণ করুন।
        </p>
      </div>

      {/* Campus Highlights Graphic Card */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-md p-space-md flex flex-col gap-space-sm overflow-hidden relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">hub</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              সহযোগী শিক্ষাবোর্ড
            </h3>
            <p className="font-body-sm text-body-sm text-secondary">
              স্বীকৃত ও ঐতিহ্যবাহী সংস্থা
            </p>
          </div>
        </div>

        <div className="space-y-2 mt-1">
          <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[18px] text-primary">
              check_circle
            </span>
            <span className="font-body-md text-body-md text-on-surface">
              বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[18px] text-primary">
              check_circle
            </span>
            <span className="font-body-md text-body-md text-on-surface">
              মুআস্‌সাসা ইলমিয়্যাহ বাংলাদেশ
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[18px] text-primary">
              check_circle
            </span>
            <span className="font-body-md text-body-md text-on-surface">
              মাসিক আল কাউসার তত্ত্বাবধান
            </span>
          </div>
        </div>

        {/* Inline Visual: Circular Progress of Seat Allocation */}
        <div className="mt-space-sm p-space-sm rounded-xl bg-surface-container-high flex items-center gap-space-sm">
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-variant"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-primary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="72, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute font-headline-sm text-headline-sm text-primary font-mono text-[13px]">
              ৭২%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface">
              ভর্তি আসন কোটা
            </span>
            <span className="font-body-sm text-body-sm text-secondary">
              চলতি সেশনের ৭২% আসন ইতিমধ্যে পূর্ণ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionSidebar;
