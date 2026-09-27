const VideoGalleryFilter = ({
  activeCategory,
  onSelectCategory,
  onCategoryChange,
  viewMode,
  onSelectViewMode,
  onViewModeChange,
  totalCount = 4,
  categories = []
}) => {
  const handleCategory = onCategoryChange || onSelectCategory;
  const handleViewMode = onViewModeChange || onSelectViewMode;
  const toBn = (n) => String(n).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

  const defaultCategories = [
    { key: "all", label: "সব ভিডিও" },
    { key: "nurani", label: "নূরানী ও আমলি মশক" },
    { key: "seminar", label: "বক্তব্য ও সেমিনার" },
    { key: "practical", label: "আমলি প্রশিক্ষণ" }
  ];

  const cats = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="w-full pb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full">
        {/* Category Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full min-w-0"
          id="filter-tabs"
        >
          {cats.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategory && handleCategory(cat.key)}
              className={`shrink-0 category-btn px-4 py-2 rounded-full font-label-md text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50 shadow-xs font-medium"
              }`}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* View mode toggle & total count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-secondary font-label-sm text-xs sm:text-sm shrink-0 w-full sm:w-auto">
          <span className="bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs font-medium">
            মোট <strong className="text-primary">{toBn(totalCount)}</strong>টি ভিডিও
          </span>
          <div className="flex items-center bg-white border border-slate-200/80 p-1 rounded-xl shadow-xs">
            <button
              aria-label="গ্রিড ভিউ"
              className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
              onClick={() => handleViewMode && handleViewMode("grid")}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              aria-label="লিস্ট ভিউ"
              className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
              onClick={() => handleViewMode && handleViewMode("list")}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">view_list</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGalleryFilter;
