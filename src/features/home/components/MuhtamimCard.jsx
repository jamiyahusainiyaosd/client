import React from "react";
import { Link } from "react-router-dom";

const MuhtamimCard = () => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      {/* Card Header */}
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h2 className="text-sm font-bold text-slate-900 tracking-wide">
            মুহতামিম মহোদয়
          </h2>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
          প্রশাসন ও নেতৃত্ব
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col items-center text-center">
        {/* Dignified Executive Portrait Frame */}
        <div className="relative mb-4 group cursor-pointer">
          {/* Outer Ring Ambient Glow & Emerald Gradient Border */}
          <div className="p-[2.5px] rounded-[22px] bg-gradient-to-tr from-emerald-700 via-primary to-emerald-500 shadow-[0_6px_22px_-4px_rgba(5,150,105,0.22)] group-hover:shadow-[0_8px_28px_-2px_rgba(5,150,105,0.32)] transition-all duration-300">
            <div className="bg-white p-[2px] rounded-[20px]">
              <div className="w-36 sm:w-44 aspect-[3/4] rounded-[18px] overflow-hidden bg-slate-100 relative">
                <img
                  src="/muhtamim2.webp"
                  alt="মাওলানা সৈয়দ তানভীর ছিফাতুল্লাহ - মুহতামিম"
                  className="w-full h-full object-cover object-center contrast-[1.06] brightness-[0.99] saturate-[1.06] group-hover:scale-103 transition-transform duration-500 ease-out"
                  loading="eager"
                />
                {/* Subtle Lighting Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Official Executive Seal Badge */}
          <div
            className="absolute -bottom-1.5 -right-1.5 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white ring-3 ring-white shadow-md group-hover:scale-110 transition-transform duration-300"
            title="যাচাইকৃত প্রশাসন প্রধান"
          >
            <span className="material-symbols-outlined text-[17px]">
              verified
            </span>
          </div>
        </div>

        {/* Identity Details */}
        <h3 className="text-base font-bold text-main leading-snug">
          মাওলানা সৈয়দ তানভীর ছিফাতুল্লাহ
        </h3>
        <p className="text-xs font-semibold text-primary mt-1 inline-flex items-center justify-center gap-1.5 bg-primary-light border border-primary-border px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>মুহতামিম, অত্র জামিয়া</span>
        </p>

        {/* Message / Bani Excerpt */}

        {/* Action Link */}
        <div className="w-full mt-4 flex items-center gap-2">
          <Link
            to="/about"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#f1f3ff] hover:bg-primary hover:text-black text-primary text-xs font-semibold transition-colors duration-200 cursor-pointer shadow-xs"
          >
            <span>মাদ্রাসার ইতিহাস ও পরিচিতি</span>
            <span className="material-symbols-outlined text-[15px]">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MuhtamimCard;
