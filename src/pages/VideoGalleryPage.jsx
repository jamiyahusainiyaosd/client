import PageTitle from "../utils/PageTitle";
import VideoGallary from "./../features/videoGallary/components/videoGallary";

const VideoGalleryPage = () => {
  return (
    <>
      <PageTitle title="ভিডিও গ্যালারি" />
      <section className="max-w-6xl w-[95%] mx-auto">
        <h1 className="text-3xl font-bold text-center mt-28 py-3 text-blue-300">
          অত্র জামিয়ার ভিডিও গ্যালারি
        </h1>
        <VideoGallary />
      </section>
    </>
  );
};

export default VideoGalleryPage;
