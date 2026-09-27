import axiosClient from "../../../configs/axios.config";

const teachersApi = {
  findAllTeachers: (page = 1, pageSize = 100) => {
    return axiosClient.get(`/teacher/?page=${page}&page_size=${pageSize}`);
  },
};

export default teachersApi;
