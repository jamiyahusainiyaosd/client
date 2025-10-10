import axiosClient from "../../../configs/axios.config";

const noticeApi = {
  findAll: (page = 1) => {
    return axiosClient.get(`/notices?page=${page}`);
  },

  findOne: (id) => {
    return axiosClient.get(`/notices/${id}`);
  },
};

export default noticeApi;