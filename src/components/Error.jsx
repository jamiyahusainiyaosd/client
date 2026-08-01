const Error = ({ errorMessage }) => {
  return (
    <div className="flex items-center justify-center min-h-[47.5vh] px-4">
      <div className="flex flex-col items-center gap-5 text-center max-w-sm">
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-red-50  blur-xl opacity-80" />
          <div className="relative h-16 w-16 flex items-center justify-center rounded-2xl border border-red-200/80  bg-red-50/70  backdrop-blur-sm">
            <svg
              className="w-7 h-7 text-red-400 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-slate-700 ">
            কিছু একটা সমস্যা হয়েছে
          </h3>
          {errorMessage && (
            <p className="text-sm text-red-500  leading-relaxed">
              {errorMessage}
            </p>
          )}
        </div>

        {/* Retry hint */}
        <button
          onClick={() => window.location.reload()}
          className="text-xs text-slate-400  hover:text-emerald-600  transition-colors underline underline-offset-2"
        >
          পুনরায় চেষ্টা করুন
        </button>
      </div>
    </div>
  );
};

export default Error;