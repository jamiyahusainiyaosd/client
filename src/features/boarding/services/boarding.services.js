import { AxiosError } from "axios";
import boardingApis from "../apis/boarding.apis";

const boardingService = {
  getAllRules: async (category) => {
    try {
      const response = await boardingApis.findAllRules(category);
      return response?.data || [];
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      return [];
    }
  },
};

export default boardingService;
