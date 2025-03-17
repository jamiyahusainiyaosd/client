import React from "react";
import PageTitle from "../utils/PageTitle";
import PhotoGallary from "../features/photoGalary/components/photoGallary";

const PhotoGalleryPage = () => {
    return (
        <>
            <PageTitle title="ফটো গ্যালারি" />
            <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
                <h1 className="text-2xl font-bold text-center mb-8" style={{color:'pink'}}>
                    অত্র জামিয়ার পুরাতন ফটো গ্যালারি
                </h1>
                <PhotoGallary />
            </section>
        </>
    );
};

export default PhotoGalleryPage;