import axiosClient from "../../../configs/axios.config";

const admissionApi = {
  findAll: (page = 1) => {
    return axiosClient.get(`/admissions?page=${page}`);
  },
};

export default admissionApi;