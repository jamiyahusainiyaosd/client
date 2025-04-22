import PageTitle from "../utils/PageTitle";
import Teachers from "../features/teachers/components/Teachers";

const TeachersPage = () => {
  return (
    <>
      <PageTitle title="শিক্ষকবৃন্দ" />
      <section className="max-w-6xl w-[95%] mx-auto mt-28">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-300">
          আমাদের শিক্ষকবৃন্দ
        </h2>
        <Teachers />
      </section>
    </>
  );
};

export default TeachersPage;
