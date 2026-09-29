import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotFoundPage from "../pages/NotFoundPage";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

const RouteErrorBoundary = () => {
  const error = useRouteError();
  console.error("RouteErrorBoundary caught error:", error);

  const is404 = isRouteErrorResponse(error) && error.status === 404;

  if (is404) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20 sm:pt-24">
          <NotFoundPage />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 sm:pt-28 pb-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200/60">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            কিছুটা সমস্যা হয়েছে
          </h2>

          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            আমরা এই পাতাটি লোড করতে সমস্যায় পড়েছি। অনুগ্রহ করে পাতাটি রিলোড করুন অথবা হোমে ফিরে যান।
          </p>

          {import.meta.env.DEV && error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-left text-xs font-mono text-red-700 overflow-x-auto max-h-40">
              <p className="font-bold mb-1">Developer Error Details:</p>
              <p>{error?.message || error?.statusText || String(error)}</p>
              {error?.stack && <pre className="mt-1 text-[10px] text-red-600 whitespace-pre-wrap">{error.stack}</pre>}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-xs hover:-translate-y-0.5 active:scale-98 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>পুনরায় চেষ্টা করুন</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:-translate-y-0.5 active:scale-98 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>হোমে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RouteErrorBoundary;
