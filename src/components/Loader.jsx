const Loader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative h-10 w-10">
          {/* Track */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 40 40"
            fill="none"
          >
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="currentColor"
              strokeWidth="3"
              className="text-slate-200 "
            />
          </svg>
          {/* Spinning arc */}
          <svg
            className="absolute inset-0 h-full w-full animate-spin"
            viewBox="0 0 40 40"
            fill="none"
            style={{ animationDuration: "0.75s" }}
          >
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset="75"
              className="text-emerald-500 "
            />
          </svg>
        </div>

        {/* Label */}
        <p className="text-xs font-medium text-slate-400  tracking-wide">
          লোড হচ্ছে...
        </p>
      </div>
    </div>
  );
};

export default Loader;