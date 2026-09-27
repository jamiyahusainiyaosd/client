/**
 * Utility to optimize remote image URLs (Cloudinary, Supabase, etc.)
 * Resizes large 3-5MB camera uploads into tiny 10-20KB avatars for instant loading.
 */
export const getOptimizedImageUrl = (url, width = 140, height = 140) => {
  if (!url || typeof url !== "string") return "";

  // Cloudinary URL optimization
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    // Avoid double transformation
    if (url.includes("/upload/w_") || url.includes("/upload/c_")) {
      return url;
    }
    return url.replace(
      "/upload/",
      `/upload/w_${width},h_${height},c_fill,g_face,q_auto,f_auto/`
    );
  }

  // Supabase storage image optimization
  if (url.includes("supabase.co/storage/v1/object/public/")) {
    if (url.includes("?width=") || url.includes("&width=")) {
      return url;
    }
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}width=${width}&quality=80`;
  }

  return url;
};
