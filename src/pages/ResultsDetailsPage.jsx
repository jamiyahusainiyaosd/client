import PageTitle from "../utils/PageTitle";
import ResultsDetails from "../features/results/components/ResultsDetails";

const ResultsDetailsPage = () => (
    <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
        <h1 className="text-2xl font-bold text-center mb-8">ফলাফল বিস্তারিত</h1>
        <PageTitle title="Result Details" />
        <ResultsDetails />
    </section>
);

export default ResultsDetailsPage;