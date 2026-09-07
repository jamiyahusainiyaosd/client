import axiosClient from "../../../configs/axios.config";

const teachersApi = {
  findAllTeachers: (page = 1) => {
    return axiosClient.get(`/teacher?page=${page}`);
  },
};

export default teachersApi;
