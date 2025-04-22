import React from "react";
import PageTitle from "../utils/PageTitle";
import PhotoGallary from "../features/photoGalary/components/photoGallary";

const PhotoGalleryPage = () => {
  return (
    <>
      <PageTitle title="ফটো গ্যালারি" />
      <section className="max-w-6xl w-[95%] mx-auto">
        <h1 className="text-3xl font-bold text-center mt-28 py-3 text-blue-300">
          অত্র জামিয়ার পুরাতন ফটো গ্যালারি
        </h1>
        <PhotoGallary />
      </section>
    </>
  );
};

export default PhotoGalleryPage;
