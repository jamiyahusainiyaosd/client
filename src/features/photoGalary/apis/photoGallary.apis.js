import axiosClient from "../../../configs/axios.config";

const photoGallaryApi = {
  findAll: (page = 1) => {
    return axiosClient.get(`/gallary/photo?page=${page}`);
  }
};

export default photoGallaryApi;