const PhotoGalleryFilter = ({
  activeCategory,
  onSelectCategory,
  onCategoryChange,
  viewMode,
  onSelectViewMode,
  onViewModeChange,
  itemCount,
  totalCount,
  categories = []
}) => {
  const handleCategory = onCategoryChange || onSelectCategory;
  const handleViewMode = onViewModeChange || onSelectViewMode;
  const count = totalCount !== undefined ? totalCount : (itemCount !== undefined ? itemCount : 0);
  const toBn = (n) => String(n).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

  const defaultTabs = [
    { key: "all", label: "সব ছবি" },
    { key: "campus", label: "ক্যাম্পাস ও পরিবেশ" },
    { key: "academic", label: "তা’লীম ও ক্লাস" },
    { key: "spiritual", label: "মসজিদ ও স্মারক" },
    { key: "office", label: "প্রশাসন ও দফতর" },
    { key: "circular", label: "বিজ্ঞপ্তি ও পোস্টার" },
  ];

  const tabs = categories.length > 0 ? categories : defaultTabs;

  return (
    <div className="w-full pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="filter-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleCategory && handleCategory(tab.key)}
              className={`gallery-tab px-4 py-2 rounded-full font-label-md text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === tab.key
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50 shadow-xs font-medium"
              }`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* View & Count State */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-secondary font-label-sm text-xs sm:text-sm shrink-0">
          <span className="bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs font-medium">
            মোট <strong className="text-primary">{toBn(count)}</strong>টি ছবি প্রদর্শিত
          </span>
          <div className="flex items-center bg-white border border-slate-200/80 p-1 rounded-xl shadow-xs">
            <button
              onClick={() => handleViewMode && handleViewMode("grid")}
              className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
              title="গ্রিড ভিউ"
              type="button"
              aria-label="গ্রিড ভিউ"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              onClick={() => handleViewMode && handleViewMode("compact")}
              className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                viewMode === "compact"
                  ? "bg-primary text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
              title="কমপ্যাক্ট ভিউ"
              type="button"
              aria-label="কমপ্যাক্ট ভিউ"
            >
              <span className="material-symbols-outlined text-[18px]">view_agenda</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGalleryFilter;
