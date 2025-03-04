import { AxiosError } from "axios";
import recentNoticeApi from "../apis/recentNotice.api";

const recentNoticeService = {
  getRecentNoticesService: async () => {
    try {
      const response = await recentNoticeApi.getRecentNoticesApi();
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
};

export default recentNoticeService;
