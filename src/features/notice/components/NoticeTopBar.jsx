import { Link } from "react-router-dom";

const NoticeTopBar = () => {
  return (
    <section className="w-full bg-[#f1f3ff] py-2.5 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs sm:text-sm">
        <nav className="flex items-center gap-2 text-slate-600">
          <Link
            to="/"
            className="hover:text-primary transition-colors flex items-center gap-1 font-medium"
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>হোম</span>
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-bold">নোটিশ ও বিজ্ঞপ্তি</span>
        </nav>
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>হালনাগাদ তথ্য পোর্টাল</span>
        </div>
      </div>
    </section>
  );
};

export default NoticeTopBar;
