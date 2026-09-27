import axiosClient from "../../../configs/axios.config";

const ResultsApis = {
    findAllApi: (page = 1, pageSize = 100) => {
        return axiosClient.get(`/results?page=${page}&page_size=${pageSize}`);
    },
    findOne: (id) => {
        return axiosClient.get(`/results/${id}`);
    },
};

export default ResultsApis;