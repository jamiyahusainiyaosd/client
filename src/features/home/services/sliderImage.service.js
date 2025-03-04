import { AxiosError } from "axios";
import sliderImageApi from "../apis/sliderImages.api";

const sliderImageService = {
  getSliderImageService: async () => {
    try {
      const response = await sliderImageApi.getSliderImageApi();
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
};

export default sliderImageService;
