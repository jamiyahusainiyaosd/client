import PageTitle from "../utils/PageTitle";
import AllResults from "../features/results/components/AllResults";

const ResultsPage = () => (
    <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
        <h1 className="text-2xl font-bold text-center mb-8" style={{color:'pink'}}>ফলাফল প্রকাশ</h1>
        <PageTitle title="ফলাফল" />
        <AllResults />
    </section>
);

export default ResultsPage;