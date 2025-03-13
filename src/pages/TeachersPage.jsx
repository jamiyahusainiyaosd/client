import PageTitle from "../utils/PageTitle";
import Teachers from "../features/teachers/components/Teachers";

const TeachersPage = () => {
  return (
    <>
      <PageTitle key={"teachersPage"} title={"Teachers"} />
      <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
        <h2 className="text-2xl font-semibold mb-8 text-center text-blue-600">
          আমাদের শিক্ষকবৃন্দ
        </h2>
        <Teachers />
      </section>
    </>
  );
};

export default TeachersPage;
