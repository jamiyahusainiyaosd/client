import axiosClient from "../../../configs/axios.config";

const homeApi = {
  findLatestNotice: () => {
    return axiosClient.get("/notices/latest");
  },
  findSliderImage: () => {
    return axiosClient.get("/images");
  },
};

export default homeApi;
