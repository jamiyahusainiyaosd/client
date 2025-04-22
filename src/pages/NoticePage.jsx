import React from "react";
import PageTitle from "../utils/PageTitle";
import Notices from "../features/notice/components/Notices";

const Notice = () => {
  return (
    <>
      <PageTitle key={"noticePage"} title={"নোটিশ সমূহ"} />
      <section className="max-w-[1200px] w-[95%] mx-auto mt-28">
        <h2 className="text-3xl font-bold text-center py-3 text-blue-300">
          নোটিশ সমূহ
        </h2>
        <Notices />
      </section>
    </>
  );
};

export default Notice;