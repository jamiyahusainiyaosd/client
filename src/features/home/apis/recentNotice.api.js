import axiosClient from "../../../configs/axios.config";

const recentNoticeApi = {
  getRecentNoticesApi: () => {
    return axiosClient.get("/notice/latest");
  },
};

export default recentNoticeApi;
