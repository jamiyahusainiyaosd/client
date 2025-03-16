import axiosClient from "../../../configs/axios.config";

const ResultsApis = {
    findAllApi: () => {
        return axiosClient.get("/results");
    },
    findOne: (id) => {
        return axiosClient.get(`/results/${id}`);
    },
};

export default ResultsApis;