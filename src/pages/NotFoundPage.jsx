import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, BookOpen, Bell, Phone } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-xl w-full text-center">
        {/* Badge & Decorative 404 */}
        <div className="relative inline-block mb-6">
          <span className="text-8xl sm:text-9xl font-black text-emerald-950/10 tracking-widest select-none">
            ৪০৪
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs sm:text-sm font-bold shadow-xs">
              পৃষ্ঠাটি বিদ্যমান নেই
            </span>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
          আপনি যে পৃষ্ঠাটি খুঁজছেন তা হয়তো সরানো হয়েছে, নাম পরিবর্তন হয়েছে অথবা লিংকটিতে কোনো ভুল রয়েছে।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:scale-98 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-sm font-semibold border border-slate-200/80 shadow-xs hover:-translate-y-0.5 active:scale-98 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>পূর্ববর্তী পৃষ্ঠা</span>
          </button>
        </div>

        {/* Quick navigation helpers */}
        <div className="pt-6 border-t border-slate-200/70">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            প্রয়োজনীয় পাতাগুলো দেখতে পারেন
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <Link
              to="/academic"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>একাডেমিক</span>
            </Link>
            <Link
              to="/notice"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>নোটিশ</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>যোগাযোগ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
