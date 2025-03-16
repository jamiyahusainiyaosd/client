import axiosClient from "../../../configs/axios.config";

const photoGallaryApi = {
  findAll: () => {
    return axiosClient.get("/gallary/photo");
  }
};

export default photoGallaryApi;