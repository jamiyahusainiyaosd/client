import axiosClient from "../../../configs/axios.config";

const financialReportApis = {
    findAllApi: () => {
        return axiosClient.get("/financialReport");
    },
};

export default financialReportApis;