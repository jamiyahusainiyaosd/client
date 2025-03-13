import { AxiosError } from "axios";
import noticeApi from "../apis/notice.apis";

const noticeService = {
  getAll: async () => {
    try {
      return await noticeApi.findAll();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
  getOne: async (id) => {
    try {
      return await noticeApi.findOne(id);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  },
};

export default noticeService;
