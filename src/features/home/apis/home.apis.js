import axiosClient from "../../../configs/axios.config";

const homeApi = {
  findLatestNotice: () => {
    return axiosClient.get("/notices/latest");
  },
  findSliderImage: () => {
    return axiosClient.get("/images");
  },
  findAnnouncements: () => {
    return axiosClient.get("/notices/announcements");
  },
};

export default homeApi;
