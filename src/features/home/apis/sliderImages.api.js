import axiosClient from "../../../configs/axios.config";

const sliderImageApi = {
  getSliderImageApi: () => {
    return axiosClient.get("/image");
  },
};

export default sliderImageApi;
