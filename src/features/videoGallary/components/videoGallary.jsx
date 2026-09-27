import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import VideoGallaryServices from "../services/videoGallary.services";
import VideoGalleryCards from "./VideoGalleryCards";
import VideoGalleryFilter from "./VideoGalleryFilter";
import VideoGalleryHero from "./VideoGalleryHero";
import VideoGallerySpotlight from "./VideoGallerySpotlight";
import VideoPlayerModal from "./VideoPlayerModal";

// Deprecated mock array - not exported to preserve React Fast Refresh


// Helper to categorize videos dynamically based on title keywords
const categorizeVideo = (title = "") => {
  const t = title.toLowerCase();
  if (
    t.includes("৯৯ নাম") ||
    t.includes("নূরানী") ||
    t.includes("নুরানী") ||
    t.includes("ছাত্রদের") ||
    t.includes("নামাজের প্রদর্শনী")
  ) {
    return {
      category: "nurani",
      badgeText: "নূরানী ও আমলি মশক",
      badgeIcon: "school",
      subBadge: "নূরানী বিভাগ • আমলি তালিম",
      duration: "০৬:১৬",
      durationShort: "০৬:১৬",
      desc: "নূরানী বিভাগের শিক্ষার্থীদের বিশুদ্ধ সুন্নতি নিয়মে নামাজ ও আসমাউল হুসনা মুখস্থ শোনানোর হৃদয়স্পর্শী দৃশ্য।"
    };
  }
  if (
    t.includes("সেমিনার") ||
    t.includes("বক্তিতা") ||
    t.includes("বক্তৃতা") ||
    t.includes("নসীহত") ||
    t.includes("মাহফিল")
  ) {
    return {
      category: "seminar",
      badgeText: "বক্তব্য ও সেমিনার",
      badgeIcon: "forum",
      subBadge: "একাডেমিক সেমিনার • দ্বীনি বয়ান",
      duration: "০১:০৫",
      durationShort: "০১:০৫",
      desc: "ইলমে ওহীর গুরুত্ব ও ছাত্রদের আদব নিয়ে বিজ্ঞ উলামায়ে কেরামের দিকনির্দেশনামূলক নসীহত।"
    };
  }
  if (
    t.includes("জানাযা") ||
    t.includes("কাফন") ||
    t.includes("প্রশিক্ষণ") ||
    t.includes("ব্যবহারিক")
  ) {
    return {
      category: "practical",
      badgeText: "আমলি প্রশিক্ষণ",
      badgeIcon: "groups",
      subBadge: "আমলি প্রশিক্ষণ • সুন্নতি আমল",
      duration: "০১:১৩",
      durationShort: "০১:১৩",
      desc: "সুন্নতি তরিকায় ব্যবহারিক আমল ও দ্বীনি প্রশিক্ষণের বাস্তব রূপায়ণ।"
    };
  }
  return {
    category: "general",
    badgeText: "ক্যাম্পাস ও অন্যান্য",
    badgeIcon: "videocam",
    subBadge: "জামিয়া হুসাইনিয়া প্রাঙ্গণ",
    duration: "০২:০০",
    durationShort: "০২:০০",
    desc: "জামিয়া হুসাইনিয়া মাদ্রাসা ক্যাম্পাসের সার্বিক পরিবেশ ও কার্যক্রমের প্রামাণ্য রূপরেখা।"
  };
};

const VideoGallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const currentPage = Math.max(1, Number(rawPage) || 1);

  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch videos from backend API
  const { data: videosData, isLoading } = useQuery({
    queryKey: ["videos", currentPage],
    queryFn: () => VideoGallaryServices.getAllResults(currentPage),
    staleTime: 1000 * 60 * 5,
  });

  // Map dynamic API videos purely from API
  const allDisplayVideos = useMemo(() => {
    const rawList =
      videosData?.data?.results ||
      videosData?.results ||
      videosData?.data?.data ||
      videosData?.data ||
      (Array.isArray(videosData) ? videosData : []);

    if (rawList && Array.isArray(rawList) && rawList.length > 0) {
      return rawList.map((v, idx) => {
        const cat = categorizeVideo(v.videoTitle || v.title || "");
        return {
          id: v.id ?? idx + 1,
          category: v.category || cat.category,
          badgeText: v.badgeText || cat.badgeText,
          badgeIcon: v.badgeIcon || cat.badgeIcon,
          subBadge: v.subBadge || cat.subBadge,
          title: v.videoTitle || v.title || "জামিয়া হুসাইনিয়া ভিডিও",
          desc: v.desc || v.description || cat.desc,
          duration: v.duration || cat.duration,
          durationShort: v.durationShort || cat.durationShort,
          videoUrl: v.videoImg || v.videoUrl || "",
          poster: v.videoPoster || v.poster || null,
          location: v.location || "শায়েস্তাগঞ্জ ক্যাম্পাস"
        };
      });
    }
    return [];
  }, [videosData]);

  const totalCount =
    videosData?.count ||
    videosData?.data?.count ||
    allDisplayVideos.length ||
    0;
  const totalPages = Math.ceil(totalCount / 4) || 1;

  const categories = useMemo(() => [
    { key: "all", label: "সব ভিডিও" },
    { key: "nurani", label: "নূরানী ও আমলি মশক" },
    { key: "seminar", label: "বক্তব্য ও সেমিনার" },
    { key: "practical", label: "আমলি প্রশিক্ষণ" }
  ], []);

  const filteredVideos = useMemo(() => {
    if (activeCategory === "all") return allDisplayVideos;
    return allDisplayVideos.filter((v) => v.category === activeCategory);
  }, [activeCategory, allDisplayVideos]);

  const handlePageChange = (p) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

  useEffect(() => {
    if (!rawPage) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", "1");
          return next;
        },
        { replace: true }
      );
    }
  }, [rawPage, setSearchParams]);

  const handleShare = useCallback((title) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setToastMessage(`"${title}" এর লিংক কপি করা হয়েছে!`);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  }, []);

  return (
    <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen overflow-x-hidden">
      <div className="flex flex-col w-full font-body-md text-body-md text-on-surface">
        {/* SECTION 1: HERO & DYNAMIC STATS (Background: #f1f3ff) */}
        <VideoGalleryHero
          totalCount={totalCount}
          categoryCount={categories.length - 1}
        />

        {/* Toast alert on share */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-lg animate-bounce">
            {toastMessage}
          </div>
        )}

        {/* SECTION 2: SPOTLIGHT FEATURED VIDEO (Background: white) */}
        {allDisplayVideos.length > 0 && (
          <VideoGallerySpotlight
            onOpenVideoModal={setSelectedVideo}
            onShare={handleShare}
            spotlightVideo={allDisplayVideos[0]}
          />
        )}

        {/* SECTION 3: INTERACTIVE FILTER TOOLBAR & VIDEO GRID (Background: #f1f3ff) */}
        <section className="w-full bg-[#f1f3ff] py-10 sm:py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <VideoGalleryFilter
              activeCategory={activeCategory}
              categories={categories}
              onCategoryChange={setActiveCategory}
              onViewModeChange={setViewMode}
              totalCount={filteredVideos.length}
              viewMode={viewMode}
            />

            <div className="mt-8">
              <VideoGalleryCards
                isLoading={isLoading}
                onOpenVideoModal={setSelectedVideo}
                onShare={handleShare}
                videos={filteredVideos}
                viewMode={viewMode}
              />
            </div>

            {/* Pagination Controls */}
            {totalCount > 4 && (
              <div className="mt-10 sm:mt-12">
                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  pageSize={4}
                  totalCount={totalCount}
                  totalPages={totalPages}
                  useBengaliDigits={true}
                />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <VideoPlayerModal
          isOpen={Boolean(selectedVideo)}
          onClose={() => setSelectedVideo(null)}
          video={selectedVideo}
        />
      )}
    </main>
  );
};

export default VideoGallery;