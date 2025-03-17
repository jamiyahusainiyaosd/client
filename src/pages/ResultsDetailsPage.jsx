import PageTitle from "../utils/PageTitle";
import ResultsDetails from "../features/results/components/ResultsDetails";

const ResultsDetailsPage = () => (
    <>
       <PageTitle title="ফলাফল বিস্তারিত" />
        <section className="max-w-[1144px] w-[95%] mx-auto mt-28">
            <h1 className="text-2xl font-bold text-center mb-8" style={{color:"pink"}}>ফলাফল বিস্তারিত</h1>
            <ResultsDetails />
        </section>
    </>
);

export default ResultsDetailsPage;