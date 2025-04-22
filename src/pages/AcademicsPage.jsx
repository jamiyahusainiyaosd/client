import React from "react";
import PageTitle from "../utils/PageTitle";
import AllAcademics from "../features/academics/components/AllAcademics";

const Academics = () => {
  return (
    <>
      <PageTitle title="একাডেমিক তথ্য" />
      <section className="max-w-6xl w-[95%] mx-auto mt-28">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-300">
          একাডেমিক তথ্য
        </h2>
        <AllAcademics />
      </section>
    </>
  );
};

export default Academics;