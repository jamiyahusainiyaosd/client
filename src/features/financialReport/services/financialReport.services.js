import financialReportApis from "../apis/financialReport.apis";

const financialReportServices = {
    getAllResults: async () => {
        try {
            return await financialReportApis.findAllApi();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
        }
    },
};

export default financialReportServices;