import axiosClient from "../../../configs/axios.config";

const noticeApi = {
  findAll: (page = 1, pageSize = 100) => {
    return axiosClient.get(`/notices?page=${page}&page_size=${pageSize}`);
  },

  findOne: (id) => {
    return axiosClient.get(`/notices/${id}`);
  },
};

export default noticeApi;