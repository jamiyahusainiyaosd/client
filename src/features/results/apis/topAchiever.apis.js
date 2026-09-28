import axiosClient from "../../../configs/axios.config";

const TopAchieverApis = {
  findAll: (params = {}) => {
    return axiosClient.get("/results/top-achievers/", { params });
  },
  findOne: (id) => {
    return axiosClient.get(`/results/top-achievers/${id}/`);
  },
};

export default TopAchieverApis;
