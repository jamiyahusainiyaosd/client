import React from "react";

export const GOOGLE_MAPS_EXACT_URL =
  "https://www.google.com/maps/place/%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B9%E0%A7%81%E0%A6%B8%E0%A6%BE%E0%A6%87%E0%A6%A8%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B6%E0%A6%BE%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A6%BE%E0%A6%97%E0%A6%9E%E0%A7%8D%E0%A6%9C+%E0%A6%AE%E0%A6%BE%E0%A6%A6%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A6%BE/@24.2693746,91.4753187,20.79z/data=!4m15!1m8!3m7!1s0x37515c4522a33541:0xaf92bcdf59019563!2sShaistaganj!3b1!8m2!3d24.2766967!4d91.4555525!16s%2Fm%2F09gllxz!3m5!1s0x37515de9b5a6340d:0xe3c553d2f7510f3!8m2!3d24.2693736!4d91.4753737!16s%2Fg%2F11hf6dfc7z?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D";

const ContactMap = () => {
  return (
    <div
      className="bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3.5"
      data-purpose="interactive-google-map-card"
    >
      {/* Header bar above map */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 text-primary flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[18px]">
              explore
            </span>
          </span>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              গুগল ম্যাপে মাদ্রাসার সঠিক অবস্থান
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              শায়েস্তাগঞ্জ, হবিগঞ্জ রোড
            </p>
          </div>
        </div>

        {/* Plus Code Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-slate-700 text-xs font-semibold shadow-xs">
          <span className="material-symbols-outlined text-[15px] text-primary">
            pin_drop
          </span>
          <span className="font-mono text-[11px] font-bold text-slate-800">
            7F9G+P4X
          </span>
        </div>
      </div>

      {/* Embedded Real Google Map */}
      <div className="relative w-full h-[320px] sm:h-[380px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
        <iframe
          title="জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ মাদ্রাসা অবস্থান"
          src="https://maps.google.com/maps?q=24.2693736,91.4753737+(%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B9%E0%A7%81%E0%A6%B8%E0%A6%BE%E0%A6%87%E0%A6%A8%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B6%E0%A6%BE%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A6%BE%E0%A6%97%E0%A6%9E%E0%A7%8D%E0%A6%9C+%E0%A6%AE%E0%A6%BE%E0%A6%A6%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A6%BE)&t=&z=19&ie=UTF8&iwloc=B&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Footer Info & Action Button */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
            <span className="material-symbols-outlined text-[16px]">
              verified
            </span>
            <span>জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ মাদ্রাসা</span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 truncate">
            শায়েস্তাগঞ্জ - হবিগঞ্জ রোড, কুটিরগাঁও রোড সংলগ্ন, শায়েস্তাগঞ্জ
          </p>
        </div>

        <a
          href={GOOGLE_MAPS_EXACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors shrink-0 active:scale-98"
        >
          <span className="material-symbols-outlined text-[17px]">
            directions
          </span>
          <span>গুগল ম্যাপে দিকনির্দেশনা পান</span>
          <span className="material-symbols-outlined text-[15px]">
            open_in_new
          </span>
        </a>
      </div>
    </div>
  );
};

export default ContactMap;
