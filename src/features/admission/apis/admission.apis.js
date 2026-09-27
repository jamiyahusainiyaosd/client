import axiosClient from "../../../configs/axios.config";

const admissionApi = {
  findAll: (page = 1, pageSize = 100) => {
    return axiosClient.get(`/admissions/?page=${page}&page_size=${pageSize}`);
  },
  createApplication: (data) => {
    return axiosClient.post("/admissions/", data);
  },
  findRules: () => {
    return axiosClient.get("/admissions/rules/");
  },
};

export default admissionApi;