import axiosClient from "../../../configs/axios.config";

const BookIntroductionApi = {
  findAll: () => {
    return axiosClient.get("/book");
  }
};

export default BookIntroductionApi;