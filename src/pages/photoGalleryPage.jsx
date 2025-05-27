import PageTitle from "../utils/PageTitle";
import PhotoGallery from "../features/photoGalary/components/photoGallary";

const PhotoGalleryPage = () => {
  return (
    <>
      <PageTitle title="ফটো গ্যালারি" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="relative">
              অত্র জামিয়ার পুরাতন ফটো গ্যালারি
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            জামিয়া হুসাইনিয়ার ঐতিহাসিক মুহূর্তসমূহের একটি সংগ্রহ
          </p>
        </div>
        <PhotoGallery />
      </div>
    </>
  );
};

export default PhotoGalleryPage;