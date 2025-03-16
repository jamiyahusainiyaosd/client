import { AxiosError } from "axios";
import BookIntroductionApi from "../apis/notice.apis";

const BookIntroductionService = {
  getAll: async () => {
    try {
      return await BookIntroductionApi.findAll();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
};

export default BookIntroductionService;