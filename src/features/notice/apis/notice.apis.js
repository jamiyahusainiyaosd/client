import axiosClient from "../../../configs/axios.config";

const noticeApi = {
  findAll: () => {
    return axiosClient.get("/notices");
  },
  findOne: (id) => {
    return axiosClient.get(`/notices/${id}`);
  },
};

export default noticeApi;