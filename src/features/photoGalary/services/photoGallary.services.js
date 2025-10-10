import { AxiosError } from "axios";
import photoGallaryApi from "../apis/photoGallary.apis";

const photoGallaryService = {
  getAll: async (page = 1) => {
    try {
      const response = await photoGallaryApi.findAll(page);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw error;
    }
  },
};

export default photoGallaryService;