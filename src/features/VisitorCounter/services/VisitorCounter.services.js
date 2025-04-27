import VisitorCounterApis from "../apis/VisitorCounter.apis";

const VisitorCounterServices = {
    getAllResults: async () => {
        try {
            return await VisitorCounterApis.findAllApi();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
        }
    },
};

export default VisitorCounterServices;