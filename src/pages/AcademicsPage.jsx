import PageTitle from "../utils/PageTitle";
import AllAcademics from "../features/academics/components/AllAcademics";

const Academics = () => {
  return (
    <>
      <PageTitle key={"academicPage"} title={"একাডেমিক"} />
      <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
        <h2 className="text-2xl font-semibold mb-8 text-center" style={{color:'pink'}}>
          একাডেমিক তথ্য
        </h2>
        <AllAcademics />
      </section>
    </>
  );
};

export default Academics;