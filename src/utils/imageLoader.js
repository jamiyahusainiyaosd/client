// Module-level cache to remember images loaded during this session.
// This ensures returning to a page or re-rendering never flashes a skeleton again.
export const loadedImagesSet = new Set();

/**
 * Preload helper to fetch images into browser cache ahead of time
 */
export const preloadImage = (src) => {
  if (!src || loadedImagesSet.has(src)) return;
  const img = new Image();
  img.src = src;
  img.onload = () => loadedImagesSet.add(src);
};
