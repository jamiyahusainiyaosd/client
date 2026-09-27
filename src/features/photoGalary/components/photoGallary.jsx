import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import photoGallaryService from "../services/photoGallary.services";
import PhotoGalleryHero from "./PhotoGalleryHero";
import PhotoGallerySpotlight from "./PhotoGallerySpotlight";
import PhotoGalleryFilter from "./PhotoGalleryFilter";
import PhotoGalleryCards from "./PhotoGalleryCards";
import Pagination from "../../../components/Pagination";
import PhotoGalleryLightbox from "./PhotoGalleryLightbox";


// Helper to categorize photos intelligently based on Bengali keywords in the title
const categorizePhoto = (title = "") => {
  const t = title.toLowerCase();
  if (
    t.includes("হিফজ") ||
    t.includes("নাজেরা") ||
    t.includes("নুরানি") ||
    t.includes("নুরানিতে") ||
    t.includes("ক্লাস") ||
    t.includes("পড়ছে") ||
    t.includes("ছাত্র") ||
    t.includes("তালিম") ||
    t.includes("শিক্ষক")
  ) {
    return {
      category: "academic",
      badge: "তা’লীম ও ক্লাস",
      icon: "auto_stories",
      tag: "শ্রেণিকক্ষ",
      desc: "মাদ্রাসার নিয়মিত পাঠদান, হিফজ ও পাঠশালার প্রামাণ্য চিত্র।"
    };
  }
  if (
    t.includes("মসজিদ") ||
    t.includes("মাকবারাহ") ||
    t.includes("রৌজা") ||
    t.includes("চাঁন মিয়া") ||
    t.includes("স্মারক")
  ) {
    return {
      category: "spiritual",
      badge: "মসজিদ ও স্মারক",
      icon: "mosque",
      tag: "পবিত্র প্রাঙ্গণ",
      desc: "জামিয়া প্রাঙ্গণের পবিত্র মসজিদ ও বুজুর্গদের বরকতময় স্মৃতি।"
    };
  }
  if (
    t.includes("পোস্টার") ||
    t.includes("বিজ্ঞপ্তি") ||
    t.includes("ভর্তি") ||
    t.includes("মাকতাব")
  ) {
    return {
      category: "circular",
      badge: "বিজ্ঞপ্তি ও পোস্টার",
      icon: "campaign",
      tag: "নোটিশ",
      desc: "চলতি শিক্ষাবর্ষের ভর্তি কার্যক্রম ও অফিশিয়াল প্রকাশনা।"
    };
  }
  if (
    t.includes("অফিস") ||
    t.includes("দফতর") ||
    t.includes("মার্কেট") ||
    t.includes("প্রশাসন")
  ) {
    return {
      category: "office",
      badge: "প্রশাসন ও দফতর",
      icon: "badge",
      tag: "প্রশাসনিক ভবন",
      desc: "মাদ্রাসার প্রশাসনিক কার্যক্রম ও ঐতিহাসিক দফতর।"
    };
  }
  return {
    category: "campus",
    badge: "ক্যাম্পাস ও পরিবেশ",
    icon: "apartment",
    tag: "ক্যাম্পাস দৃশ্য",
    desc: "সবুজ শ্যামল প্রাঙ্গণ, উন্মুক্ত মাঠ ও ঐতিহাসিক স্থাপত্য রূপরেখা।"
  };
};

const PhotoGallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page");
  const currentPage = Math.max(1, Number(rawPage) || 1);

  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Fetch photos from backend API
  const { data: photosData, isLoading } = useQuery({
    queryKey: ["photos", currentPage],
    queryFn: () => photoGallaryService.getAll(currentPage),
    staleTime: 1000 * 60 * 5,
  });

  // Map API photos purely dynamically
  const allDisplayPhotos = useMemo(() => {
    const rawList =
      photosData?.data?.results ||
      photosData?.results ||
      photosData?.data?.data ||
      photosData?.data ||
      (Array.isArray(photosData) ? photosData : []);

    if (rawList && Array.isArray(rawList) && rawList.length > 0) {
      return rawList.map((p, idx) => {
        const catInfo = categorizePhoto(p.photoTitle || p.title || "");
        return {
          id: p.id ?? idx,
          category: p.category || catInfo.category,
          badge: p.badge || catInfo.badge,
          title: p.photoTitle || p.title || "জামিয়া হুসাইনিয়া প্রাঙ্গণ",
          desc: p.desc || p.description || catInfo.desc,
          fullDesc: p.fullDesc || p.description || catInfo.desc,
          icon: p.icon || catInfo.icon,
          tag: p.tag || catInfo.tag,
          image: p.photoImg || p.image || "/unnamed.jpg",
          alt: p.photoTitle || p.alt || "জামিয়া হুসাইনিয়া মাদ্রাসা",
        };
      });
    }
    return [];
  }, [photosData]);

  const totalCount =
    photosData?.count ||
    photosData?.data?.count ||
    allDisplayPhotos.length ||
    0;
  const totalPages = Math.ceil(totalCount / 9) || 1;

  // Compute categories dynamically
  const categories = useMemo(() => [
    { key: "all", label: "সব ছবি" },
    { key: "campus", label: "ক্যাম্পাস ও পরিবেশ" },
    { key: "academic", label: "তা’লীম ও ক্লাস" },
    { key: "spiritual", label: "মসজিদ ও স্মারক" },
    { key: "office", label: "প্রশাসন ও দফতর" },
    { key: "circular", label: "বিজ্ঞপ্তি ও পোস্টার" },
  ], []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return allDisplayPhotos;
    return allDisplayPhotos.filter((item) => item.category === activeCategory);
  }, [activeCategory, allDisplayPhotos]);

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

  // Determine currently active photos for lightbox navigation
  const activePhotos = useMemo(() => {
    return filteredItems.length > 0 ? filteredItems : allDisplayPhotos;
  }, [filteredItems, allDisplayPhotos]);

  const openLightbox = (idOrIndex) => {
    const foundIdx = activePhotos.findIndex((item) => String(item.id) === String(idOrIndex));
    if (foundIdx !== -1) {
      setCurrentIdx(foundIdx);
    } else {
      const fallbackIdx = allDisplayPhotos.findIndex((item) => String(item.id) === String(idOrIndex));
      setCurrentIdx(fallbackIdx !== -1 ? fallbackIdx : 0);
    }
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = useCallback(() => {
    if (activePhotos.length === 0) return;
    setCurrentIdx((prev) => (prev + 1) % activePhotos.length);
  }, [activePhotos.length]);

  const prevLightboxImage = useCallback(() => {
    if (activePhotos.length === 0) return;
    setCurrentIdx((prev) => (prev - 1 + activePhotos.length) % activePhotos.length);
  }, [activePhotos.length]);

  return (
    <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen">
      <div className="flex flex-col w-full font-body-md text-body-md text-on-surface">
        {/* SECTION 1: HERO & DYNAMIC STATS (Background: #f1f3ff) */}
        <PhotoGalleryHero
          totalCount={totalCount}
        />

        {/* SECTION 2: SPOTLIGHT HERO CARD (Background: white) */}
        {allDisplayPhotos.length > 0 && (
          <PhotoGallerySpotlight
            onOpenLightbox={openLightbox}
            spotlightItem={allDisplayPhotos[0]}
          />
        )}

        {/* SECTION 3: INTERACTIVE FILTER TOOLBAR & PHOTO GALLERY CARDS (Background: #f1f3ff) */}
        <section className="w-full bg-[#f1f3ff] py-10 sm:py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PhotoGalleryFilter
              activeCategory={activeCategory}
              categories={categories}
              onCategoryChange={setActiveCategory}
              onViewModeChange={setViewMode}
              totalCount={filteredItems.length}
              viewMode={viewMode}
            />

            <div className="mt-8">
              <PhotoGalleryCards
                isLoading={isLoading}
                items={filteredItems}
                onOpenLightbox={openLightbox}
                viewMode={viewMode}
              />
            </div>

            {/* Pagination Controls */}
            {totalCount > 9 && (
              <div className="mt-10 sm:mt-12">
                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  pageSize={9}
                  totalCount={totalCount}
                  totalPages={totalPages}
                  useBengaliDigits={true}
                />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && activePhotos.length > 0 && (
        <PhotoGalleryLightbox
          isOpen={lightboxOpen}
          currentIdx={currentIdx}
          items={activePhotos}
          images={activePhotos}
          onClose={closeLightbox}
          onNext={nextLightboxImage}
          onPrev={prevLightboxImage}
        />
      )}
    </main>
  );
};

export default PhotoGallery;