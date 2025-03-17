import React from "react";
import PageTitle from "../utils/PageTitle";
import BookIntroduction from "../features/BookIntroduction/components/BookIntroduction";

const BookIntroductionPage = () => {
    return (
        <>
            <PageTitle title="বই পরিচিতি" />
            <div className="max-w-[1144px] w-[95%] mx-auto mt-28">
                <h1 className="text-2xl font-bold text-center mb-8" style={{color:'pink'}}>বুজুর্গানে দ্বীনের লিখা বই সমূহ</h1>
                <BookIntroduction />
            </div>
            
        </>
    );
};

export default BookIntroductionPage;


