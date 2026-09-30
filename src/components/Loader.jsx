import React from "react";
import PropTypes from "prop-types";

const sizeClasses = {
  sm: {
    spinner: "h-6 w-6",
    stroke: "2.5",
    text: "text-[11px]",
  },
  md: {
    spinner: "h-10 w-10",
    stroke: "3",
    text: "text-xs",
  },
  lg: {
    spinner: "h-14 w-14",
    stroke: "3.5",
    text: "text-sm",
  },
};

const Loader = ({
  message = "লোড হচ্ছে...",
  size = "md",
  className = "py-12",
  color = "text-primary",
  fullScreen = false,
}) => {
  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className={`flex items-center justify-center w-full ${
        fullScreen ? "min-h-[60vh]" : ""
      } ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <div className={`relative ${currentSize.spinner}`}>
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
              strokeWidth={currentSize.stroke}
              className="text-slate-200"
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
              strokeWidth={currentSize.stroke}
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset="75"
              className={color}
            />
          </svg>
        </div>

        {/* Label (if message is provided) */}
        {message && (
          <p className={`font-medium text-slate-500 tracking-wide ${currentSize.text}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  color: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default Loader;