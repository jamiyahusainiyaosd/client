import PageTitle from "../utils/PageTitle";
import AllResults from "../features/results/components/AllResults";

const ResultsPage = () => (
    <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
        <h1 className="text-2xl font-bold text-center mb-8">ফলাফল প্রকাশ</h1>
        <PageTitle title="Student Results" />
        <AllResults />
    </section>
);

export default ResultsPage;