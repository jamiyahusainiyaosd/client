import PageTitle from "../utils/PageTitle";
import VideoGallery from "../features/videoGallary/components/videoGallary";
 
const VideoGalleryPage = () => {
  return (
    <>
      <PageTitle title="ভিডিও গ্যালারি" />
 
      <main className="min-h-screen bg-slate-50  pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">
 
          {/* Page header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 ">
                ভিডিও গ্যালারি
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 ">
              অত্র জামিয়ার{" "}
              <span className="text-emerald-600 ">
                ভিডিও গ্যালারি
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-500  max-w-xl leading-relaxed">
              জামিয়া হুসাইনিয়ার বিভিন্ন অনুষ্ঠান, কার্যক্রম ও শিক্ষামূলক ভিডিওর সমৃদ্ধ সংগ্রহ।
            </p>
            <div className="mt-4 h-px w-full bg-slate-200 " />
          </div>
 
          <VideoGallery />
        </div>
      </main>
    </>
  );
};
 
export default VideoGalleryPage;