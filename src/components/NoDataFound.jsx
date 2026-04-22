const NoDataFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[47.5vh] px-4">
      <div className="flex flex-col items-center gap-5 text-center max-w-sm">
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-slate-100 dark:bg-slate-800 blur-xl opacity-80" />
          <div className="relative h-16 w-16 flex items-center justify-center rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm shadow-sm">
            <svg
              className="w-7 h-7 text-slate-400 dark:text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
            কোনো তথ্য পাওয়া যায়নি
          </h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
            এই মুহূর্তে প্রদর্শনের জন্য কোনো ডেটা উপলব্ধ নেই।
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;