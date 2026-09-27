import React, { useState, useEffect, useRef } from "react";
import { loadedImagesSet } from "../../../utils/imageLoader";
import { getOptimizedImageUrl } from "../../../utils/imageOptimizer";

const StudentAvatar = ({
  src,
  name = "সাবেক ছাত্র",
  className = "w-[52px] h-[52px]",
  roundedClassName = "rounded-2xl",
  iconSize = "text-[28px]",
  priority = true,
}) => {
  const optimizedSrc = getOptimizedImageUrl(src, 140, 140);
  const isAlreadyLoaded = Boolean(optimizedSrc && loadedImagesSet.has(optimizedSrc));
  const [isLoaded, setIsLoaded] = useState(isAlreadyLoaded);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!optimizedSrc) {
      setIsLoaded(false);
      setHasError(false);
      return;
    }

    if (loadedImagesSet.has(optimizedSrc)) {
      setIsLoaded(true);
      return;
    }

    // Check if already complete in browser cache
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      loadedImagesSet.add(optimizedSrc);
      setIsLoaded(true);
    }
  }, [optimizedSrc]);

  const handleLoad = () => {
    if (optimizedSrc) loadedImagesSet.add(optimizedSrc);
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div
      className={`relative ${className} ${roundedClassName} bg-white border border-slate-200/80 flex items-center justify-center text-primary overflow-hidden shrink-0 shadow-xs`}
    >
      {/* Skeleton Shimmer while downloading */}
      {optimizedSrc && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200/90 animate-pulse flex items-center justify-center z-0">
          <span className={`material-symbols-outlined ${iconSize} text-slate-400`}>
            person
          </span>
        </div>
      )}

      {/* Actual Avatar Image */}
      {optimizedSrc && !hasError ? (
        <img
          ref={imgRef}
          alt={name}
          className={`w-full h-full object-cover ${roundedClassName} transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={optimizedSrc}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <span className={`material-symbols-outlined ${iconSize}`}>
          person
        </span>
      )}
    </div>
  );
};

export default StudentAvatar;
