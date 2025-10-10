import { AxiosError } from "axios";
import noticeApi from "../apis/notice.apis";

const noticeService = {
  getAll: async (page = 1) => {
    try {
      const response = await noticeApi.findAll(page);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw error;
    }
  },

  getOne: async (id) => {
    try {
      const response = await noticeApi.findOne(id);
      return response.data; 
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw error;
    }
  },
};

export default noticeService;