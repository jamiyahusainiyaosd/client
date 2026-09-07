import { useState, useEffect, useRef } from "react";
import { loadedImagesSet } from "../utils/imageLoader";

/**
 * SmoothImage Component
 * Prevents abrupt / jerky image loading by rendering an elegant shimmer skeleton
 * and smoothly fading & unblurring the image as soon as network bytes arrive.
 *
 * Supports `priority={true}` for above-the-fold images to download with high priority.
 */
const SmoothImage = ({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  fallbackSrc = "",
  loading = "lazy",
  decoding = "async",
  priority = false,
  onClick,
  ...props
}) => {
  const isAlreadyLoaded = Boolean(src && loadedImagesSet.has(src));
  const [isLoaded, setIsLoaded] = useState(isAlreadyLoaded);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Check if image is already cached/complete on mount or when src changes
  useEffect(() => {
    if (src && loadedImagesSet.has(src)) {
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
    setHasError(false);

    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      if (src) loadedImagesSet.add(src);
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = () => {
    if (src) loadedImagesSet.add(src);
    setIsLoaded(true);
  };

  const handleError = (e) => {
    if (fallbackSrc && e.target.src !== fallbackSrc) {
      e.target.src = fallbackSrc;
      setIsLoaded(true);
    } else {
      setHasError(true);
      setIsLoaded(true);
    }
  };

  const currentSrc = hasError && fallbackSrc ? fallbackSrc : (src || fallbackSrc);
  const imgLoading = priority ? "eager" : loading;
  const imgFetchPriority = priority ? "high" : props.fetchPriority || "auto";

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Shimmer skeleton placeholder */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-slate-200/80 animate-pulse"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      )}

      {/* Main Image - Instant 0ms display as soon as image arrives */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={imgLoading}
        fetchPriority={imgFetchPriority}
        decoding={decoding}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        className={`${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
        {...props}
      />
    </div>
  );
};

export default SmoothImage;

