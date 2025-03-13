import React from "react";
import PageTitle from "../utils/PageTitle";
import Notices from "../features/notice/components/Notices";

const Notice = () => {
  return (
    <>
      <PageTitle key={"noticePage"} title={"Notice Page"} />
      <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
        <h2 className="text-2xl font-bold text-center mb-8">নোটিশ সমূহ</h2>
        <Notices />
      </section>
    </>
  );
};

export default Notice;
