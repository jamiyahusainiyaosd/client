import PageTitle from "../utils/PageTitle";
import VideoGallary from './../features/videoGallary/components/videoGallary';

const VideoGalleryPage = () => {
    return (
        <>
            <PageTitle title="ভিডিও গ্যালারি" />
            <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
                <h1 className="text-2xl font-bold text-center mb-8" style={{color:'pink'}}>অত্র জামিয়ার ভিডিও গ্যালারি</h1>
                <VideoGallary />
            </section>
        </>
    );
};

export default VideoGalleryPage;