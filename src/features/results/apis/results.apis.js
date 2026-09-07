import axiosClient from "../../../configs/axios.config";

const ResultsApis = {
    findAllApi: (page = 1) => {
        return axiosClient.get(`/results?page=${page}`);
    },
    findOne: (id) => {
        return axiosClient.get(`/results/${id}`);
    },
};

export default ResultsApis;