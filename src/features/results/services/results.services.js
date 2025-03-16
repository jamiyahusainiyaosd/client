import ResultsApis from "../apis/results.apis";

const ResultsServices = {
    getAllResults: async () => {
        try {
            return await ResultsApis.findAllApi();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
        }
    },
    getOneResults: async (id) => {
        try {
            return await ResultsApis.findOne(id);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
        }
    },
};

export default ResultsServices;