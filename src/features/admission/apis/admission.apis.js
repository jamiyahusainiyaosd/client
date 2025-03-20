import axiosClient from "../../../configs/axios.config";

const admissionApi = {
  findAll: (page) => {
    if (page) {
      return axiosClient.get(`/admissions?page=${page}`);
    } else {
      return axiosClient.get(`/admissions`);
    }
  },
};

export default admissionApi;