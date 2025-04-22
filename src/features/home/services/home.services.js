import { AxiosError } from "axios";
import homeApi from "../apis/home.apis";

const homeService = {
  getLatestNotice: async () => {
    try {
      return await homeApi.findLatestNotice();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
  getSliderImage: async () => {
    try {
      return await homeApi.findSliderImage();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
};

export default homeService;