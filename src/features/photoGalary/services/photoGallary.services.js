import { AxiosError } from "axios";
import photoGallaryApi from "../apis/notice.apis";

const photoGallaryService = {
  getAll: async () => {
    try {
      return await photoGallaryApi.findAll();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
};

export default photoGallaryService;