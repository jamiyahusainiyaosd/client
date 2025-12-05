// src/pages/VideoGalleryPage.jsx
import PageTitle from "../utils/PageTitle";
import VideoGallery from "../features/videoGallary/components/videoGallary";

const VideoGalleryPage = () => {
  return (
    <>
      <PageTitle title="ভিডিও গ্যালারি" />

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-36">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              ভিডিও গ্যালারি
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              অত্র জামিয়ার{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                ভিডিও গ্যালারি
              </span>
            </h1>

            <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              জামিয়া হুসাইনিয়ার বিভিন্ন অনুষ্ঠান, কার্যক্রম ও শিক্ষামূলক ভিডিওর
              সমৃদ্ধ সংগ্রহ
            </p>

            <div className="mt-5 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300"></div>
          </div>

          <VideoGallery />
        </div>
      </main>
    </>
  );
};

export default VideoGalleryPage;
